import UserModel from '../models/userModel'

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

  async createUser(email: string, pass: string, es_admin: boolean) {
    try {
      return await this.userModel.createUser(email, pass, es_admin)
    } catch (error) {
      throw new Error('Error al crear usuario desde el controlador')
    }
  }

  async updateUser(userId: string, email: string, pass: string, es_admin: boolean) {
    try {
      return await this.userModel.updateUser(userId, email, pass, es_admin)
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
