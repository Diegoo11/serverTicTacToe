import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import User from '../../db/models/User.js';
import 'dotenv/config';

const register = async (root, args) => {
  const { username, password } = args;

  const userDuplicate = await User.findOne({ username });
  if (userDuplicate) throw new GraphQLError('User ready created');

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username, password: hashPassword, imgSrc: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
  });

  try {
    await user.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  const userToken = {
    username: user.username,
    imgSrc: user.imgSrc,
    id: user.id,
  };
  return { value: jwt.sign(userToken, process.env.JWT_STRING_SECRET) };
};

export default register;
