import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const KEY = process.env.JWT_SECRET;

export const jwtVerify = (token: string): any => {
  if (!KEY) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  return jwt.verify(token, KEY, (err, decoded) => {
    if (err) {
      throw new Error('Token inválido.');
    }
    return decoded;
  });
};

export const jwtSign = (data: any): string => {
  if (!KEY) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  return jwt.sign(data, KEY, { expiresIn: '10m' });
};
