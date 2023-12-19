import FavoriteModel from '../models/favoriteModel'

class FavoriteController {
  private favoriteModel: FavoriteModel

  constructor(favoriteModel: FavoriteModel) {
    this.favoriteModel = favoriteModel
  }

  async getFavorites() {
    try {
      return await this.favoriteModel.getFavorites()
    } catch (error) {
      throw new Error('Error al obtener favoritos desde el controlador')
    }
  }

  async getFavoriteById(favoriteId: string) {
    try {
      return await this.favoriteModel.getFavoriteById(favoriteId)
    } catch (error) {
      throw new Error('Error al obtener favorito por ID desde el controlador')
    }
  }

  async createFavorite(user_id: string, inventory_id: number) {
    try {
      return await this.favoriteModel.createFavorite(user_id, inventory_id)
    } catch (error) {
      throw new Error('Error al crear favorito desde el controlador')
    }
  }

  async deleteFavorite(userId: string, inventoryId: number) {
    try {
      await this.favoriteModel.deleteFavorite(userId, inventoryId)
    } catch (error) {
      throw new Error('Error al eliminar favorito desde el controlador')
    }
  }

}

export default FavoriteController
