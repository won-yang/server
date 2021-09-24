import express from 'express';
const router = express.Router();
import * as logic_post from '../../logic/post';

router.get('/', async (req: any, res: any) => {
  const { post_id: postId } = req.query;

  if (!postId) {
    res.status(400).send('No post id');
    return;
  }

  const postInfo = await logic_post.getPostInfo(postId);

  res.status(200).json({ post_info: postInfo });
});

export default router;
