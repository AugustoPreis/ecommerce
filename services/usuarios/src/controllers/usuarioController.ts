import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'node-backend-utils/enums';
import { usuarioService } from '../services/usuarioService';
import { UsuarioCadastroDTO } from '../dtos/usuario/UsuarioCadastroDTO';
import { UsuarioLoginDTO } from '../dtos/usuario/UsuarioLoginDTO';
import { UsuarioAtualizacaoDTO } from '../dtos/usuario/UsuarioAtualizacaoDTO';

export class UsuarioController {

  async cadastrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarioCadastroDTO = new UsuarioCadastroDTO(req.body);

      const usuarioLoginResultadoDTO = await usuarioService.cadastrar(usuarioCadastroDTO);

      res.status(HttpStatus.CREATED).json(usuarioLoginResultadoDTO);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarioLoginDTO = new UsuarioLoginDTO(req.body);

      const usuarioLoginResultadoDTO = await usuarioService.login(usuarioLoginDTO);

      res.status(HttpStatus.OK).json(usuarioLoginResultadoDTO);
    } catch (err) {
      next(err);
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const usuarioBuscaDTO = await usuarioService.buscarPorId(Number(id), req.user);

      res.status(HttpStatus.OK).json(usuarioBuscaDTO);
    } catch (err) {
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarioAtualizacaoDTO = new UsuarioAtualizacaoDTO({
        ...req.body,
        id: Number(req.params.id),
      });

      const usuarioBuscaDTO = await usuarioService.atualizar(usuarioAtualizacaoDTO, req.user);

      res.status(HttpStatus.OK).json(usuarioBuscaDTO);
    } catch (err) {
      next(err);
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await usuarioService.deletar(Number(id), req.user);

      res.status(HttpStatus.NO_CONTENT).json();
    } catch (err) {
      next(err);
    }
  }
}

export const usuarioController = new UsuarioController();