import { graphql } from "../../gql/";

export const verifyUserGoogleTokenQuery = graphql(`#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token) {
            token
        }
    }
`)
export const getCurrentUserQuery = graphql(`#graphql
    query GetCurrentUser {
        getCurrentUser {
            _id
            email
            firstName
            lastName
            profileImageUrl
        }
    }
`)


