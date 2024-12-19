import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'node-backend-utils/enums';
import { carrinhoItemService } from '../services/carrinhoItemService';
import { CarrinhoItemSalvarDTO } from '../dtos/carrinhoItem/CarrinhoItemSalvarDTO';
import { CarrinhoItemAlterarQtdDTO } from '../dtos/carrinhoItem/CarrinhoItemAlterarQtdDTO';

export class CarrinhoItemController {
  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carrinhoItemSalvarDTO = CarrinhoItemSalvarDTO.create(req.body);

      const carrinhoItemSalvo = await carrinhoItemService.salvar(carrinhoItemSalvarDTO, req.user);

      res.status(HttpStatus.CREATED).json(carrinhoItemSalvo);
    } catch (err) {
      next(err);
    }
  }

  async alterarQtd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carrinhoItemAlterarQtdDTO = CarrinhoItemAlterarQtdDTO.create({ ...req.body, id: req.params.id });

      const carrinhoItemAlterado = await carrinhoItemService.alterarQtd(carrinhoItemAlterarQtdDTO, req.user);

      res.status(HttpStatus.OK).json(carrinhoItemAlterado);
    } catch (err) {
      next(err);
    }
  }

  async remover(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await carrinhoItemService.remover(Number(id), req.user);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export const carrinhoItemController = new CarrinhoItemController();