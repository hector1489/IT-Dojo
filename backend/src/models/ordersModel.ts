import { QueryResult } from 'pg'

class OrdersModel {
  private db: (query: string, values: any[]) => Promise<QueryResult<any>>

  constructor(db: (query: string, values: any[]) => Promise<QueryResult<any>>) {
    this.db = db
  }

  async getOrders(): Promise<QueryResult<any>> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM orders;', [])
      return result
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener pedidos')
    }
  }

  async getOrderById(orderId: number): Promise<any> {
    try {
      const result: QueryResult = await this.db('SELECT * FROM orders WHERE id = $1;', [orderId])
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener pedido por ID')
    }
  }

  async createOrder(userId: string, estado: string, direccion_envio: string): Promise<any> {
    try {
      const result: QueryResult = await this.db(
        'INSERT INTO orders (user_id, status, shipping_address) VALUES ($1, $2, $3) RETURNING *;',
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
      const result: QueryResult = await this.db(
        'UPDATE orders SET status = $2, shipping_address = $3 WHERE id = $1 RETURNING *',
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
      await this.db('DELETE FROM orders WHERE id = $1', [orderId])
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar pedido')
    }
  }

}

export default OrdersModel

