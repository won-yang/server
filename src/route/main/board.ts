import express from 'express';
import CustomError from '../../interface/error';
import * as board_logic from '../../logic/board';
import { isNullOrUndefined } from '../../util/utils';

const router = express.Router();

router.get('/', async (req: any, res: any, next) => {
  try {
    let { type, page, campus_id } = req.query;

    if (isNullOrUndefined(page)) throw new CustomError('해당 page가 없습니다.');

    if (isNullOrUndefined(campus_id)) throw new CustomError('캠퍼스 id가 없습니다.');

    if (type === undefined) type = null;

    const result = await board_logic.getPostList(type, page, campus_id);

    res.status(200).json({ total_post: result.total_post, post: result.post });
  } catch (err) {
    next(err);
  }
});

export default router;
