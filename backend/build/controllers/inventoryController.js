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
class InventoryController {
    constructor(inventoryModel) {
        this.inventoryModel = inventoryModel;
    }
    getInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inventoryModel.getInventory();
            }
            catch (error) {
                throw new Error('Error al obtener elementos del inventario desde el controlador');
            }
        });
    }
    getInventoryById(inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inventoryModel.getInventoryById(inventoryId);
            }
            catch (error) {
                throw new Error('Error al obtener elemento del inventario por ID desde el controlador');
            }
        });
    }
    createInventory(nombre, categoria, envio, precio, stock, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inventoryModel.createInventory(nombre, categoria, envio, precio, stock, userId);
            }
            catch (error) {
                throw new Error('Error al crear elemento del inventario desde el controlador');
            }
        });
    }
    updateInventory(inventoryId, nombre, categoria, envio, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inventoryModel.updateInventory(inventoryId, nombre, categoria, envio, precio, stock);
            }
            catch (error) {
                throw new Error('Error al actualizar elemento del inventario desde el controlador');
            }
        });
    }
    deleteInventory(inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.inventoryModel.deleteInventory(inventoryId);
            }
            catch (error) {
                throw new Error('Error al eliminar elemento del inventario desde el controlador');
            }
        });
    }
}
exports.default = InventoryController;
