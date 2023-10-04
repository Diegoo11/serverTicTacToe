import getBooks from './query/getBooks.js';
import getTable from './query/getTable.js';
import played from './mutation/played.js';
import resetTable from './mutation/resetTable.js';

const resolvers = {
  Query: {
    getBooks,
    getTable,
  },
  Mutation: {
    played,
    resetTable,
  },
};

export default resolvers;
