import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import UserModel from '../models/userModel';
import { hashPassword } from '../utils/bcrypt';

type UserModelMock = {
  getUsers: jest.Mock<Promise<any[]>>;
  getUserById: jest.Mock<Promise<any>>;
  createUser: jest.Mock<Promise<any>>;
  getUserByEmail: jest.Mock<Promise<any>>;
  updateUser: jest.Mock<Promise<any>>;
  deleteUser: jest.Mock<Promise<any>>;
};

jest.mock('../models/userModel');
jest.mock('../utils/jwt', () => ({
  jwtVerify: jest.fn(() => ({ id: '1', email: 'test@example.com', pass: 'hashedPassword', is_admin: false })),
}));
jest.mock('../utils/jwt', () => ({
  jwtSign: jest.fn(() => 'mockedToken'),
}));


const app = express();

const userModelMock: UserModelMock = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

app.use(express.json());

app.use('/users', userRoutes(userModelMock as unknown as UserModel));

describe('Pruebas de rutas de usuarios', () => {

  it('solicitud GET /users/:id', async () => {
    userModelMock.getUserById.mockResolvedValueOnce({
      id: '4',
      email: 'usuario4@example.com',
      pass: 'hashedPassword',
      is_admin: false,
    });

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '4',
      email: 'usuario4@example.com',
      pass: 'hashedPassword',
      is_admin: false,
    });
  });

  it('solicitud GET /users', async () => {
    userModelMock.getUsers.mockResolvedValueOnce([
      {
        id: '4',
        email: 'usuario4@example.com',
        pass: 'hashedPassword',
        is_admin: false,
      },
      {
        id: '5',
        email: 'usuario5@example.com',
        pass: 'hashedPassword2',
        is_admin: true,
      },
    ]);

    const token = 'token_de_prueba';
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '4',
        email: 'usuario4@example.com',
        pass: 'hashedPassword',
        is_admin: false,
      },
      {
        id: '5',
        email: 'usuario5@example.com',
        pass: 'hashedPassword2',
        is_admin: true,
      },
    ]);
  });

  it('solicitud POST /users/signup', async () => {
    const userData = {
      email: 'newuser@example.com',
      pass: '123456',
      is_admin: false,
    };

    const hashedPassword = await hashPassword(userData.pass);

    userModelMock.createUser.mockResolvedValueOnce({
      id: '5',
      email: userData.email,
      pass: hashedPassword,
      is_admin: userData.is_admin,
    });

    const response = await request(app)
      .post('/users/signup')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: '5',
      email: userData.email,
      pass: hashedPassword,
      is_admin: userData.is_admin,
    });
  });

  it('solicitud POST /users/login', async () => {
    const loginData = {
      email: 'usuario1@example.com',
      pass: '123456',
    };

    userModelMock.getUserByEmail.mockResolvedValueOnce({
      email: loginData.email,
      pass: await hashPassword(loginData.pass),
    });

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mockedToken');
    expect(response.body).toHaveProperty('user');
  });

  it('solicitud PUT /users/:id', async () => {
    const userId = '1';
    const updatedUserData = {
      email: 'updateduser@example.com',
      pass: 'newpassword123',
      is_admin: true,
    };

    userModelMock.updateUser.mockResolvedValueOnce({
      id: userId,
      email: updatedUserData.email,
      pass: 'hashedNewPassword',
      is_admin: updatedUserData.is_admin,
    });

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: userId,
      email: updatedUserData.email,
      pass: 'hashedNewPassword',
      is_admin: updatedUserData.is_admin,
    });
  });

  it('solicitud DELETE /users/:id', async () => {

    userModelMock.deleteUser.mockResolvedValueOnce({
      id: '5'
    });

    const response = await request(app).delete('/users/5');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Usuario eliminado exitosamente' });
  });

});
