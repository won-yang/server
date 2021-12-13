import express from 'express';
import loginRouter from './login';
import userRouter from './user';

const router = express.Router();

router.use('/', userRouter);

router.delete('/logout', (req: any, res: any, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.use('/login', loginRouter);

export default router;
