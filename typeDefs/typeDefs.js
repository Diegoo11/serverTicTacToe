import Token from './type/Token.js';
import Mutation from './type/Mutation.js';
import Query from './type/Query.js';
import Table from './type/Table.js';
import User from './type/User.js';
import Subscription from './type/Subscription.js';
import Uid from './type/Uid.js';

const typeDefs = `#graphql

${Uid}
${User}
${Table}
${Token}
${Query}
${Mutation}
${Subscription}

`;
export default typeDefs;
