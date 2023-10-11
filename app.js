/* eslint-disable consistent-return */
import { ApolloServer } from '@apollo/server';
import jwt from 'jsonwebtoken';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typeDefs/typeDefs.js';

import './db/db.js';
import User from './db/models/User.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const PORT = Number(process.env.PORT);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    const header = req ? req.headers.authorization : null;

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
      return { currentUser };
    }
  },
});

console.log(`🚀  Server ready at: ${url}`);
