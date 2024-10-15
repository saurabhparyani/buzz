export const types = `#graphql
    type User {
        _id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageUrl: String
    }

    type GoogleTokenResponse {
        token: String
    }

`