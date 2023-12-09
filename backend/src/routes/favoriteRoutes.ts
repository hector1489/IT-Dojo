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
  const { userId, inventoryId } = req.body
  try {
    const newFavorite = await favoriteController.createFavorite(userId, inventoryId)
    res.status(201).json(newFavorite)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear favorito' })
  }
})

// Ruta para eliminar un favorito
router.delete('/:id', async (req, res) => {
  const favoriteId = req.params.id
  try {
    await favoriteController.deleteFavorite(favoriteId);
    res.json({ message: 'Favorito eliminado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar favorito' })
  }
})

return router
}

export default favoriteRoutes
