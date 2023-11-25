import express from 'express'
import UserModel from '../models/userModel'
import UsersController from '../controllers/usersController'

const userRoutes = (userModel: UserModel) => {
  const usersController = new UsersController(userModel)
  const router = express.Router()

  // Ruta para obtener todos los usuarios
  router.get('/', async (_, res) => {
    try {
      const users = await usersController.getUsers()
      res.json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al obtener usuarios' })
    }
  })

  // Ruta para obtener un usuario por ID
  router.get('/:id', async (req, res) => {
    const userId = req.params.id
    try {
      const user = await usersController.getUserById(userId)
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al obtener usuario por ID' })
    }
  })

  // Ruta para crear un nuevo usuario
  router.post('/', async (req, res) => {
    const { email, pass, es_admin } = req.body
    try {
      const newUser = await usersController.createUser(email, pass, es_admin)
      res.status(201).json(newUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al crear usuario' })
    }
  })

  // Ruta para actualizar un usuario
  router.put('/:id', async (req, res) => {
    const userId = req.params.id
    const { email, pass, es_admin } = req.body
    try {
      const updatedUser = await usersController.updateUser(userId, email, pass, es_admin)
      if (updatedUser) {
        res.json(updatedUser)
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al actualizar usuario' })
    }
  })

  // Ruta para eliminar un usuario
  router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    try {
      await usersController.deleteUser(userId)
      res.json({ message: 'Usuario eliminado exitosamente' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al eliminar usuario' })
    }
  })

  return router
}

export default userRoutes
