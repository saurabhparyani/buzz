import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { User } from './user';
import { GraphQLContext } from '../interfaces';
import JwtService from '../config/jwt';

export async function InitServer() {
    const app = express();

    app.use(cors());


    const graphqlServer = new ApolloServer<GraphQLContext>({
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
        expressMiddleware(graphqlServer, {
          context: async ({ req }) => {
            const token = req.headers.authorization?.split('Bearer ')[1];
            if (token) {
              try {
                const user = JwtService.decodeToken(token);
                return { user };
              } catch (error) {
                console.error('Invalid token:', error);
              }
            }
            return { user: null };
          },
        })
      );

    return app;
}