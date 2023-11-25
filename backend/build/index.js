"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const db_1 = __importDefault(require("./database/db"));
const userModel_1 = __importDefault(require("./models/userModel"));
const inventoryModel_1 = __importDefault(require("./models/inventoryModel"));
const ordersModel_1 = __importDefault(require("./models/ordersModel"));
const favoriteModel_1 = __importDefault(require("./models/favoriteModel"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Crear instancias de modelos
const userModel = new userModel_1.default(db_1.default);
const inventoryModel = new inventoryModel_1.default(db_1.default);
const ordersModel = new ordersModel_1.default(db_1.default);
const favoriteModel = new favoriteModel_1.default(db_1.default);
// Configurar rutas
app.use('/users', (0, userRoutes_1.default)(userModel));
app.use('/inventory', (0, inventoryRoutes_1.default)(inventoryModel));
app.use('/orders', (0, ordersRoutes_1.default)(ordersModel));
app.use('/favorites', (0, favoriteRoutes_1.default)(favoriteModel));
app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no se encuentra en este sistema solar.' }));
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
