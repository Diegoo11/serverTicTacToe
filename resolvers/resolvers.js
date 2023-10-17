import getTable from './query/getTable.js';
import getUser from './query/getUser.js';
import getEnemy from './query/getEnemy.js';
import getTurn from './query/getTurn.js';

import played from './mutation/played.js';
import resetTable from './mutation/resetTable.js';
import login from './mutation/login.js';
import register from './mutation/register.js';
import createGame from './mutation/createGame.js';
import joinGame from './mutation/joinGame.js';

import playerPlayed from './subscription/playerPlayed.js';

const resolvers = {
  Query: {
    getTable,
    getUser,
    getEnemy,
    getTurn,
  },
  Mutation: {
    played,
    resetTable,
    login,
    register,
    createGame,
    joinGame,
  },
  Subscription: {
    playerPlayed,
  },
};

export default resolvers;
