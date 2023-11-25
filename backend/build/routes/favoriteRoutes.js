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
const router = express_1.default.Router();
// Importar el controlador de favoritos
const favoriteController_1 = __importDefault(require("../controllers/favoriteController"));
// Ruta para obtener todos los favoritos
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield favoriteController_1.default.getFavorites();
        res.json(favorites);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
}));
// Ruta para obtener un favorito por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteId = req.params.id;
    try {
        const favorite = yield favoriteController_1.default.getFavoriteById(favoriteId);
        if (favorite) {
            res.json(favorite);
        }
        else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener favorito por ID' });
    }
}));
// Ruta para crear un nuevo favorito
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, inventoryId } = req.body;
    try {
        const newFavorite = yield favoriteController_1.default.createFavorite(userId, inventoryId);
        res.status(201).json(newFavorite);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear favorito' });
    }
}));
// Ruta para eliminar un favorito
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteId = req.params.id;
    try {
        yield favoriteController_1.default.deleteFavorite(favoriteId);
        res.json({ message: 'Favorito eliminado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar favorito' });
    }
}));
exports.default = router;
