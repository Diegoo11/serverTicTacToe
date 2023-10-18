import { GraphQLError } from 'graphql';
import db from '../../db/db.js';

const joinGame = async (root, args, context) => {
  const { currentUser } = context;
  const { gameId } = args;

  const [game] = await db({
    query: 'SELECT * FROM games WHERE id = ?',
    args: [gameId],
  });

  if (!game) throw new GraphQLError('Game not found');

  // const user1 = User.findById(game.player1);
  const [user1] = await db({
    query: 'SELECT * FROM users WHERE id = ?',
    args: [game.player1],
  });
  if (!user1 || game?.player2) throw new GraphQLError('Corrupt game');

  try {
    await db({
      query: 'UPDATE games SET player2 = ? WHERE id = ?',
      args: [currentUser.id, gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  return { value: gameId };
};

export default joinGame;
