import { Router } from 'express';
import { produtoController } from '../controllers/produtoController';

export const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.listar);
produtoRoutes.get('/produtos/:id', produtoController.buscarPorId);
produtoRoutes.get('/produtos/fotos/:uuid', produtoController.foto);