import express from 'express';
import check_login from '../middleware/check_login';

import * as image_logic from '../logic/image';
const router = express.Router();

router.get('/', check_login, async (req: any, res, next) => {
  try {
    const awsUploadObject = await image_logic.getUploadURL();

    res.status(200).json(awsUploadObject);
  } catch (err) {
    next(err);
  }
});

export default router;
