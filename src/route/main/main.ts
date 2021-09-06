import express from 'express';
const router = express.Router();

router.get('/', async (req: any, res: any) => {
  let { campus_id } = req.query;

  if (!campus_id) {
    res.status(400).send('');
    return;
  }

  const { university_name: universityName };

  res.status(200).json({ university_name: universityName });
});

export default router;
