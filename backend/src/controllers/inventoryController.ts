import InventoryModel from '../models/inventoryModel'

class InventoryController {
  private inventoryModel: InventoryModel

  constructor(inventoryModel: InventoryModel) {
    this.inventoryModel = inventoryModel
  }

  async getInventory() {
    try {
      return await this.inventoryModel.getInventory()
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener elementos del inventario desde el controlador')
    }
  }

  async getInventoryById(inventoryId: number) {
    try {
      return await this.inventoryModel.getInventoryById(inventoryId)
    } catch (error) {
      throw new Error('Error al obtener elemento del inventario por ID desde el controlador')
    }
  }

  async createInventory(nombre: string, categoria: string, envio: string, precio: number, stock: number, userId: string) {
    try {
      return await this.inventoryModel.createInventory(nombre, categoria, envio, precio, stock, userId)
    } catch (error) {
      throw new Error('Error al crear elemento del inventario desde el controlador')
    }
  }

  async updateInventory(inventoryId: number, nombre: string, categoria: string, envio: string, precio: number, stock: number) {
    try {
      return await this.inventoryModel.updateInventory(inventoryId, nombre, categoria, envio, precio, stock)
    } catch (error) {
      throw new Error('Error al actualizar elemento del inventario desde el controlador')
    }
  }

  async deleteInventory(inventoryId: number) {
    try {
      await this.inventoryModel.deleteInventory(inventoryId)
    } catch (error) {
      throw new Error('Error al eliminar elemento del inventario desde el controlador')
    }
  }

}

export default InventoryController
