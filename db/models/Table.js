import { Schema, model } from 'mongoose';

const schema = Schema({
  p_0: {
    type: Number,
    required: true,
  },
  p_1: {
    type: Number,
    required: true,
  },
  p_2: {
    type: Number,
    required: true,
  },
  p_3: {
    type: Number,
    required: true,
  },
  p_4: {
    type: Number,
    required: true,
  },
  p_5: {
    type: Number,
    required: true,
  },
  p_6: {
    type: Number,
    required: true,
  },
  p_7: {
    type: Number,
    required: true,
  },
  p_8: {
    type: Number,
    required: true,
  },
});

export default model('Table', schema);
