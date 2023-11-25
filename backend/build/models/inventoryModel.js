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
class InventoryModel {
    constructor(pool) {
        this.pool = pool;
    }
    getInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM inventario');
                return result.rows;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener inventario');
            }
        });
    }
    getInventoryById(inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM inventario WHERE id = $1', [inventoryId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener elemento del inventario por ID');
            }
        });
    }
    createInventory(nombre, categoria, envio, precio, stock, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('INSERT INTO inventario (nombre, categoria, envio, precio, stock, id_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, categoria, envio, precio, stock, userId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al crear elemento del inventario');
            }
        });
    }
    updateInventory(inventoryId, nombre, categoria, envio, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('UPDATE inventario SET nombre = $2, categoria = $3, envio = $4, precio = $5, stock = $6 WHERE id = $1 RETURNING *', [inventoryId, nombre, categoria, envio, precio, stock]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al actualizar elemento del inventario');
            }
        });
    }
    deleteInventory(inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query('DELETE FROM inventario WHERE id = $1', [inventoryId]);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al eliminar elemento del inventario');
            }
        });
    }
}
exports.default = InventoryModel;
