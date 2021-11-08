import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

import CustomError from '../interface/error';

import userRouter from './user';
import campusRouter from './campus';
import boardRouter from './main/board';
import mainRouter from './main/main';
import imageRouter from './image';
import postRouter from './post/post';
import writeRouter from './post/write';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('common'));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/main', mainRouter);
app.use('/api/campus', campusRouter);
app.use('/api/board', boardRouter);
app.use('/api/image', imageRouter);
app.use('/api/post', postRouter);
app.use('/api/write', writeRouter);

app.get('/api/hello', (req: any, res: any) => {
  res.status(200).send('hello world!');
});

app.get('*', (req: any, res: any) => {
  res.status(404).send('not found');
});

app.use(function (err: CustomError, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err?.message || 'server error!');
});

app.listen(8080, () => {
  console.log('Running...');
});
