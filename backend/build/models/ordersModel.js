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
Object.defineProperty(exports, "__esModule", { value: true });
class OrdersModel {
    constructor(pool) {
        this.pool = pool;
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM pedidos');
                return result.rows;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener pedidos');
            }
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM pedidos WHERE id = $1', [orderId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener pedido por ID');
            }
        });
    }
    createOrder(userId, estado, direccion_envio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('INSERT INTO pedidos (id_usuario, estado, direccion_envio) VALUES ($1, $2, $3) RETURNING *', [userId, estado, direccion_envio]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al crear pedido');
            }
        });
    }
    updateOrder(orderId, estado, direccion_envio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('UPDATE pedidos SET estado = $2, direccion_envio = $3 WHERE id = $1 RETURNING *', [orderId, estado, direccion_envio]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al actualizar pedido');
            }
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query('DELETE FROM pedidos WHERE id = $1', [orderId]);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al eliminar pedido');
            }
        });
    }
}
exports.default = OrdersModel;
