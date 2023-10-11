import getBooks from './query/getBooks.js';
import getTable from './query/getTable.js';
import getUser from './query/getUser.js';
import getEnemy from './query/getEnemy.js';

import played from './mutation/played.js';
import resetTable from './mutation/resetTable.js';
import login from './mutation/login.js';
import register from './mutation/register.js';
import createGame from './mutation/createGame.js';
import joinGame from './mutation/joinGame.js';

const resolvers = {
  Query: {
    getBooks,
    getTable,
    getUser,
    getEnemy,
  },
  Mutation: {
    played,
    resetTable,
    login,
    register,
    createGame,
    joinGame,
  },
};

export default resolvers;
