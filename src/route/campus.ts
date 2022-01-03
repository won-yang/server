import express from 'express';
import CustomError from '../interface/error';
import * as campus_logic from '../logic/campus';
const router = express.Router();

router.get('/', async (req: any, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new CustomError('name이 존재하지 않습니다.');
    }

    const campusList = await campus_logic.getCampusList(name);

    res.status(200).json({ list: campusList });
  } catch (err) {
    next(err);
  }
});

export default router;
