export interface JWTUser {
    userId: string;
    email: string;
}

export interface GraphQLContext {
    user?: JWTUser;
}
