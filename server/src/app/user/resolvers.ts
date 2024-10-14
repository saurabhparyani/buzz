import axios from 'axios';
import User from '../../models/User';
import JwtService, { UserDocument } from '../../config/jwt';

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
    verifyGoogleToken: async (parent: any, {token}:{token:string}) => {
        const googleToken = token;
        const googleOAuthUrl = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOAuthUrl.searchParams.set('id_token', googleToken);

        const {data} = await axios.get<GoogleTokenResult>(googleOAuthUrl.toString(), {
            responseType: 'json'
        });

        const user = await User.findOne({email: data.email})

        if (!user) {
            const newUser = new User({
                email: data.email,
                firstName: data.given_name,
                lastName: data.family_name,
                profileImageUrl: data.picture,
            });
            await newUser.save();
        }
        
        const userInDb = await User.findOne({email: data.email}) as UserDocument;

        if (!userInDb) {
            throw new Error("User not found");
        }

        const userToken = await JwtService.generateTokenForUser(userInDb);

        return userToken;
    }
}

export const resolvers = { queries };
