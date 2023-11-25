import express from 'express';
import usuariosController from '../controllers/usersController';

const router = express.Router();


router.get('/', usuariosController.obtenerUsuarios);


export default router;
