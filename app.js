/* eslint-disable consistent-return */
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

import { ApolloServer } from '@apollo/server';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { PubSub } from 'graphql-subscriptions';
import typeDefs from './typeDefs/typeDefs.js';
import resolvers from './resolvers/resolvers.js';

import './db/db.js';
import User from './db/models/User.js';

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanUp = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanUp.dispose();
          },
        };
      },
    },
  ],
  introspection: true,
});

await server.start();

app.use(
  '/subscriptions',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const header = req ? req.headers.authorization : null;
      const pubSub = new PubSub();

      if (header && header.toLocaleLowerCase().startsWith('bearer')) {
        const tk = header.substring(7);
        const { JWT_STRING_SECRET } = process.env;
        const decodedToken = jwt.decode(tk, JWT_STRING_SECRET);
        if (!decodedToken) {
          throw new GraphQLError('Not Authenticated', {
            extensions: {
              code: 'AUTHENTICATION_ERROR',
            },
          });
        }

        const { id } = decodedToken;
        const currentUser = await User.findById(id);
        return { currentUser, pubSub, a: 'dawda' };
      }
    },
  }),
);

const PORT = Number(process.env.PORT);

await new Promise((resolve) => {
  httpServer.listen({ port: PORT }, resolve);
});

console.log(`🚀  Server ready at: ${PORT}`);
