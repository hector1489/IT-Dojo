import request from 'supertest';
import express from 'express';
import favoriteRoutes from '../routes/favoriteRoutes';
import FavoriteModel from '../models/favoriteModel';

type FavoriteModelMock = {
    getFavorites: jest.Mock<Promise<any[]>>;
    getFavoriteById: jest.Mock<Promise<any>>;
    createFavorite: jest.Mock<Promise<any>>;
    deleteFavorite: jest.Mock<Promise<any>>;
};

jest.mock('../models/favoriteModel');


const app = express();

const FavoriteModelMock: FavoriteModelMock = {
    getFavorites: jest.fn(),
    getFavoriteById: jest.fn(),
    createFavorite: jest.fn(),
    deleteFavorite: jest.fn(),
};

app.use(express.json());

app.use('/favorite', favoriteRoutes(FavoriteModelMock as unknown as FavoriteModel));

describe('Pruebas de rutas de inventory', () => {

  it('solicitud GET favorite/:id', async () => {
    FavoriteModelMock.getFavoriteById.mockResolvedValueOnce({
      id: '1',
    });

    const response = await request(app).get('/favorite/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1'
    });
  });

  it('solicitud GET /favorite', async () => {
    FavoriteModelMock.getFavorites.mockResolvedValueOnce([

    ]);

    const response = await request(app)
      .get('/favorite');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([

    ]);
  });

  it('solicitud POST /favorite/', async () => {
    const FavoriteData = {
        favoriteId: 1,
        inventoryId: 1,
    };

    FavoriteModelMock.createFavorite.mockResolvedValueOnce({
        favoriteId: FavoriteData.favoriteId,
        inventoryId: FavoriteData.inventoryId,
    });

    const response = await request(app)
      .post('/favorite')
      .send(FavoriteData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        favoriteId: FavoriteData.favoriteId,
        inventoryId: FavoriteData.inventoryId,
    });
  });

  it('solicitud DELETE /favorite/:id', async () => {
    const favoriteId = '1';

    FavoriteModelMock.deleteFavorite.mockResolvedValueOnce({
      id: favoriteId
    });

    const response = await request(app).delete(`/favorite/${favoriteId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Favorito eliminado exitosamente' });
  });

});
