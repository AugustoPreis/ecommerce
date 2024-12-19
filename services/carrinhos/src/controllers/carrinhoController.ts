import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'node-backend-utils/enums';
import { carrinhoService } from '../services/carrinhoService';

export class CarrinhoController {

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carrinho = await carrinhoService.buscar(req.user);

      res.status(HttpStatus.OK).json(carrinho);
    } catch (err) {
      next(err);
    }
  }
}

export const carrinhoController = new CarrinhoController();