import express from 'express';
const router = express.Router();
import * as logic_post from '../../logic/post';

router.get('/', async (req: any, res: any, next) => {
  try {
    const { id: postId } = req.query;

    if (!postId) {
      res.status(400).send('No post id');
      return;
    }

    const postInfo = await logic_post.getPostInfo(postId);

    res.status(200).json({ post_info: postInfo });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req: any, res: any, next) => {
  try {
    const { id: postId } = req.params;

    if (!postId) {
      res.status(400).send('No post id');
      return;
    }

    const isSuccess = await logic_post.deletePost(postId);

    if (!isSuccess) {
      res.status(204).send('post does not exist');
    }

    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

export default router;
