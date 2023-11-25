import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  throw new Error('JWT_SECRET not found in environment variables')
}

export function signToken(data: any): string {
  if (!secretKey) {
    throw new Error('JWT_SECRET is undefined or null')
  }

  return jwt.sign(data, secretKey, { expiresIn: '10m' })
}

export function verifyToken(token: string): any {
  if (!secretKey) {
    throw new Error('JWT_SECRET is undefined or null')
  }

  return jwt.verify(token, secretKey)
}
