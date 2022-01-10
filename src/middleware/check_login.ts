import express from 'express';
import CustomError from '../interface/error';
import { verifyToken } from '../util/utils';
import * as userLogic from '../logic/user';
import { isNullORUndefined } from '../util/utils';


const router = express.Router();

router.use(async (req: any, res, next) => {
  try {
    const token = req.cookies?.token;

    // TODO: 테스트용으로 추가, dev일때만 가능하도록 해야만
    if (req.headers?.authorization) {
      const user = await userLogic.get(req.headers?.authorization);

      if (isNullORUndefined(user)) throw new CustomError('invalid test user', 401);

      req.user = user;
      next();
      return;
    }

    if (isNullORUndefined(token)) throw new CustomError('token does not exist', 401);

    const verifiedToken = verifyToken(token);

    if (isNullORUndefined(verifiedToken) || isNullORUndefined(verifiedToken.id)) throw new CustomError('invalid token', 401);

    const user = await userLogic.get(verifiedToken.id);

    if (isNullORUndefined(user)) throw new CustomError('invalid token', 401);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

export default router;
