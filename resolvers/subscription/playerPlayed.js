import { withFilter } from 'graphql-subscriptions';
import pubSub from '../utilities/pubSub.js';
import Game from '../../db/models/Game.js';

const playerPlayed = {
  subscribe: withFilter(
    () => pubSub.asyncIterator(['PLAYED']),
    async (payload, variables) => {
      const game = await Game.findById(variables.id).populate('table');
      return (payload.playerPlayed.id === game.table.id);
    },
  ),
};

export default playerPlayed;
