import express, { Router } from 'express'
import InventoryController from '../controllers/inventoryController'
import InventoryModel from '../models/inventoryModel'

const inventoryRoutes = (InventoryModel: InventoryModel): Router => {
  const inventoryController = new InventoryController(InventoryModel)
  const router = express.Router()

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

  // Ruta para agregar un nuevo elemento al inventario
  router.post('/', async (req, res) => {
    const { nombre, categoria, envio, precio, stock, userId } = req.body;

    try {
      const newInventoryItem = await inventoryController.createInventory(nombre, categoria, envio, precio, stock, userId);
      res.status(201).json(newInventoryItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar elemento al inventario' });
    }
  });

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

  return router
}

export default inventoryRoutes
