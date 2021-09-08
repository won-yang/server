import express from 'express';
import { verifyToken } from '../util';
import * as userLogic from '../logic/user';

const router = express.Router();

router.use(function (req: any, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) throw 'token does not exist';

    const verifedToken = verifyToken(token);

    if (!verifedToken || !verifedToken.id) throw 'invalid token';

    const user = userLogic.get(verifedToken.id);

    if (!user) next(new Error('invalid token'));
    req.user = user;
    next();
  } catch (err) {
    next(new Error(err));
  }
});

export default router;
