import { IPostBoardList } from '../interface/interface';
import { TPOST_STATUS } from '../interface/types';
import * as db_post from '../db/post';
import { getResizedImage } from '../util';

const converStatusName = (type: 'in_progress'): TPOST_STATUS | null => {
  switch (type) {
    case 'in_progress':
      return 'IN_PROGRESS';
    default:
      return null;
  }
};

const defaultUrl =
  'https://cityhiker.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A9%E1%84%83%E1%85%A2%E1%84%89%E1%85%A1%E1%86%AB_%E1%84%80%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%AF_1.jpg';

export const getPostList = async (
  type: 'in_progress' | null,
  page: number,
  campusId: number,
): Promise<{ total_post: number; post: IPostBoardList[] }> => {
  const convertedType = converStatusName(type);
  const postList = await db_post.getPostForBoard(convertedType, page, campusId);

  const postListForClient: IPostBoardList[] = postList.map((post) => {
    const imageUrl = getResizedImage(post.image_url) ?? defaultUrl;

    return {
      id: post.id,
      image_url: imageUrl,
      title: post.title,
      deposit: post.deposit,
      monthly_rent: post.monthly_rent,
      address: post.address,
      created_at: post.created_at,
      post_status: post.post_status,
    };
  });

  return {
    total_post: postList.length,
    post: postListForClient,
  };
};
