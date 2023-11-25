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
class UsersController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userModel.getUsers();
            }
            catch (error) {
                throw new Error('Error al obtener usuarios desde el controlador');
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userModel.getUserById(userId);
            }
            catch (error) {
                throw new Error('Error al obtener usuario por ID desde el controlador');
            }
        });
    }
    createUser(email, pass, es_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userModel.createUser(email, pass, es_admin);
            }
            catch (error) {
                throw new Error('Error al crear usuario desde el controlador');
            }
        });
    }
    updateUser(userId, email, pass, es_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userModel.updateUser(userId, email, pass, es_admin);
            }
            catch (error) {
                throw new Error('Error al actualizar usuario desde el controlador');
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userModel.deleteUser(userId);
            }
            catch (error) {
                throw new Error('Error al eliminar usuario desde el controlador');
            }
        });
    }
}
exports.default = UsersController;
