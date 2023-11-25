import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// Configurar rutas
app.use('/users', userRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/orders', ordersRoutes)
app.use('/favorites', favoriteRoutes)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
