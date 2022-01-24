import CustomError from './../../interface/error';
import express from 'express';
import * as logic_user from '../../logic/user';
import * as logic_campus from '../../logic/campus';
import check_login from '../../middleware/check_login';
import { isNullOrUndefined } from '../../util/utils';

const router = express.Router();

router.get('/', check_login, async (req: any, res, next) => {
  try {
    const id = req.user.id;
    const campusId = req.user.campus_id;
    const nickname = req.user.nickname;
    const campusName = await logic_campus.getCampusName(campusId);

    res.status(200).json({ user_id: id, campus_id: campusId, nickname, campus_name: campusName });
  } catch (err) {
    next(err);
  }
});

router.get('/validate-nickname', check_login, async (req: any, res, next) => {
  try {
    const nickname = req.query.nickname as string;

    if (isNullOrUndefined(nickname)) throw new CustomError('닉네임이 없습니다.');

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

    if (isNullOrUndefined(campusId)) throw new CustomError('캠퍼스 아이디가 없습니다.');
    if (isNullOrUndefined(nickname)) throw new CustomError('닉네임이 없습니다.');

    const isValid = await logic_user.validateNickname(nickname);

    if (isNullOrUndefined(isValid)) throw new CustomError('유효하지 않은 닉네임입니다.');

    await logic_user.updateSignUpData(id, campusId, nickname);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

export default router;
