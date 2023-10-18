import { GraphQLError } from 'graphql';
import db from '../../db/db.js';

const getTable = async (root, args, context) => {
  const { gameId } = args;
  const { currentUser } = context;

  if (!currentUser) return null;
  let game;
  try {
    // game = await Game.findById(gameId).populate('table');
    [game] = await db({
      query: 'SELECT * FROM games JOIN tables ON games.tableRef = tables.id WHERE games.id = ?;',
      args: [gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  if (!game) throw new GraphQLError('Corrupt game');

  if (game.player1 != currentUser.id
    && game.player2 != currentUser.id) throw new GraphQLError('Corrupt game');

  return game;
};

export default getTable;
