import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import { IJwtData } from '../interface/interface';

const createToken = (data: IJwtData) => {
  return sign(data, process.env.JWT_SECRET, { expiresIn: '1h' } as SignOptions);
};

const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET) as JwtPayload;
};

export { createToken, verifyToken };
