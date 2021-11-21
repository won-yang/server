import express from 'express';
import CustomError from '../interface/error';
import { verifyToken } from '../util/utils';
import * as userLogic from '../logic/user';

const router = express.Router();

router.use(function (req: any, res, next) {
  try {
    const token = req.cookies?.token || req.headers?.authorization;

    if (!token) throw new CustomError('token does not exist', 403);

    const verifiedToken = verifyToken(token);

    if (!verifiedToken || !verifiedToken.id) throw new CustomError('invalid token', 403);

    const user = userLogic.get(verifiedToken.id);

    if (!user) throw new CustomError('invalid token', 403);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

export default router;
