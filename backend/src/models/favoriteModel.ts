import { QueryResult } from 'pg'

class FavoriteModel {
  private db: (query: string, values: any[]) => Promise<QueryResult<any>>

  constructor(db: (query: string, values: any[]) => Promise<QueryResult<any>>) {
    this.db = db
  }

  async getFavorites(): Promise<any[]> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM favorites;', [])
      return result.rows
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener favoritos')
    }
  }

  async getFavoriteById(favoriteId: string): Promise<any> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM favorites WHERE user_id = $1;', [favoriteId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener favorito por ID')
    }
  }

  async createFavorite(user_id: string, inventory_id: number): Promise<any> {
    try {
      const result: QueryResult = await this.db(
        'INSERT INTO favorites (user_id, inventory_id) VALUES ($1, $2) RETURNING *;',
        [user_id, inventory_id]
      )
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear favorito')
    }
  }

  async deleteFavorite(userId: string, inventoryId: number): Promise<void> {
    try {
      await this.db('DELETE FROM favorites WHERE user_id = $1 AND inventory_id = $2;', [userId, inventoryId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar favorito')
    }
  }

}

export default FavoriteModel
