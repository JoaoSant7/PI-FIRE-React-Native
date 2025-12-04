import { Router } from 'express';
import { OcorrenciaController } from '../controllers/ocorrenciaController';

const router = Router();

// Rotas de Ocorrências
router.get('/estatisticas', OcorrenciaController.obterEstatisticas);
router.get('/', OcorrenciaController.listarTodas);
router.get('/:id', OcorrenciaController.buscarPorId);
router.post('/', OcorrenciaController.criar);
router.put('/:id', OcorrenciaController.atualizar);
router.delete('/:id', OcorrenciaController.deletar);

export default router;