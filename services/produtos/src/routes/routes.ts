import { Router } from 'express';
import { produtoRoutes } from './produtoRoutes';

export const routes = Router();

routes.use(produtoRoutes);