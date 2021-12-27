import { IPostBoardList } from '../interface/interface';
import { TPOST_STATUS } from '../interface/types';
import * as db_post from '../db/post';
import { getResizedImage } from '../util/utils';

const convertStatusName = (type: 'in_progress'): TPOST_STATUS | null => {
  switch (type) {
    case 'in_progress':
      return 'IN_PROGRESS';
    default:
      return null;
  }
};

export const getPostList = async (
  type: 'in_progress' | null,
  page: number,
  campusId: number,
): Promise<{ total_post: number; post: IPostBoardList[] }> => {
  const convertedType = convertStatusName(type);
  const { total_post: totalPost, post: postList } = await db_post.getPostForBoard(convertedType, page, campusId);

  const postListForClient: IPostBoardList[] = postList.map((post) => {
    const resizedImageUrl = getResizedImage(post.image_url);

    return {
      id: post.id,
      image_url: resizedImageUrl,
      title: post.title,
      deposit: post.deposit,
      monthly_rent: post.monthly_rent,
      address: post.address,
      created_at: post.created_at,
      post_status: post.post_status,
    };
  });

  return {
    total_post: totalPost,
    post: postListForClient,
  };
};
