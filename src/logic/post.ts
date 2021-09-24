import { ICampus } from '../interface/interface';
import * as db_post from '../db/post';

export const getPostInfo = async (postId: number):  => {
  const postInfo = await db_post.getPostInfo(postId);

  return postInfo;
};
