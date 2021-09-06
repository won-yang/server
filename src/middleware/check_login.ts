import express from 'express';
import { verifyToken } from '../util';
import * as userLogic from '../logic/user';

const router = express.Router();

router.use(function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) next('token does not exist');

  const verifedToken = verifyToken(token);

  if (!verifedToken || !verifedToken.id) next('invalid token');

  const user = userLogic.get(verifedToken.id);

  if (!user) next('invalid token');
  next();
});

export default router;
