import request from 'supertest'
import express from 'express'
import userRoutes from '../routes/userRoutes'
import UserModel from '../models/userModel'

type UserModelMock = {
  getUsers: jest.Mock<Promise<any[]>>
  getUserById: jest.Mock<Promise<any>>
}

jest.mock('../models/userModel')
jest.mock('../utils/jwt', () => ({
  jwtVerify: jest.fn(() => ({ id: '1', email: 'test@example.com', pass: 'hashedPassword', is_admin: false })),
}))

const app = express();

const userModelMock: UserModelMock = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
}

app.use(express.json())
app.use('/users', userRoutes(userModelMock as unknown as UserModel))

describe('Pruebas de rutas de usuarios', () => {
  it('debería devolver un usuario al hacer una solicitud GET a /users/:id', async () => {
    userModelMock.getUserById.mockResolvedValueOnce({
      id: '4',
      email: 'usuario4@example.com',
      pass: 'hashedPassword',
      is_admin: false,
    })

    const response = await request(app).get('/users/1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: '4',
      email: 'usuario4@example.com',
      pass: 'hashedPassword',
      is_admin: false,
    })
  })

  it('debería devolver todos los usuarios al hacer una solicitud GET a /users', async () => {
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
    ])

    const token = 'token_de_prueba'
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
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
    ])
  })
})
