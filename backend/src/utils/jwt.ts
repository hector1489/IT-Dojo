import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const Key = process.env.JWT_SECRET;

export function signToken(data: any): string {
  if (!Key) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  return jwt.sign(data, Key, { expiresIn: '10m' });
}

export function jwtVerify(token: string): any {
  if (!Key) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  return jwt.verify(token, Key, (err, decoded) => {
    if (err) {
      throw new Error('Token inválido.');
    }
    return decoded;
  });
}

const token = signToken({ userId: 123 });

