import { Pool, QueryResult } from 'pg'

class OrdersModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getOrders(): Promise<any[]> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM pedidos')
      return result.rows
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener pedidos')
    }
  }

  async getOrderById(orderId: number): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM pedidos WHERE id = $1', [orderId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener pedido por ID')
    }
  }

  async createOrder(userId: string, estado: string, direccion_envio: string): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'INSERT INTO pedidos (id_usuario, estado, direccion_envio) VALUES ($1, $2, $3) RETURNING *',
        [userId, estado, direccion_envio]
      );
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al crear pedido')
    }
  }

  async updateOrder(orderId: number, estado: string, direccion_envio: string): Promise<any> {
    try {
      const result: QueryResult = await this.pool.query(
        'UPDATE pedidos SET estado = $2, direccion_envio = $3 WHERE id = $1 RETURNING *',
        [orderId, estado, direccion_envio]
      );
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al actualizar pedido')
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    try {
      await this.pool.query('DELETE FROM pedidos WHERE id = $1', [orderId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar pedido')
    }
  }

}

export default OrdersModel

