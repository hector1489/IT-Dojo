import UserModel from '../models/userModel'

describe('Pruebas del modelo de usuarios', () => {
  let userModel: UserModel

  beforeAll(() => {
    userModel = new UserModel({} as any)
  })

  it('debería obtener todos los usuarios', async () => {
    const mockUsers = [
      { id: '4', email: 'user4@example.com', pass: 'hashed4', is_admin: false },
      { id: '5', email: 'user5@example.com', pass: 'hashed5', is_admin: true },
    ]
    jest.spyOn(userModel, 'getUsers').mockResolvedValueOnce(mockUsers)

    const users = await userModel.getUsers()

    expect(users).toEqual(mockUsers)
  })

  it('debería obtener un usuario por ID', async () => {
    const mockUser = { id: '1', email: 'user1@example.com', pass: 'hashed1', is_admin: false }
    jest.spyOn(userModel, 'getUserById').mockResolvedValueOnce(mockUser)

    const userId = '1'
    const user = await userModel.getUserById(userId)

    expect(user).toEqual(mockUser)
  })

})
