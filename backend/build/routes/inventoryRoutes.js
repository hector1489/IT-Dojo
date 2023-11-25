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
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
// Ruta para obtener todos los elementos del inventario
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventory = yield inventoryController_1.default.getInventory();
        res.json(inventory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener elementos del inventario' });
    }
}));
// Ruta para obtener un elemento del inventario por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = req.params.id;
    try {
        const inventoryItem = yield inventoryController_1.default.getInventoryById(inventoryId);
        if (inventoryItem) {
            res.json(inventoryItem);
        }
        else {
            res.status(404).json({ error: 'Elemento del inventario no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener elemento del inventario por ID' });
    }
}));
// Ruta para crear un nuevo elemento del inventario
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, categoria, envio, precio, stock, userId } = req.body;
    try {
        const newInventoryItem = yield inventoryController_1.default.createInventory(nombre, categoria, envio, precio, stock, userId);
        res.status(201).json(newInventoryItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear elemento del inventario' });
    }
}));
// Ruta para actualizar un elemento del inventario
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = req.params.id;
    const { nombre, categoria, envio, precio, stock } = req.body;
    try {
        const updatedInventoryItem = yield inventoryController_1.default.updateInventory(inventoryId, nombre, categoria, envio, precio, stock);
        if (updatedInventoryItem) {
            res.json(updatedInventoryItem);
        }
        else {
            res.status(404).json({ error: 'Elemento del inventario no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar elemento del inventario' });
    }
}));
// Ruta para eliminar un elemento del inventario
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = req.params.id;
    try {
        yield inventoryController_1.default.deleteInventory(inventoryId);
        res.json({ message: 'Elemento del inventario eliminado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar elemento del inventario' });
    }
}));
exports.default = router;
