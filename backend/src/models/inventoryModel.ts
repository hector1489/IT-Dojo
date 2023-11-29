import { Pool, QueryResult } from 'pg'

class InventoryModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getInventory(): Promise<any[]> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM inventory;')
      return result.rows
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener inventario')
    }
  }

  async getInventoryById(inventoryId: number): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM inventory WHERE id = $1;', [inventoryId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener elemento del inventario por ID')
    }
  }

  async createInventory(nombre: string, categoria: string, envio: string, precio: number, stock: number, userId: string): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'INSERT INTO inventory (name, category, shipping, price, stock, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
        [nombre, categoria, envio, precio, stock, userId]
      );
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear elemento del inventario')
    }
  }

  async updateInventory(inventoryId: number, nombre: string, categoria: string, envio: string, precio: number, stock: number): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'UPDATE inventory SET name = $2, category = $3, shipping = $4, price = $5, stock = $6 WHERE id = $1 RETURNING *;',
        [inventoryId, nombre, categoria, envio, precio, stock]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar elemento del inventario')
    }
  }

  async deleteInventory(inventoryId: number): Promise<void> {
    try {
      await this.pool.query('DELETE FROM inventory WHERE id = $1;', [inventoryId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar elemento del inventario')
    }
  }

}

export default InventoryModel
