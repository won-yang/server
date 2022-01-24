import { checkTokenAlmostExpired } from './../util/utils';
import express from 'express';
import CustomError from '../interface/error';
import * as util from '../util/utils';
import * as userLogic from '../logic/user';

const router = express.Router();

router.use(async (req: any, res, next) => {
  try {
    const token = req.cookies?.token;

    // TODO: 테스트용으로 추가, dev일때만 가능하도록 해야만
    if (req.headers?.authorization) {
      const user = await userLogic.get(req.headers?.authorization);

      if (util.isNullOrUndefined(user)) {
        throw new CustomError('invalid test user', 401);
      }

      req.user = user;
      next();
      return;
    }

    if (util.isNullOrUndefined(token)) {
      throw new CustomError('token does not exist', 401);
    }

    const verifiedToken = util.verifyToken(token);

    if (util.isNullOrUndefined(verifiedToken) || util.isNullOrUndefined(verifiedToken.id)) {
      throw new CustomError('invalid token', 401);
    }

    const user = await userLogic.get(verifiedToken.id);

    if (checkTokenAlmostExpired(token)) {
      const token = util.createJwt(user.id);
      res.cookie('token', token, util.getCookieOption());
    }

    if (util.isNullOrUndefined(user)) {
      throw new CustomError('invalid token', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

export default router;
