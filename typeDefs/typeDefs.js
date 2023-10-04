import Book from './type/Book.js';
import Mutation from './type/Mutation.js';
import Query from './type/Query.js';
import Table from './type/Table.js';
import User from './type/User.js';

const typeDefs = `#graphql

${Book}
${User}
${Table}
${Query}
${Mutation}

`;

export default typeDefs;
