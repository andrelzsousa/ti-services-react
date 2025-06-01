import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

const router = Router();
const clientController = new ClientController();

// Rotas de clientes
router.post('/clientes', clientController.create);
router.get('/clientes', clientController.getAll);
router.get('/clientes/:id', clientController.getById);
router.put('/clientes/:id', clientController.update);
router.delete('/clientes/:id', clientController.delete);
router.post('/clientes/login', clientController.login);
router.put('/clientes/:login/senha', clientController.trocarSenha);

export default router; 