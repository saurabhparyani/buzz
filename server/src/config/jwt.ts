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
        const payload = {
            userId: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string);
        return token;
    }
}

export default JwtService;
