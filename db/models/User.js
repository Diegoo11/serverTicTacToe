import { Schema, model } from 'mongoose';

const schema = Schema({
  username: {
    type: String,
    require: true,
    maxlength: 30,
    unique: true,
  },
  imgSrc: {
    type: String,
    require: true,
    maxlength: 400,
  },
  password: {
    type: String,
    require: true,
  },
});

export default model('User', schema);
