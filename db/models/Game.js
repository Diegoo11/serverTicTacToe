import { Schema, model } from 'mongoose';

const schema = Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
});

export default model('Game', schema);
