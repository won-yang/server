import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './user';
import mainRouter from './main';
import campusRouter from './campus';
import boardRouter from './main/board';

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

app.get('*', (req: any, res: any) => {
  res.status(400).send('not found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err?.msg || 'server error!');
});

app.listen(8080, () => {
  console.log('Running...');
});
