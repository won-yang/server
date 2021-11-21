import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import CustomError from '../interface/error';
import { IJwtData } from '../interface/interface';

export const createToken = (data: IJwtData): string => {
  return sign(data, process.env.JWT_SECRET, { expiresIn: '1h' } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return verify(token, process.env.JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new CustomError('invalid token', 403);
  }
};

export const getResizedImage = (url: string): null | string => {
  if (!url) return null;

  const urlList = url.split('/');

  if (urlList.length < 3) return null;

  const imageName = urlList[urlList.length - 1];
  const region = process.env.AWS_REGION;
  const uploadBucket = process.env.UPLOAD_BUCKET;

  if (!region) return null;
  if (!uploadBucket) return null;

  return `https://${uploadBucket}-resize.s3.${region}.amazonaws.com/resized-${imageName}`;
};

export const getCurrentTimeYYMMDD = (): string => {
  const happyNewYear = new Date();
  const year = happyNewYear.getFullYear();
  const month = happyNewYear.getMonth() + 1;
  const date = happyNewYear.getDate();

  return `${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}`;
};

export const getCurrentTimeYYMMDDWithTime = (): string => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  const datetext = time.toTimeString().split(' ')[0];

  return `${`${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}` + ' '}${datetext}`;
};
