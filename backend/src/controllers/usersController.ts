import UserModel from '../models/userModel'
import { jwtSign } from '../utils/jwt'
import * as bcrypt from '../utils/bcrypt'
import { comparePassword } from '../utils/bcrypt'

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
      return await this.userModel.getUserById(userId)
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

  async createUser(email: string, pass: string, is_admin: boolean) {
    try {
      const hashedPassword = await bcrypt.hashPassword(pass)
      return await this.userModel.createUser(email, hashedPassword, is_admin)
    } catch (error) {
      throw new Error('Error al crear usuario desde el controlador')
    }
  }

  async login(email: string, pass: string) {
    try {
      const user = await this.userModel.getUserByEmail(email)
      if (!user) {
        throw new Error('Usuario no encontrado')
      }
      const isPasswordValid = await comparePassword(pass, user?.pass)
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta')
      }
      const token = jwtSign({ userId: user.id, email: user?.email })
      console.log('Proceso de autenticación exitoso')
      return { token, user }
    } catch (error) {
      console.error('Error durante la autenticación:', error)
      throw new Error('Error al autenticar usuario desde el controlador: ')
    }
  }

  async updateUser(userId: string, email: string, pass: string, is_admin: boolean) {
    try {
      const hashedPassword = await bcrypt.hashPassword(pass);
      return await this.userModel.updateUser(userId, email, hashedPassword, is_admin)
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
