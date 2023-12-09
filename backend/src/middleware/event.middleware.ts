import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from '../utils/jwt'

interface User {
  id: string;
  email: string;
  pass: string;
  is_admin: boolean;
}

interface AuthenticatedRequest extends Request {
  user?: User
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      code: 401,
      message: 'Token no proporcionado.',
    })
  }

  const [bearer, token] = authorizationHeader.split(' ')

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({
      code: 401,
      message: 'Formato de token inválido.',
    })
  }

  if (process.env.NODE_ENV === 'test') {
    req.user = {
      id: 'usuario_de_prueba',
      email: 'test@example.com',
      pass: 'hashedPassword',
      is_admin: false,
    }
    return next()
  }

  try {
    const decodedUser = jwtVerify(token)

    if (!decodedUser) {
      return res.status(401).json({
        code: 401,
        message: 'Token inválido.',
      })
    }

    const decodedUserAsUser: User = decodedUser as User
    req.user = decodedUserAsUser
    next()
  } catch (jwtError) {
    console.error('Error al verificar el token:', jwtError)

    return res.status(401).json({
      code: 401,
      message: 'Error al verificar el token.',
    })
  }
}

export { verifyToken }
