import { Router } from 'express';
import { carrinhoRoutes } from './carrinhoRoutes';

export const routes = Router();

routes.use(carrinhoRoutes);