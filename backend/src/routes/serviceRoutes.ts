import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController';

const router = Router();
const serviceController = new ServiceController();

// Rotas de serviços
router.post('/servicos', serviceController.create);
router.get('/servicos', serviceController.getAll);
router.get('/servicos/:id', serviceController.getById);
router.put('/servicos/:id', serviceController.update);
router.delete('/servicos/:id', serviceController.delete);

export default router; 