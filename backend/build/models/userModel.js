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
class UserModel {
    constructor(pool) {
        this.pool = pool;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM usuarios');
                return result.rows;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener usuarios');
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener usuario por ID');
            }
        });
    }
    createUser(email, pass, es_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('INSERT INTO usuarios (email, pass, es_admin) VALUES ($1, $2, $3) RETURNING *', [email, pass, es_admin]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al crear usuario');
            }
        });
    }
    updateUser(userId, email, pass, es_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query('UPDATE usuarios SET email = $2, pass = $3, es_admin = $4 WHERE id = $1 RETURNING *', [userId, email, pass, es_admin]);
                return result.rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al actualizar usuario');
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query('DELETE FROM usuarios WHERE id = $1', [userId]);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al eliminar usuario');
            }
        });
    }
}
exports.default = UserModel;
