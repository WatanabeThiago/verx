import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';

function jwtVerification(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const { secret } = authConfig.jwt;
  try {
    const decoded = jwt.verify(
      token,
      secret
    );

    if (decoded) {
      req.user = decoded as { id: string, nome: string };
    }

    next();
  } catch (err) {
    console.error(err)
    return res.status(403).json({ mensagem: 'Falha na autenticação do token' });
  }
}

export default jwtVerification;
