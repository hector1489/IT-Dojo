import { QueryResult } from 'pg'

class InventoryModel {
  private db: (query: string, values: any[]) => Promise<QueryResult<any>>

  constructor(db: (query: string, values: any[]) => Promise<QueryResult<any>>) {
    this.db = db
  }

  async getInventory(): Promise<any[]> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM inventory;', [])
      return result.rows
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener inventario')
    }
  }

  async getInventoryById(inventoryId: number): Promise<any> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM inventory WHERE id = $1;', [inventoryId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener elemento del inventario por ID')
    }
  }

  async createInventory(nombre: string, categoria: string, envio: string, precio: number, stock: number, url: string): Promise<any> {
    try {
      const result: QueryResult = await this.db(
        'INSERT INTO inventory (name, category, shipping, price, stock, user_id, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
        [nombre, categoria, envio, precio, stock, url]
      )
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear elemento del inventario')
    }
  }

  async updateInventory(inventoryId: number, nombre: string, categoria: string, envio: string, precio: number, stock: number, url: string): Promise<any> {
    try {
      const result: QueryResult = await this.db(
        'UPDATE inventory SET name = $2, category = $3, shipping = $4, price = $5, stock = $6, url = $7 WHERE id = $1 RETURNING *;',
        [inventoryId, nombre, categoria, envio, precio, stock, url]
      )
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al actualizar elemento del inventario')
    }
  }

  async deleteInventory(inventoryId: number): Promise<void> {
    try {
      await this.db('DELETE FROM inventory WHERE id = $1;', [inventoryId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar elemento del inventario')
    }
  }

}

export default InventoryModel
