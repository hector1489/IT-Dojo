import express from 'express'
import userRoutes from './routes/userRoutes'
import ordersRoutes from './routes/ordersRoutes'
import inventoryRoutes from './routes/inventoryRoutes'
import favoriteRoutes from './routes/favoriteRoutes'
import pool from './database/db'
import UserModel from './models/userModel'
import InventoryModel from './models/inventoryModel'
import OrdersModel from './models/ordersModel'
import FavoriteModel from './models/favoriteModel'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())

// instancias de modelos
const userModel = new UserModel(pool)
const inventoryModel = new InventoryModel(pool)
const ordersModel = new OrdersModel(pool)
const favoriteModel = new FavoriteModel(pool)

// rutas
app.use('/users', userRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/orders', ordersRoutes)
app.use('/favorites', favoriteRoutes)




app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
