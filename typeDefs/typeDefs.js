import Token from './type/Token.js';
import Book from './type/Book.js';
import Mutation from './type/Mutation.js';
import Query from './type/Query.js';
import Table from './type/Table.js';
import User from './type/User.js';
import Subscription from './type/Subscription.js';

const typeDefs = `#graphql

${Book}
${User}
${Table}
${Token}
${Query}
${Mutation}
${Subscription}

`;
export default typeDefs;
