import { GraphQLError } from 'graphql';
import db from '../../db/db.js';

const getEnemy = async (root, args, context) => {
  const { currentUser } = context;
  const { gameId } = args;
  let game;

  try {
    // game = await Game.findById(gameId);
    [game] = await db({
      query: 'SELECT * FROM games WHERE id = ?',
      args: [gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const enemyId = game.player1 == currentUser.id ? game.player2 : game.player1;
  try {
    const [enemy] = await db({
      query: 'SELECT * FROM users WHERE id = ?',
      args: [enemyId],
    });
    return enemy;
  } catch (err) {
    throw new GraphQLError(err.message);
  }
};

export default getEnemy;
