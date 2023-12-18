import { QueryResult } from 'pg'

interface User {
  id: string;
  email: string;
  pass: string;
  is_admin: boolean;
}

class UserModel {
  private db: (query: string, values: any[]) => Promise<QueryResult<any>>

  constructor(db: (query: string, values: any[]) => Promise<QueryResult<any>>) {
    this.db = db
  }

  async getUsers() {
    try {
      const result = await this.db('SELECT * FROM users;', [])
      return result.rows
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new Error('Error al obtener usuarios desde el modelo')
    }
  }

  async getUserById(userId: string) {
    try {
      const result = await this.db('SELECT * FROM users WHERE id = $1;', [userId])
      return result.rows[0] || { error: 'Usuario no encontrado' }
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error)
      throw new Error('Error al obtener usuario por ID desde el modelo')
    }
  }

  async getUserByEmail(email: string) {
    try {
      console.log('getUserByEmail', email)
      const result = await this.db('SELECT * FROM users WHERE email = $1;', [email])
      return result.rows[0]
    } catch (error) {
      console.error('Error al obtener usuario por correo electrónico:', error)
      throw new Error('Error al obtener usuario por correo electrónico desde el modelo')
    }
  }

  async createUser(email: string, pass: string, is_admin: boolean) {
    try {
      const result = await this.db(
        'INSERT INTO users (email, pass, is_admin) VALUES ($1, $2, $3) RETURNING *;',
        [email, pass, is_admin]
      )
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error('Error al crear usuario desde el modelo');
    }
  }

  async updateUser(userId: string, email: string, pass: string, is_admin: boolean) {
    try {
      const result = await this.db(
        'UPDATE users SET email = $2, pass = $3, is_admin = $4 WHERE id = $1 RETURNING *;',
        [userId, email, pass, is_admin]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error('Error al actualizar usuario desde el modelo')
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.db('DELETE FROM users WHERE id = $1;', [userId])
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      throw new Error('Error al eliminar usuario desde el modelo')
    }
  }
}

export default UserModel
