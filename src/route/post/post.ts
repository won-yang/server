import express from 'express';
import CustomError from '../../interface/error';
import * as logic_post from '../../logic/post';
import { isNullORUndefined } from '../../util/utils';

const router = express.Router();

router.get('/', async (req: any, res: any, next) => {
  try {
    const { id: postId } = req.query;

    if (isNullORUndefined(postId)) throw new CustomError('post id가 없습니다.');

    const postInfo = await logic_post.getPostInfo(postId);

    res.status(200).json({ post_info: postInfo });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req: any, res: any, next) => {
  try {
    const { id: postId } = req.params;

    if (isNullORUndefined(postId)) throw new CustomError('post id가 없습니다.');

    const isSuccess = await logic_post.deletePost(postId);

    if (isNullORUndefined(isSuccess)) throw new CustomError('post가 존재하지 않습니다.');

    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

export default router;
