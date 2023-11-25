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
class OrdersController {
    constructor(ordersModel) {
        this.ordersModel = ordersModel;
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordersModel.getOrders();
            }
            catch (error) {
                throw new Error('Error al obtener pedidos desde el controlador');
            }
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordersModel.getOrderById(orderId);
            }
            catch (error) {
                throw new Error('Error al obtener pedido por ID desde el controlador');
            }
        });
    }
    createOrder(userId, estado, direccion_envio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordersModel.createOrder(userId, estado, direccion_envio);
            }
            catch (error) {
                throw new Error('Error al crear pedido desde el controlador');
            }
        });
    }
    updateOrder(orderId, estado, direccion_envio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordersModel.updateOrder(orderId, estado, direccion_envio);
            }
            catch (error) {
                throw new Error('Error al actualizar pedido desde el controlador');
            }
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ordersModel.deleteOrder(orderId);
            }
            catch (error) {
                throw new Error('Error al eliminar pedido desde el controlador');
            }
        });
    }
}
exports.default = OrdersController;
