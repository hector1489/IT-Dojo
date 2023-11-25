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
class FavoriteController {
    constructor(favoriteModel) {
        this.favoriteModel = favoriteModel;
    }
    getFavorites() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.favoriteModel.getFavorites();
            }
            catch (error) {
                throw new Error('Error al obtener favoritos desde el controlador');
            }
        });
    }
    getFavoriteById(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.favoriteModel.getFavoriteById(favoriteId);
            }
            catch (error) {
                throw new Error('Error al obtener favorito por ID desde el controlador');
            }
        });
    }
    createFavorite(userId, inventoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.favoriteModel.createFavorite(userId, inventoryId);
            }
            catch (error) {
                throw new Error('Error al crear favorito desde el controlador');
            }
        });
    }
    deleteFavorite(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.favoriteModel.deleteFavorite(favoriteId);
            }
            catch (error) {
                throw new Error('Error al eliminar favorito desde el controlador');
            }
        });
    }
}
exports.default = FavoriteController;
