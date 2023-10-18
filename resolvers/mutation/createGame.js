import { GraphQLError } from 'graphql';
import { v4 as uidV4 } from 'uuid';
import db from '../../db/db.js';

const createGame = async (root, args, context) => {
  const { currentUser } = context;
  if (!currentUser) return null;

  // const table = new Table();
  const tableId = uidV4();
  try {
    await db({
      query: 'INSERT INTO tables(id) VALUES(?);',
      args: [tableId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  // const game = new Game({
  //  player1: currentUser.id,
  //  table: table.id,
  // });
  const gameId = uidV4();

  try {
    await db({
      query: 'INSERT INTO games(player1, tableRef, id) VALUES(?, ?, ?);',
      args: [currentUser.id, tableId, gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return { value: gameId };
};

export default createGame;
