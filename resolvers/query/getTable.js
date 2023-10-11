import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';

const getTable = async (root, args, context) => {
  const { gameId } = args;
  const { currentUser } = context;

  if (!currentUser) return null;
  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  if (!game) throw new GraphQLError('Corrupt game');

  if (game.player1 != currentUser.id
    && game.player2 != currentUser.id) throw new GraphQLError('Corrupt game');

  return game.table;
};

export default getTable;
