import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';

const getTurn = async (root, args) => {
  const { gameId } = args;

  let game;
  try {
    game = await Game.findById(gameId).populate('table');
    if (!game?.table) throw new Error('game not found');
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const turn = game.table.status === 1 ? game.player1 : game.player2;

  return { id: turn };
};

export default getTurn;
