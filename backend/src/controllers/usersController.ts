import UserModel from '../models/userModel'
import { signToken } from '../utils/jwt'
import { hashPassword, comparePassword } from '../utils/bcrypt'

class UsersController {
  private userModel: UserModel

  constructor(userModel: UserModel) {
    this.userModel = userModel
  }

  async getUsers() {
    try {
      return await this.userModel.getUsers()
    } catch (error) {
      throw new Error('Error al obtener usuarios desde el controlador')
    }
  }

  async getUserById(userId: string) {
    try {
      return await this.userModel.getUserById(userId);
    } catch (error) {
      throw new Error('Error al obtener usuario por ID desde el controlador')
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userModel.getUserByEmail(email)
    } catch (error) {
      throw new Error('Error al obtener usuario por correo electrónico desde el controlador')
    }
  }

  async createUser(email: string, pass: string, es_admin: boolean) {
    try {
      const hashedPassword = await hashPassword(pass)
      return await this.userModel.createUser(email, hashedPassword, es_admin)
    } catch (error) {
      throw new Error('Error al crear usuario desde el controlador')
    }
  }

  async login(email: string, pass: string) {
    try {
      const user = await this.userModel.getUserByEmail(email)

      if (!user) {
        throw new Error('Credenciales inválidas')
      }

      const isPasswordValid = await comparePassword(pass, user.pass)

      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas')
      }

      const token = signToken({ userId: user.id, email: user.email })

      return { token, user }
    } catch (error) {
      throw new Error('Error al autenticar usuario desde el controlador')
    }
  }

  async updateUser(userId: string, email: string, pass: string, es_admin: boolean) {
    try {
      const hashedPassword = await hashPassword(pass)
      return await this.userModel.updateUser(userId, email, hashedPassword, es_admin)
    } catch (error) {
      throw new Error('Error al actualizar usuario desde el controlador')
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.userModel.deleteUser(userId)
    } catch (error) {
      throw new Error('Error al eliminar usuario desde el controlador')
    }
  }
}

export default UsersController
