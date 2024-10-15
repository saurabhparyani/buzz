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

            const existingUser = await User.findOne({ email: data.email }) as UserDocument | null;
            
            if (existingUser) {
                const userToken = await JwtService.generateTokenForUser(existingUser);
                return { token: userToken };
            }

            // If user doesn't exist, create a new one
            const newUser = new User({
                email: data.email,
                firstName: data.given_name,
                lastName: data.family_name,
                profileImageUrl: data.picture,
            });
            await newUser.save();
            
            const userInDb = await User.findOne({ email: data.email }) as UserDocument | null;

            if (!userInDb) {
                throw new Error("User not found");
            }

            const userToken = await JwtService.generateTokenForUser(userInDb);

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