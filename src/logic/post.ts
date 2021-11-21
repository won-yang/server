import * as db_post from '../db/post';
import { IPost } from '../interface/interface';

export const getPostInfo = async (postId: number): Promise<IPost> => {
  const postInfo = await db_post.getPostInfo(postId);

  return postInfo;
};

export const writePost = async (post: IPost): Promise<number> => {
  const postId = await db_post.writePost(post);

  return postId;
};

export const deletePost = async (postId: number): Promise<boolean> => {
  const postCount = await db_post.countPostById(postId);
  if (postCount < 1) return false;

  await db_post.deletePost(postId);
  return true;
};
