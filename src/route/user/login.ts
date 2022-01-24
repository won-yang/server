import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as KakaoStrategy, StrategyOption } from 'passport-kakao';
import * as util from '../../util/utils';
import * as user_logic from '../../logic/user';

dotenv.config();

const router = express.Router();
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_CALLBACK_URL = process.env.KAKAO_CALLBACK_URL;

const successLogin = async (req, res, next) => {
  try {
    const token = util.createJwt(req.user.id);
    const isSigned = user_logic.checkSignedUser(req.user);
    await user_logic.updateLastLogin(req.user.id);

    res.cookie('token', token, util.getCookieOption());
    res.status(200).json({ is_signed: isSigned, campus_id: req.user.campus_id });
  } catch (err) {
    next(err);
  }
};

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      callbackURL: KAKAO_CALLBACK_URL, // 위에서 설정한 Redirect URI
    } as StrategyOption,
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user = await user_logic.getOrCreate(profile.id);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

const kakaoCallbackMiddleWare = passport.authenticate('kakao', { session: false, failureRedirect: '/api/user/login' });

router.get('/', passport.authenticate('kakao', { session: false }));
router.get('/kakao-callback', kakaoCallbackMiddleWare, successLogin);

export default router;
