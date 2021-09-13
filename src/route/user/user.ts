import CustomError from './../../interface/error';
import express from 'express';
import * as logic_user from '../../logic/user';
import check_login from '../../middleware/check_login';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const id = req.query.id as string;
    if (!id) throw new CustomError('id가 없습니다.');

    await logic_user.updateLastLogin(parseInt(id, 10));

    res.status(200).json({ asd: '123' });
  } catch (err) {
    next(err);
  }
});

router.get('/validate-nickname', check_login, async (req: any, res, next) => {
  try {
    const nickname = req.query.nickname as string;

    if (!nickname) throw new CustomError('닉네임이 없습니다.');

    const isValid = await logic_user.validateNickname(nickname);

    res.status(200).json({ is_valid: isValid });
  } catch (err) {
    next(err);
  }
});

router.put('/sign-up-data', check_login, async (req: any, res, next) => {
  try {
    const id = req.user.id;
    const { campus_id: campusId, nickname } = req.body;

    if (!campusId) throw new CustomError('캠퍼스 아이디가 없습니다.');
    if (!nickname) throw new CustomError('닉네임이 없습니다.');

    const isValid = await logic_user.validateNickname(nickname);

    if (!isValid) throw new CustomError('유효하지 않은 닉네임입니다.');

    await logic_user.updateSignUpData(id, campusId, nickname);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

export default router;
