import request from 'supertest';
import express from 'express';
import inventoryRoutes from '../routes/inventoryRoutes';
import InventoryModel from '../models/inventoryModel';

type InventoryModelMock = {
  getInventory: jest.Mock<Promise<any[]>>;
  getInventoryById: jest.Mock<Promise<any>>;
  createInventory: jest.Mock<Promise<any>>;
  updateInventory: jest.Mock<Promise<any>>;
  deleteInventory: jest.Mock<Promise<any>>;
};

jest.mock('../models/inventoryModel');


const app = express();

const InventoryModelMock: InventoryModelMock = {
  getInventory: jest.fn(),
  getInventoryById: jest.fn(),
  createInventory: jest.fn(),
  updateInventory: jest.fn(),
  deleteInventory: jest.fn(),
};

app.use(express.json());

app.use('/inventory', inventoryRoutes(InventoryModelMock as unknown as InventoryModel));

describe('Pruebas de rutas de inventory', () => {

  it('solicitud GET /inventory/:id', async () => {
    InventoryModelMock.getInventoryById.mockResolvedValueOnce({
      id: '1',
    });

    const response = await request(app).get('/inventory/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1'
    });
  });

  it('solicitud GET /inventory', async () => {
    InventoryModelMock.getInventory.mockResolvedValueOnce([

    ]);

    const response = await request(app)
      .get('/inventory');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([

    ]);
  });

  it('solicitud POST /inventory/', async () => {
    const inventoryData = {
      nombre: 'Producto Ejemplo',
      categoria: 'Electrónicos',
      envio: 'Express',
      precio: 49.99,
      stock: 10,
      userId: '1',
    };


    InventoryModelMock.createInventory.mockResolvedValueOnce({
      id: '5',
      nombre: inventoryData.nombre,
      categoria: inventoryData.categoria,
      envio: inventoryData.envio,
      precio: inventoryData.precio,
      stock: inventoryData.stock,
      userId: inventoryData.userId,
    });

    const response = await request(app)
      .post('/inventory')
      .send(inventoryData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: '5',
      nombre: inventoryData.nombre,
      categoria: inventoryData.categoria,
      envio: inventoryData.envio,
      precio: inventoryData.precio,
      stock: inventoryData.stock,
      userId: inventoryData.userId,
    });
  });


  it('solicitud PUT /inventory/:id', async () => {
    const inventoryId = '1';
    const updatedInventoryData = {
      nombre: 'Producto Actualizado',
      categoria: 'Ropa',
      envio: 'Estándar',
      precio: 59.99,
      stock: 20,
    };

    InventoryModelMock.updateInventory.mockResolvedValueOnce({
      id: inventoryId,
      ...updatedInventoryData,
    })

    const response = await request(app)
      .put(`/inventory/${inventoryId}`)
      .send(updatedInventoryData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: inventoryId,
      ...updatedInventoryData,
    });
  });

  it('solicitud DELETE /inventory/:id', async () => {
    const inventoryId = '5';

    InventoryModelMock.deleteInventory.mockResolvedValueOnce({
      id: inventoryId
    });

    const response = await request(app).delete(`/inventory/${inventoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Elemento del inventario eliminado exitosamente' });
  });

});
