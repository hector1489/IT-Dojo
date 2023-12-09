import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const KEY = process.env.JWT_SECRET

export const jwtVerify = (token: string): any => {
  if (!KEY) {
    throw new Error('JWT_SECRET no está definido o es nulo')
  }

  try {
    return jwt.verify(token, KEY)
  } catch (error) {
    console.error('Error al verificar el token:', error)
    throw new Error('Token inválido.')
  }
}

export const jwtSign = (data: any): string => {
  if (!KEY) {
    throw new Error('JWT_SECRET no está definido o es nulo')
  }

  console.log('Valor de KEY al firmar el token:', KEY)

  return jwt.sign(data, KEY, { expiresIn: '5m' })
}
