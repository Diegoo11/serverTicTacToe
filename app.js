/* eslint-disable no-console */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typeDefs/typeDefs.js';

import './db/db.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const PORT = Number(process.env.PORT);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  introspection: true,
});

console.log(`🚀  Server ready at: ${url}`);
