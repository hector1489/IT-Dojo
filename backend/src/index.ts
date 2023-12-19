import express from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import ordersRoutes from './routes/ordersRoutes'
import inventoryRoutes from './routes/inventoryRoutes'
import favoriteRoutes from './routes/favoriteRoutes'
import db from './database/db'
import UserModel from './models/userModel'
import InventoryModel from './models/inventoryModel'
import OrdersModel from './models/ordersModel'
import FavoriteModel from './models/favoriteModel'

const app = express();
const PORT = process.env.PORT ?? 3000

app.use(express.json());
app.use(cors());

// instancias de modelos
const userModel = new UserModel(db)
const inventoryModel = new InventoryModel(db)
const ordersModel = new OrdersModel(db)
const favoriteModel = new FavoriteModel(db)

// rutas
app.use('/users', userRoutes(userModel))
app.use('/inventory', inventoryRoutes(inventoryModel))
app.use('/orders', ordersRoutes(ordersModel))
app.use('/favorites', favoriteRoutes(favoriteModel))

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
