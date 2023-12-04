import { http, HttpResponse } from 'msw'

const login = http.post('/login', async ({ request }) => {
  const user = await request.json()

  if (!user.email || !user.pass) {
    return HttpResponse.json(
      { error: 'Debe ingresar todos los campos' },
      { status: 404 }
    )
  }

  if (user.email !== 'usuario1@example.com' || user.pass !== '123456') {
    return HttpResponse.json(
      { error: 'Usuario o contraseña incorrectos' },
      { status: 404 }
    )
  }

  return HttpResponse.json(
    { token: 'fakeToken', user: user.email },
    { status: 200 }
  )
})

const register = http.post('/register', async ({ request }) => {
  const user = await request.json()

  if (!user.email || !user.pass) {
    return HttpResponse.json(
      { error: 'Debe ingresar todos los campos' },
      { status: 404 }
    )
  }

  if (user.email === 'usuario1@example.com' && user.pass === '123456') {
    return HttpResponse.json(
      { error: 'Este usuario ya existe!' },
      { status: 404 }
    )
  }

  return HttpResponse.json(
    { token: 'fakeToken', user: user.email },
    { status: 200 }
  )
})

export default [
  login,
  register
]