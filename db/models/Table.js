import { Schema, model } from 'mongoose';

const schema = Schema({
  p_0: {
    type: Number,
    required: true,
    default: 0,
  },
  p_1: {
    type: Number,
    required: true,
    default: 0,
  },
  p_2: {
    type: Number,
    required: true,
    default: 0,
  },
  p_3: {
    type: Number,
    required: true,
    default: 0,
  },
  p_4: {
    type: Number,
    required: true,
    default: 0,
  },
  p_5: {
    type: Number,
    required: true,
    default: 0,
  },
  p_6: {
    type: Number,
    required: true,
    default: 0,
  },
  p_7: {
    type: Number,
    required: true,
    default: 0,
  },
  p_8: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Number,
    required: true,
    default: 1,
  },
  winner: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default model('Table', schema);
