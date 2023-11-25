import OrdersModel from '../models/ordersModel'

class OrdersController {
  private ordersModel: OrdersModel

  constructor(ordersModel: OrdersModel) {
    this.ordersModel = ordersModel
  }

  async getOrders() {
    try {
      return await this.ordersModel.getOrders()
    } catch (error) {
      throw new Error('Error al obtener elementos del pedido desde el controlador')
    }
  }

  async getOrderById(orderId: number) {
    try {
      return await this.ordersModel.getOrderById(orderId)
    } catch (error) {
      throw new Error('Error al obtener pedido por ID desde el controlador')
    }
  }

  async createOrder(userId: string, estado: string, direccion_envio: string) {
    try {
      return await this.ordersModel.createOrder(userId, estado, direccion_envio)
    } catch (error) {
      throw new Error('Error al crear pedido desde el controlador')
    }
  }

  async updateOrder(orderId: number, estado: string, direccion_envio: string) {
    try {
      return await this.ordersModel.updateOrder(orderId, estado, direccion_envio)
    } catch (error) {
      throw new Error('Error al actualizar pedido desde el controlador')
    }
  }

  async deleteOrder(orderId: number) {
    try {
      await this.ordersModel.deleteOrder(orderId)
    } catch (error) {
      throw new Error('Error al eliminar pedido desde el controlador')
    }
  }

}

export default OrdersController