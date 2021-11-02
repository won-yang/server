import * as db_post from '../db/post';
import { IPost } from '../interface/interface';

export const getPostInfo = async (postId: number): Promise<IPost> => {
  console.log(postId);

  const postInfo = await db_post.getPostInfo(postId);

  return postInfo;
};
