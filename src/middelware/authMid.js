import jwt from 'jsonwebtoken';
import User from '../../db/models/User.js';

import 'dotenv/config';

const { JWT_STRING_SECRET } = process.env;

const authMid = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next();

  const matchToken = jwt.decode(token.substring(7), JWT_STRING_SECRET);

  if (!matchToken?.id) return next();

  const { id } = matchToken;

  const currentUser = await User.findById(id);

  req.currentUser = currentUser;

  next();
};

export default authMid;
