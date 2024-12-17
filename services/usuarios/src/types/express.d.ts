import { UsuarioLogadoDTO } from '../dtos/usuario/UsuarioLogadoDTO';

declare global {
  namespace Express {
    export interface Request {
      user?: UsuarioLogadoDTO;
    }
  }
}