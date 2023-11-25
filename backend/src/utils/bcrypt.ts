import * as bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10)

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds)
}

export function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}
