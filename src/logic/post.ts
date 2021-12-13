import { IUpdatePost } from './../interface/interface';
import * as db_post from '../db/post';
import { IPost } from '../interface/interface';

export const getPostInfo = async (postId: number): Promise<IPost> => {
  const postInfo = await db_post.getPostInfo(postId);

  return postInfo;
};

export const writePost = async (post: IPost): Promise<void> => {
  await db_post.writePost(post);
};

export const updatePost = async (post: IUpdatePost): Promise<void> => {
  await db_post.updatePost(post);
};

export const deletePost = async (postId: number): Promise<boolean> => {
  const res = await db_post.deletePost(postId);

  return res;
};
