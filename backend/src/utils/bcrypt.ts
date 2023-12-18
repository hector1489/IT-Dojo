import * as bcrypt from 'bcrypt'

//rango de rondas de 10 a 12
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10')

export function hashPassword(pass: string): Promise<string> {
  return bcrypt.hash(pass, saltRounds)
}

export function comparePassword(plainPass: string, hashedPass: string): Promise<boolean> {
  return bcrypt.compare(plainPass, hashedPass)
}
