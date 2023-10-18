import { GraphQLError } from 'graphql';
import db from '../../db/db.js';

import pubSub from '../utilities/pubSub.js';

const resetTable = async (root, args) => {
  const { gameId } = args;
  let game;
  try {
    // game = await Game.findById(gameId).populate('table');
    [game] = await db({
      query: 'SELECT tableRef FROM games WHERE id = ?;',
      args: [gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  // const { table } = game;

  // table.p_0 = 0;
  // table.winner = 0;
  // table.status = 1;

  let table;
  try {
    await db({
      query: `UPDATE tables SET 
      p_0 = 0, 
      p_1 = 0, 
      p_2 = 0, 
      p_3 = 0, 
      p_4 = 0, 
      p_5 = 0, 
      p_6 = 0, 
      p_7 = 0, 
      p_8 = 0, 
      winner = 0, 
      status = 1
      WHERE id = ?;
      `,
      args: [game.tableRef],
    });
    [table] = await db({
      query: 'SELECT * FROM tables WHERE id = ?',
      args: [game.tableRef],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  console.log({ table });
  pubSub.publish('PLAYED', { playerPlayed: table });
  return table;
};

export default resetTable;
