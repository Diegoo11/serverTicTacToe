import express from 'express';
import 'dotenv/config';

import {
  resgisterPost, loginPut, gamePost, gamePut, tableResetPut,
  tablePut, tableTurnGet, tableEnemyGet, tableGet, userGet,
} from '../controllers/main.js';

const router = express.Router();
// querys

router.get('/table/a/:d', (req, res) => res.json({ data: req.params.d }));
router.get('/table/turn', tableTurnGet);

router.get('/table/enemy', tableEnemyGet);

router.get('/table', tableGet);

router.get('/user', userGet);

// mutations
router.post('/register', resgisterPost);

router.put('/login', loginPut);

router.post('/game', gamePost);

router.put('/game', gamePut);

router.put('/table/reset', tableResetPut);

router.put('/table', tablePut);

router.get('/api', (req, res) => {
  res.json({ data: 'dataaaadsada' });
});

export default router;
