import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import { IJwtData } from '../interface/interface';

const createToken = (data: IJwtData): string => {
  return sign(data, process.env.JWT_SECRET, { expiresIn: '1h' } as SignOptions);
};

const verifyToken = (token: string): JwtPayload => {
  return verify(token, process.env.JWT_SECRET) as JwtPayload;
};

const getResizedImage = (url: string): null | string => {
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

export { createToken, verifyToken, getResizedImage };
