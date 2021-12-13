import express from 'express';
import * as campus_logic from '../logic/campus';
const router = express.Router();

router.get('/', async (req: any, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).send('');
      return;
    }

    const campusList = await campus_logic.getCampusList(name);

    res.status(200).json({ list: campusList });
  } catch (err) {
    next(err);
  }
});

export default router;
