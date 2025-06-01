import { Router } from 'express';
import { RequestController } from '../controllers/RequestController';

const router = Router();
const requestController = new RequestController();

// Rotas de solicitações
router.get('/solicitacoes/:login', requestController.getByClient);
router.put('/solicitacoes/:login', requestController.update);

export default router; 