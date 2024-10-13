import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


export async function InitServer() {
    const app = express();
    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
            
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
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