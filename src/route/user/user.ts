import express from 'express';
import * as logic_user from '../../logic/user';
import check_login from '../../middleware/check_login';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const id = req.query.id as string;
    if (!id) throw { msg: 'id가 없습니다.' };

    await logic_user.updateLastLogin(parseInt(id, 10));

    res.status(200).json({ asd: '123' });
  } catch (err) {
    next(err);
  }
});

router.put('/sign-up-data', check_login, async (req: any, res, next) => {
  try {
    const id = req.user.id;
    const { campus_id, nickname } = req.body;

    if (!campus_id) throw new Error('캠퍼스 아이디가 없습니다.');
    if (!nickname) throw { msg: '닉네임이 없습니다.' };

    await logic_user.updateSignUpData(id, campus_id, nickname);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

export default router;
