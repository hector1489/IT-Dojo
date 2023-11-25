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
class FavoriteModel {
    constructor(pool) {
        this.pool = pool;
    }
    getFavorites() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM favoritos');
                return result.rows;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener favoritos');
            }
        });
    }
    getFavoriteById(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM favoritos WHERE id = $1', [favoriteId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener favorito por ID');
            }
        });
    }
    createFavorite(userId, inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('INSERT INTO favoritos (id_usuario, id_inventario) VALUES ($1, $2) RETURNING *', [userId, inventoryId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al crear favorito');
            }
        });
    }
    deleteFavorite(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query('DELETE FROM favoritos WHERE id = $1', [favoriteId]);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al eliminar favorito');
            }
        });
    }
}
exports.default = FavoriteModel;
