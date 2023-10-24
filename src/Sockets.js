import Game from '../db/models/Game.js';
import isWinner from './utils/isWinner.js';

export default function Sockets(io) {
  io.on('connection', (socket) => {
    //
    socket.on('conectGame', async (context) => {
      const { gameId } = context;
      let game;

      try {
        game = await Game.findById(gameId).populate('player1 player2');
      } catch (err) {
        return;
      }
      if (!game) return;

      socket.join(gameId);
      io.to(gameId).emit('joinPlayer', { player1: game.player1, player2: game.player2 });
      console.log(socket.id, 'Se conecto a la sala');
    });

    socket.on('playerPlayed', async (context) => {
      const { gameId, play, userId } = context;

      if (!userId) return;
      let game;
      try {
        game = await Game.findById(gameId).populate('table');
      } catch (err) {
        return console.error(err.message);
      }

      if (!game) return console.error({ error: 'Corrupt game' });

      if (game.player1 != userId
        && game.player2 != userId) return console.error({ error: 'Invalid action' });

      const ico = game.player1 == userId ? 1 : 2;
      const { table } = game;

      if (ico !== table.status) return console.error({ error: 'Invalid action' });

      if (table[`p_${play}`] !== 0) return console.error({ error: 'Invalid action' });
      table[`p_${play}`] = ico;
      table.status = ico === 1 ? 2 : 1;

      const winner = isWinner(table);
      if (winner) {
        table.winner = winner;
      }

      try {
        await table.save();
      } catch (err) {
        return console.error(err.message);
      }

      io.to(gameId).emit('played', { table });
    });
  });
}