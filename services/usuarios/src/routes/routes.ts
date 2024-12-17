import { Router } from 'express';
import { usuarioRoutes } from './usuarioRoutes';

export const routes = Router();

routes.use(usuarioRoutes);