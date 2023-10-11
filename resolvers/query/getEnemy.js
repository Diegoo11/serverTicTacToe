import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';
import User from '../../db/models/User.js';

const getEnemy = async (root, args, context) => {
  const { currentUser } = context;
  const { gameId } = args;
  let game;

  try {
    game = await Game.findById(gameId);
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const enemyId = game.player1 == currentUser.id ? game.player2 : game.player1;
  try {
    const enemy = await User.findById(enemyId);
    return enemy;
  } catch (err) {
    throw new GraphQLError(err.message);
  }
};

export default getEnemy;
