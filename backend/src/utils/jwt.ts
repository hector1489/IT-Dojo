import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const Key = process.env.JWT_SECRET;
console.log('Valor de JWT_SECRET:', Key);

export function signToken(data: any): string {
  if (!Key) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  return jwt.sign(data, Key, { expiresIn: '10m' });
}

export function verifyToken(token: string): any {
  if (!Key) {
    throw new Error('JWT_SECRET no está definido o es nulo');
  }

  try {
    const decoded = jwt.verify(token, Key);
    return decoded;
  } catch (error) {
    throw new Error('Error al verificar el JWT: ');
  }
}

const token = signToken({ userId: 123 });
console.log('Token generado:', token);

try {
  const tokenDecodificado = verifyToken(token);
  console.log('Token decodificado:', tokenDecodificado);
} catch (error) {
  console.error(error);
}
