import express from 'express';
import loginRouter from './login';
import userRouter from './user';

const router = express.Router();

router.use('/', userRouter);

router.delete('/logout', (req: any, res: any) => {
  res.clearCookie('token');
  res.status(200).json();
});

router.use('/login', loginRouter);

export default router;
