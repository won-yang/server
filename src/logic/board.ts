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

const defaultUrl =
  'https://wonyang-image.s3.ap-northeast-2.amazonaws.com/thumbnail.png';

export const getPostList = async (
  type: 'in_progress' | null,
  page: number,
  campusId: number,
): Promise<{ total_post: number; post: IPostBoardList[] }> => {
  const convertedType = convertStatusName(type);
  const postList = await db_post.getPostForBoard(convertedType, page, campusId);

  const postListForClient: IPostBoardList[] = postList.map((post) => {
    const imageUrl: string = post.image_url ?? defaultUrl;
    const resizedImageUrl = getResizedImage(imageUrl);

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
    total_post: postList.length,
    post: postListForClient,
  };
};
