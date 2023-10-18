import { GraphQLError } from 'graphql';
import db from '../../db/db.js';
import isWinner from '../utilities/isWinner.js';
import pubSub from '../utilities/pubSub.js';

const played = async (root, args, context) => {
  const { play, gameId } = args;
  const { currentUser } = context;

  if (!currentUser) return null;
  let game;
  try {
    [game] = await db({
      query: 'SELECT * FROM games WHERE id = ?',
      args: [gameId],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  if (!game) throw new GraphQLError('Corrupt game');

  if (game.player1 != currentUser.id
    && game.player2 != currentUser.id) throw new GraphQLError('Corrupt game');

  const ico = game.player1 == currentUser.id ? 1 : 2;
  // const { table } = game;
  let table;
  try {
    [table] = await db({
      query: 'SELECT * FROM tables WHERE id = ?',
      args: [game.tableRef],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  if (ico !== table.status) return null;

  if (table[`p_${play}`] !== 0) throw new GraphQLError('Invalid played');
  // table[`p_${play}`] = ico;
  // table.status = ico === 1 ? 2 : 1;
  // table.winner = isWinner(table);

  table[`p_${play}`] = ico;

  try {
    await db({
      query: `UPDATE tables SET p_${play} = ?, status = ?, winner = ? WHERE id = ?`,
      args: [ico, (ico === 1 ? 2 : 1), isWinner(table), game.tableRef],
    });
    [table] = await db({
      query: 'SELECT * FROM tables WHERE id = ?',
      args: [game.tableRef],
    });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  pubSub.publish('PLAYED', { playerPlayed: table });
  return table;
};

export default played;
