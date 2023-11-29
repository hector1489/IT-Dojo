import { Pool, QueryResult } from 'pg'

interface User {
  id: string
  email: string
  pass: string
  es_admin: boolean
}

class UserModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getUsers(): Promise<User[]> {
    try {
      const result: QueryResult<User> = await this.pool.query('SELECT * FROM users;')
      return result.rows
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      throw new Error('Error al obtener usuarios')
    }
  }

  async getUserById(userId: string): Promise<User | undefined> {
    try {
      const result: QueryResult<User> = await this.pool.query('SELECT * FROM users WHERE id = $1;', [userId])
      return result.rows[0]
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error)
      throw new Error('Error al obtener usuario por ID')
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result: QueryResult<User> = await this.pool.query('SELECT * FROM users WHERE email = $1;', [email])
      return result.rows[0]
    } catch (error) {
      console.error('Error al obtener usuario por correo electrónico:', error)
      throw new Error('Error al obtener usuario por correo electrónico')
    }
  }

  async createUser(email: string, pass: string, es_admin: boolean): Promise<User> {
    try {
      const result: QueryResult<User> = await this.pool.query(
        'INSERT INTO users (email, pass, is_admin) VALUES ($1, $2, $3) RETURNING *;',
        [email, pass, es_admin]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error al crear usuario:', error)
      throw new Error('Error al crear usuario')
    }
  }

  async updateUser(userId: string, email: string, pass: string, es_admin: boolean): Promise<User> {
    try {
      const result: QueryResult<User> = await this.pool.query(
        'UPDATE users SET email = $2, pass = $3, is_admin = $4 WHERE id = $1 RETURNING *;',
        [userId, email, pass, es_admin]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      throw new Error('Error al actualizar usuario')
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.pool.query('DELETE FROM users WHERE id = $1;', [userId])
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      throw new Error('Error al eliminar usuario')
    }
  }
}

export default UserModel
