import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'node-backend-utils/enums';
import { ProdutoListagemFiltroDTO } from '../dtos/produto/ProdutoListagemFiltroDTO';
import { produtoService } from '../services/produtoService';
import { UUID } from 'crypto';

export class ProdutoController {
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filtro = ProdutoListagemFiltroDTO.create(req.query);

      const produtoListagem = await produtoService.listar(filtro);

      res.status(HttpStatus.OK).json(produtoListagem);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const produtoBuscaDTO = await produtoService.buscarPorId(Number(id));

      res.status(HttpStatus.OK).json(produtoBuscaDTO);
    } catch (err) {
      next(err);
    }
  }

  async foto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { uuid } = req.params;

      const foto = await produtoService.buscarFoto(uuid as UUID);

      res.status(HttpStatus.OK).send(foto);
    } catch (err) {
      next(err);
    }
  }
}

export const produtoController = new ProdutoController();