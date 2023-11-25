import express from 'express'
import pool from '../database/db'
import InventoryController from '../controllers/inventoryController'
import InventoryModel from '../models/inventoryModel'

const router = express.Router()
const inventoryModel = new InventoryModel(pool)
const inventoryController = new InventoryController(inventoryModel)

// Ruta para obtener todos los elementos del inventario
router.get('/', async (_, res) => {
  try {
    const inventory = await inventoryController.getInventory()
    res.json(inventory)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener elementos del inventario' })
  }
})

// Ruta para obtener un elemento del inventario por ID
router.get('/:id', async (req, res) => {
  const inventoryId = parseInt(req.params.id, 10)
  try {
    const inventoryItem = await inventoryController.getInventoryById(inventoryId)
    if (inventoryItem) {
      res.json(inventoryItem)
    } else {
      res.status(404).json({ error: 'Elemento del inventario no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener elemento del inventario por ID' })
  }
})


// Ruta para obtener un elemento del inventario por ID
router.get('/:id', async (req, res) => {
  const inventoryId = parseInt(req.params.id, 10)
  try {
    const inventoryItem = await inventoryController.getInventoryById(inventoryId)
    if (inventoryItem) {
      res.json(inventoryItem)
    } else {
      res.status(404).json({ error: 'Elemento del inventario no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener elemento del inventario por ID' })
  }
})

// Ruta para actualizar un elemento del inventario
router.put('/:id', async (req, res) => {
  const inventoryId = parseInt(req.params.id, 10)
  const { nombre, categoria, envio, precio, stock } = req.body
  try {
    const updatedInventoryItem = await inventoryController.updateInventory(inventoryId, nombre, categoria, envio, precio, stock)
    if (updatedInventoryItem) {
      res.json(updatedInventoryItem)
    } else {
      res.status(404).json({ error: 'Elemento del inventario no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar elemento del inventario' })
  }
})

// Ruta para eliminar un elemento del inventario
router.delete('/:id', async (req, res) => {
  const inventoryId = parseInt(req.params.id, 10)
  try {
    await inventoryController.deleteInventory(inventoryId)
    res.json({ message: 'Elemento del inventario eliminado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar elemento del inventario' })
  }
})

export default router
