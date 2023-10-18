import { GraphQLError } from 'graphql';
import db from '../../db/db.js';

const getTurn = async (root, args) => {
  const { gameId } = args;

  let game;
  try {
    // game = await Game.findById(gameId).populate('table');
    [game] = await db({
      query: `SELECT tables.status, player1, player2 FROM games 
      JOIN tables ON games.tableRef = tables.id 
      WHERE games.id = ?;`,
      args: [gameId],
    });
    if (!game) throw new Error('game not found');
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const turn = game.status === 1 ? game.player1 : game.player2;

  return { id: turn };
};

export default getTurn;
