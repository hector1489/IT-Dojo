import express, { Router } from 'express'
import FavoriteModel from '../models/favoriteModel'
import FavoriteController from '../controllers/favoriteController'

const favoriteRoutes = (FavoriteModel: FavoriteModel): Router => {
  const favoriteController = new FavoriteController(FavoriteModel)
  const router = express.Router()


  // Ruta para obtener todos los favoritos
  router.get('/', async (_, res) => {
    try {
      const favorites = await favoriteController.getFavorites()
      res.json(favorites)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al obtener favoritos' })
    }
  })

  // Ruta para obtener un favorito por ID
  router.get('/:id', async (req, res) => {
    const favoriteId = req.params.id
    try {
      const favorite = await favoriteController.getFavoriteById(favoriteId)
      if (favorite) {
        res.json(favorite)
      } else {
        res.status(404).json({ error: 'Favorito no encontrado' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al obtener favorito por ID' })
    }
  })

  // Ruta para crear un nuevo favorito
  router.post('/', async (req, res) => {
    const { user_id, inventory_id } = req.body
    try {
      const newFavorite = await favoriteController.createFavorite(user_id, inventory_id)
      res.status(201).json(newFavorite)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al crear favorito' })
    }
  })

  // Ruta para eliminar un favorito
  router.delete('/', async (req, res) => {
    const { user_id, inventory_id } = req.body
    console.log(req.body)
    try {
      const inventoryIdNumber = Number(inventory_id)

      if (isNaN(inventoryIdNumber)) {
        res.status(400).json({ error: 'El ID del inventario debe ser un número válido' })
        return
      }

      await favoriteController.deleteFavorite(user_id, inventoryIdNumber)
      res.json({ message: 'Favorito eliminado exitosamente' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al eliminar favorito' })
    }
  })

  return router
}

export default favoriteRoutes
