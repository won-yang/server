import express from 'express';
import check_login from '../middleware/check_login';
import * as logic_image from '../logic/image';
import CustomError from '../interface/error';

const router = express.Router();

router.post('/upload_url', check_login, async (req: any, res, next) => {
  try {
    const awsUploadObject = await logic_image.getUploadURL();
    const resData = {
      upload_url: awsUploadObject.uploadURL,
      key: awsUploadObject.key,
    };

    res.status(200).json(resData);
  } catch (err) {
    next(err);
  }
});

router.post('/', check_login, async (req: any, res, next) => {
  try {
    const { img_urls: imgUrls } = req.body;

    if (!imgUrls) throw new CustomError('img url이 없습니다.');

    await logic_image.createImage(imgUrls);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.get('/', check_login, async (req: any, res, next) => {
  try {
    const { post_id: postId } = req.query;

    if (!postId) throw new CustomError('post id가 없습니다.');

    const imgUrls = await logic_image.getImages(postId);

    res.status(200).json({ img_urls: imgUrls });
  } catch (err) {
    next(err);
  }
});

export default router;