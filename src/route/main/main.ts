import express from 'express';
const router = express.Router();
import * as logic_campus from '../../logic/campus';

router.get('/', async (req: any, res: any) => {
  const { campus_id } = req.query;

  if (!campus_id) {
    res.status(400).send('No campus id');
    return;
  }

  const campusName = await logic_campus.getCampusName(campus_id);

  res.status(200).json({ campus_name: campusName });
});

export default router;
