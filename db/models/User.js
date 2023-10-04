import { Schema, model } from 'mongoose';

const schema = Schema({
  userName: {
    type: String,
    require: true,
    maxlength: 30,
  },
  imgSrc: {
    type: String,
    require: true,
    maxlength: 400,
  },
});

export default model('User', schema);
