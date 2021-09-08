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

router.put('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
