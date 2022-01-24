import { JwtPayload, sign, SignOptions, verify, decode } from 'jsonwebtoken';
import CustomError from '../interface/error';
import { IJwtData } from '../interface/interface';

export const COOKIE_EXPIRES_TIME = 1000 * 60 * 60;
export const TOKEN_EXPIRES_TIME = 60 * 60;

export const createJwt = (userId: number): string => {
  const tokenData = {
    id: userId,
  } as IJwtData;

  return sign(tokenData, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES_TIME } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return verify(token, process.env.JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new CustomError('invalid token', 401);
  }
};

export const checkTokenAlmostExpired = (token: string) => {
  try {
    const { exp } = decode(token) as JwtPayload;
    const expireTime = new Date(exp * 1000);
    const refreshTime = (TOKEN_EXPIRES_TIME * 1000) / 2;

    if (expireTime.getTime() - Date.now() < refreshTime) {
      return true;
    }
    return false;
  } catch (err) {
    throw new CustomError('invalid token', 401);
  }
};

export const getCookieOption = () => {
  return { maxAge: COOKIE_EXPIRES_TIME, httpOnly: true };
};

export const getResizedImage = (url: string): null | string => {
  if (!url) return null;

  const urlList = url.split('/');
  if (urlList.length < 3) return null;

  const region = process.env.AWS_REGION;
  const uploadBucket = process.env.UPLOAD_BUCKET;

  if (!region) return null;
  if (!uploadBucket) return null;

  const imageName = urlList[urlList.length - 1];
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

export const isNullOrUndefined = (object: any): boolean => {
  if (object === null || object === undefined) {
    return true;
  }
  return false;
};
