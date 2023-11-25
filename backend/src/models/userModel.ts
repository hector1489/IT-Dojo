import { Pool, QueryResult } from 'pg'

class UserModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getUsers(): Promise<any[]> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM usuarios')
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener usuarios')
    }
  }

  async getUserById(userId: string): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM usuarios WHERE id = $1', [userId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener usuario por ID')
    }
  }

  async createUser(email: string, pass: string, es_admin: boolean): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'INSERT INTO usuarios (email, pass, es_admin) VALUES ($1, $2, $3) RETURNING *',
        [email, pass, es_admin]
      );
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear usuario')
    }
  }

  async updateUser(userId: string, email: string, pass: string, es_admin: boolean): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'UPDATE usuarios SET email = $2, pass = $3, es_admin = $4 WHERE id = $1 RETURNING *',
        [userId, email, pass, es_admin]
      );
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al actualizar usuario')
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.pool.query('DELETE FROM usuarios WHERE id = $1', [userId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar usuario')
    }
  }


}

export default UserModel
