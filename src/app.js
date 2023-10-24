import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

import '../db/db.js';
import Sockets from './Sockets.js';

import main from './router/main.js';

import 'dotenv/config';
import authMid from './middelware/authMid.js';

const { PORT } = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(authMid);

app.use(main);

Sockets(io);

server.listen(PORT, () => {
  console.log(`Example app listening  http://localhost:${PORT}`);
});
