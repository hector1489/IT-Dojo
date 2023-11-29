import { Pool, QueryResult } from 'pg'

class FavoriteModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getFavorites(): Promise<any[]> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM favorites;')
      return result.rows
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener favoritos')
    }
  }

  async getFavoriteById(favoriteId: string): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM favorites WHERE id = $1;', [favoriteId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener favorito por ID')
    }
  }

  async createFavorite(userId: string, inventoryId: number): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'INSERT INTO favorites (user_id, inventory_id) VALUES ($1, $2) RETURNING *;',
        [userId, inventoryId]
      )
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear favorito')
    }
  }

  async deleteFavorite(favoriteId: string): Promise<void> {
    try {
      await this.pool.query('DELETE FROM favorites WHERE id = $1;', [favoriteId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar favorito')
    }
  }

}

export default FavoriteModel
