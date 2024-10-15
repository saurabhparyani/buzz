import axios from 'axios';
import User from '../../models/User';
import JwtService, { UserDocument } from '../../config/jwt';
import { GraphQLContext } from 'interfaces';
import { GoogleTokenResponse } from './queries';

interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified?: boolean;
    azp?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
    name?: string;
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }): Promise<GoogleTokenResponse> => {
      try {
        const googleOAuthUrl = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOAuthUrl.searchParams.set('id_token', token);
  
        const { data } = await axios.get<GoogleTokenResult>(googleOAuthUrl.toString(), {
          responseType: 'json'
        });
  
        let user = await User.findOne({ email: data.email });
        
        if (!user) {
          user = new User({
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            profileImageUrl: data.picture,
          });
          await user.save();
        }
  
        if (!user) {
          throw new Error('Failed to create or find user');
        }
  
        const userToken = await JwtService.generateTokenForUser(user as UserDocument);
        return { token: userToken };
      } catch (error) {
        console.error('Error in verifyGoogleToken:', error);
        throw new Error('Failed to verify Google token');
      }
    },
  
    
    getCurrentUser: async (parent: any, args: any, ctx: GraphQLContext) => {
        if (!ctx.user) {
          return null;
        }
        try {
          const user = await User.findById(ctx.user.userId);
          return user;
        } catch (error) {
          console.error('Error fetching current user:', error);
          throw new Error('Failed to fetch current user');
        }
    }
}


export const resolvers = { queries };