import { Router } from 'express';
import { auth } from '../middlewares/authHandler';
import { usuarioController } from '../controllers/usuarioController';

export const usuarioRoutes = Router();

//Rotas sem autenticação
usuarioRoutes.post('/login', usuarioController.login);
usuarioRoutes.post('/usuarios', usuarioController.cadastrar);

//Rotas com autenticação
usuarioRoutes.get('/usuarios/:id', auth, usuarioController.buscar);
usuarioRoutes.put('/usuarios/:id', auth, usuarioController.atualizar);
usuarioRoutes.delete('/usuarios/:id', auth, usuarioController.deletar);