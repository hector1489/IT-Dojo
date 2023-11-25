"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const userRoutes = (userModel) => {
    const usersController = new usersController_1.default(userModel);
    const router = express_1.default.Router();
    // Ruta para obtener todos los usuarios
    router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield usersController.getUsers();
            res.json(users);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }));
    // Ruta para obtener un usuario por ID
    router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const user = yield usersController.getUserById(userId);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuario por ID' });
        }
    }));
    // Ruta para crear un nuevo usuario
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, pass, es_admin } = req.body;
        try {
            const newUser = yield usersController.createUser(email, pass, es_admin);
            res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }));
    // Ruta para actualizar un usuario
    router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const { email, pass, es_admin } = req.body;
        try {
            const updatedUser = yield usersController.updateUser(userId, email, pass, es_admin);
            if (updatedUser) {
                res.json(updatedUser);
            }
            else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    }));
    // Ruta para eliminar un usuario
    router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            yield usersController.deleteUser(userId);
            res.json({ message: 'Usuario eliminado exitosamente' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }));
    return router;
};
exports.default = userRoutes;
