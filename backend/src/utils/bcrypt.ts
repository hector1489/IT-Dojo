import * as bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10')

export function hashPassword(pass: string): Promise<string> {
  return bcrypt.hash(pass, saltRounds)
}

export function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

