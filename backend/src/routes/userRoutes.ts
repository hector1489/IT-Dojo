import express, { Router } from 'express';
import UserModel from '../models/userModel';
import UsersController from '../controllers/usersController';
import { hashPassword } from '../utils/bcrypt';

const userRoutes = (userModel: UserModel): Router => {
  const usersController = new UsersController(userModel);
  const router = express.Router();

  router.get('/', async (_, res) => {
    try {
      const users = await usersController.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });

  router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await usersController.getUserById(userId);
      res.json(user || { error: 'Usuario no encontrado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
  });

  router.post('/signup', async (req, res) => {
    const { email, pass, is_admin } = req.body;
    try {
      const hashedPassword = await hashPassword(pass);
      const newUser = await usersController.createUser(email, hashedPassword, is_admin);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, pass } = req.body
    try {
      const { token, user } = await usersController.login(email, pass)
      res.json({ token, user })
    } catch (error) {
      console.error(error)
      res.status(401).json({ error: 'Credenciales inválidas' })
    }
  })

  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { email, pass, is_admin } = req.body;
    try {
      const updatedUser = await usersController.updateUser(userId, email, pass, is_admin);
      res.json(updatedUser || { error: 'Usuario no encontrado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      await usersController.deleteUser(userId);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  });

  return router;
};

export default userRoutes;
