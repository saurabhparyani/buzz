import { GraphQLClient } from "graphql-request";

const API_PORT = import.meta.env.VITE_API_PORT || 8000;

const getToken = () => localStorage.getItem("__buzz_token");

export const graphqlClient = new GraphQLClient(`http://localhost:${API_PORT}/graphql`, {
    headers: () => ({
        Authorization: getToken() ? `Bearer ${getToken()}` : "",
    }),
});