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
// Importar el controlador de pedidos
const ordersController_1 = __importDefault(require("../controllers/ordersController"));
// Ruta para obtener todos los pedidos
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield ordersController_1.default.getOrders();
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener pedidos' });
    }
}));
// Ruta para obtener un pedido por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        const order = yield ordersController_1.default.getOrderById(orderId);
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener pedido por ID' });
    }
}));
// Ruta para crear un nuevo pedido
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, estado, direccion_envio } = req.body;
    try {
        const newOrder = yield ordersController_1.default.createOrder(userId, estado, direccion_envio);
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear pedido' });
    }
}));
// Ruta para actualizar un pedido
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const { estado, direccion_envio } = req.body;
    try {
        const updatedOrder = yield ordersController_1.default.updateOrder(orderId, estado, direccion_envio);
        if (updatedOrder) {
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar pedido' });
    }
}));
// Ruta para eliminar un pedido
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        yield ordersController_1.default.deleteOrder(orderId);
        res.json({ message: 'Pedido eliminado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar pedido' });
    }
}));
exports.default = router;
