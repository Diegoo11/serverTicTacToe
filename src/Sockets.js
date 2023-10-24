export default function Sockets(io) {
  io.on('connection', (socket) => {
    socket.on('conectGame', async (context) => {
      const { gameId } = context;
      socket.join(gameId);
      io.to(gameId).emit('joinPlayer');
      console.log(socket.id, 'Se conecto a la sala');
    });

    socket.on('playerPlayed', async (context) => {
      const { gameId } = context;

      io.to(gameId).emit('played');
    });
  });
}
