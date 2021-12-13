import express from 'express';
import { nextTick } from 'process';
const router = express.Router();
import * as board_logic from '../../logic/board';

router.get('/', async (req: any, res: any, next) => {
  try {
    let { type, page, campus_id } = req.query;

    if (!page || !campus_id) {
      res.status(400).send('');
      return;
    }

    if (type === undefined) type = null;

    const result = await board_logic.getPostList(type, page, campus_id);

    res.status(200).json({ total_post: result.total_post, post: result.post });
  } catch (err) {
    next(err);
  }
});

export default router;
