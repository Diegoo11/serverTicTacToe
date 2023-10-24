import 'dotenv/config';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../db/models/User.js';
import Table from '../../db/models/Table.js';
import Game from '../../db/models/Game.js';

import isWinner from '../utils/isWinner.js';

const { JWT_STRING_SECRET } = process.env;

export const resgisterPost = async (req, res) => {
  const { username, password } = req.body;

  let duplicateUser;
  try {
    duplicateUser = await User.findOne({ username });
  } catch (err) {
    return res.status(400).json({ eror: err.message });
  }

  if (duplicateUser) return res.json({ error: 'El usuario ya se encuenta registrado' });

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = new User({
    username,
    password: hashPassword,
    imgSrc: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
  });

  try {
    user.save();
  } catch (err) {
    return res.json({ error: err.message });
  }

  const userToken = {
    id: user.id,
  };

  return res.json({ value: jwt.sign(userToken, JWT_STRING_SECRET) });
};

export const loginPut = async (req, res) => {
  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  if (!user) return res.status(404).json({ error: 'Usuario no registrado' });

  const match = await bcryptjs.compare(password, user ? user.password : '');

  if (!user || !match) res.json({ error: 'Invalid username or password' });

  const userToken = {
    id: user.id,
  };

  res.json({ value: jwt.sign(userToken, JWT_STRING_SECRET) });
};

export const gamePost = async (req, res) => {
  const { currentUser } = req;

  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });

  const table = new Table();

  try {
    await table.save();
  } catch (err) {
    return res.sendStatus(400);
  }

  const game = new Game({
    player1: currentUser.id,
    table: table.id,
  });

  try {
    await game.save();
  } catch (err) {
    return res.sendStatus(400);
  }

  res.send({ value: game.id });
};

export const gamePut = async (req, res) => {
  const { currentUser } = req;
  const { gameId } = req.body;

  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });

  const game = await Game.findById(gameId);

  if (!game) return res.status(401).json({ error: 'Corrupt game' });

  const user1 = User.findById(game.player1);
  if (!user1 || game?.player2) res.status(401).json({ error: 'Invalid action' });

  try {
    game.player2 = currentUser.id;
    await game.save();
    return res.json({ value: gameId });
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const tableResetPut = async (req, res) => {
  const { currentUser } = req;
  const { gameId } = req.body;
  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });

  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    return res.sendStatus(400);
  }

  if (
    game.player1 != currentUser.id
    && game.player2 != currentUser.id
  ) return res.status(401).json({ error: 'Invalid action' });

  const { table } = game;

  table.p_0 = 0;
  table.p_1 = 0;
  table.p_2 = 0;
  table.p_3 = 0;
  table.p_4 = 0;
  table.p_5 = 0;
  table.p_6 = 0;
  table.p_7 = 0;
  table.p_8 = 0;
  table.status = 1;
  table.winner = 0;

  try {
    await table.save();
    return res.json({ value: gameId });
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(400);
  }
};

export const tablePut = async (req, res) => {
  const { play, gameId } = req.body;

  const { currentUser } = req;

  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });
  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    return res.sendStatus(400);
  }

  if (!game) return res.status(401).json({ error: 'Corrupt game' });

  if (game.player1 != currentUser.id
    && game.player2 != currentUser.id) return res.status(400).json({ error: 'Invalid action' });

  const ico = game.player1 == currentUser.id ? 1 : 2;
  const { table } = game;

  if (ico !== table.status) return res.status(400).json({ error: 'Invalid action' });

  if (table[`p_${play}`] !== 0) return res.status(400).json({ error: 'Invalid action' });
  table[`p_${play}`] = ico;
  table.status = ico === 1 ? 2 : 1;

  const winner = isWinner(table);
  if (winner) {
    table.winner = winner;
  }

  try {
    await table.save();
  } catch (err) {
    return res.sendStatus(401);
  }

  return res.json({ table });
};

export const userGet = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });
  res.json({ currentUser });
};

export const tableTurnGet = async (req, res) => {
  const { currentUser } = req;

  if (!currentUser) return res.status(401).json({ error: 'No autorizado' });

  const { gameId } = req.query;

  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
  const turn = game.table.status === 1 ? game.player1 : game.player2;

  return res.json({ id: turn });
};

export const tableGet = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.sendStatus(401);

  const { gameId } = req.query;

  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  if (!game) return res.status(401).json({ error: 'Corrupt game' });

  if (
    currentUser.id != game.player1
    && currentUser.id != game.player2
  ) return res.status(401).json({ error: 'Corrupt game' });

  return res.json({ table: game.table });
};

export const tableEnemyGet = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.sendStatus(401);

  const { gameId } = req.query;

  let game;
  try {
    game = await Game.findById(gameId).populate('table');
  } catch (err) {
    return res.sendStatus(401).json({ error: err.message });
  }
  if (!game) return res.sendStatus(401).json({ error: 'Invalid game' });

  const enemyId = game.player1 == currentUser.id ? game.player2 : game.player1;
  const currentIco = game.player1 == currentUser.id ? 1 : 2;
  try {
    const enemy = await User.findById(enemyId);
    return res.json({ enemy, currentIco });
  } catch (err) {
    return res.sendStatus(401).json({ error: err.message });
  }
};
