import express from 'express';
import CustomError from '../../interface/error';
import * as logic_campus from '../../logic/campus';

const router = express.Router();

router.get('/', async (req: any, res: any, next) => {
  try {
    const { campus_id } = req.query;

    if (!campus_id) throw new CustomError('캠퍼스 id가 없습니다.');

    const campusName = await logic_campus.getCampusName(campus_id);

    res.status(200).json({ campus_name: campusName });
  } catch (err) {
    next(err);
  }
});

export default router;
