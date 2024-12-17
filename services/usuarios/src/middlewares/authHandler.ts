import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'node-backend-utils/classes';
import { verifyJWT } from 'node-backend-utils/auth';
import { UsuarioLogadoDTO } from '../dtos/usuario/UsuarioLogadoDTO';
import { app } from '../app';

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization;

  try {
    const usuarioLogadoDTO = await verifyJWT<UsuarioLogadoDTO>(token, app.env.jwtSecret);

    req.user = usuarioLogadoDTO;

    next();
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
}