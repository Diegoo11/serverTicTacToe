import { withFilter } from 'graphql-subscriptions';
import pubSub from '../utilities/pubSub.js';
import db from '../../db/db.js';

const playerPlayed = {
  subscribe: withFilter(
    () => pubSub.asyncIterator(['PLAYED']),
    async (payload, variables) => {
      // const game = await Game.findById(variables.id).populate('table');
      const [game] = await db({
        query: 'SELECT tableRef FROM games WHERE id = ?',
        args: [variables.id],
      });
      return (payload.playerPlayed.id === game.tableRef);
    },
  ),
};

export default playerPlayed;
