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

  async createFavorite(userId: string, inventoryId: number) {
    try {
      return await this.favoriteModel.createFavorite(userId, inventoryId)
    } catch (error) {
      throw new Error('Error al crear favorito desde el controlador')
    }
  }

  async deleteFavorite(favoriteId: string) {
    try {
      await this.favoriteModel.deleteFavorite(favoriteId)
    } catch (error) {
      throw new Error('Error al eliminar favorito desde el controlador')
    }
  }

}

export default FavoriteController
