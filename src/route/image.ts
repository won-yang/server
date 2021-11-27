import express from 'express';
import check_login from '../middleware/check_login';
import * as logic_image from '../logic/image';
import CustomError from '../interface/error';

const router = express.Router();

router.post('/upload_url', check_login, async (req: any, res, next) => {
  try {
    const uploadUrl = await logic_image.getUploadURL();
    const resData = {
      upload_url: uploadUrl,
    };

    res.status(200).json(resData);
  } catch (err) {
    next(err);
  }
});

export default router;
