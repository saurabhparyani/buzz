export const queries = `#graphql
    verifyGoogleToken(token: String!): GoogleTokenResponse!
    getCurrentUser: User
`

export interface GoogleTokenResponse {
    token: string | null
}