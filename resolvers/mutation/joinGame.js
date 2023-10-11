import { GraphQLError } from 'graphql';
import Game from '../../db/models/Game.js';
import User from '../../db/models/User.js';

const joinGame = async (root, args, context) => {
  const { currentUser } = context;
  const { gameId } = args;

  const game = await Game.findById(gameId);

  if (!game) throw new GraphQLError('Game not found');

  const user1 = User.findById(game.player1);
  if (!user1 || game?.player2) throw new GraphQLError('Corrupt game');

  try {
    game.player2 = currentUser.id;
    await game.save();
    return { value: gameId };
  } catch (err) {
    throw new GraphQLError(err.message);
  }
};

export default joinGame;
