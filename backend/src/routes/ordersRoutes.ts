import express from 'express'
import OrdersController from '../controllers/ordersController'
import OrdersModel from '../models/ordersModel'
import pool from '../database/db'

const router = express.Router()
const ordersModel = new OrdersModel(pool)
const ordersController = new OrdersController(ordersModel)


// Ruta para obtener todos los pedidos
router.get('/', async (_, res) => {
  try {
    const orders = await ordersController.getOrders()
    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener pedidos' })
  }
})

// Ruta para obtener un pedido por ID
router.get('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10)
  try {
    const order = await ordersController.getOrderById(orderId)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedido por ID' })
  }
})

// Ruta para crear un nuevo pedido
router.post('/', async (req, res) => {
  const { userId, estado, direccion_envio } = req.body
  try {
    const newOrder = await ordersController.createOrder(userId, estado, direccion_envio)
    res.status(201).json(newOrder)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear pedido' })
  }
})

// Ruta para actualizar un pedido
router.put('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10)
  const { estado, direccion_envio } = req.body
  try {
    const updatedOrder = await ordersController.updateOrder(orderId, estado, direccion_envio)
    if (updatedOrder) {
      res.json(updatedOrder)
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar pedido' })
  }
})

// Ruta para eliminar un pedido
router.delete('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10)
  try {
    await ordersController.deleteOrder(orderId)
    res.json({ message: 'Pedido eliminado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar pedido' })
  }
})

export default router
