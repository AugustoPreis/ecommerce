import { Router } from 'express';
import { auth } from '../middlewares/authHandler';
import { carrinhoController } from '../controllers/carrinhoController';
import { carrinhoItemController } from '../controllers/carrinhoItemController';

export const carrinhoRoutes = Router();

carrinhoRoutes.get('/carrinhos', auth, carrinhoController.buscar);
carrinhoRoutes.post('/carrinhos/itens', auth, carrinhoItemController.salvar);
carrinhoRoutes.put('/carrinhos/itens/:id/quantidade', auth, carrinhoItemController.alterarQtd);
carrinhoRoutes.delete('/carrinhos/itens/:id', auth, carrinhoItemController.remover);