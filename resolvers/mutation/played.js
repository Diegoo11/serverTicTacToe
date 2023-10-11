import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';

const played = async (root, args, context) => {
  const { play, gameId } = args;
  const { currentUser } = context;
  console.log(play, gameId, currentUser);

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

  const { table } = game;
  const ico = game.player1 == currentUser.id ? 1 : 2;
  if (table[`p_${play}`] !== 0) throw new GraphQLError('Invalid played');
  table[`p_${play}`] = ico;
  try {
    await table.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  return table;
};

export default played;
