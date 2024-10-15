import { JWTUser } from "../interfaces";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

export interface UserDocument extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

class JwtService {
    public static generateTokenForUser(user: UserDocument) {
        const payload: JWTUser = {
            userId: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string);
        return token;
    }

    public static decodeToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

export default JwtService;
