import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import User from '../../db/models/User.js';
import 'dotenv/config';

const login = async (root, args) => {
  const { username, password } = args;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const match = await bcrypt.compare(password, user?.password);

  if (!user || !match) throw new GraphQLError('Wrong credentials');

  const userToken = {
    username: user.username,
    imgSrc: user.imgSrc,
    id: user.id,
  };
  return { value: jwt.sign(userToken, process.env.JWT_STRING_SECRET) };
};

export default login;
