import express from 'express';
import * as campus_logic from '../logic/campus';
const router = express.Router();

router.get('/', async (req: any, res) => {
  const { name } = req.query;

  if (!name) {
    res.status(400).send('');
    return;
  }

  const campusList = await campus_logic.getCampusList(name);

  res.status(200).json({ list: campusList });
});

export default router;
