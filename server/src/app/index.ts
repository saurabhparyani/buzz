import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { User } from './user';


export async function InitServer() {
    const app = express();

    app.use(cors());
    const graphqlServer = new ApolloServer({
        typeDefs: `
            ${User.types}
            type Query {
                ${User.queries}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
        },
    });

    await graphqlServer.start();

    app.use(
        '/graphql',
        express.json(),
        expressMiddleware(graphqlServer),
      );

    return app;
}