import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';
import Table from '../../db/models/Table.js';

const createGame = async (root, args, context) => {
  const { currentUser } = context;
  if (!currentUser) return null;

  const table = new Table();
  try {
    await table.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const game = new Game({
    player1: currentUser.id,
    table: table.id,
  });

  try {
    await game.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return { value: game.id };
};

export default createGame;
