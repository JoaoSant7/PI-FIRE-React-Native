import express from 'express';
import { login } from '../controllers /authController';
import { list, create, batch } from '../controllers /incidentController';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/auth/login', login);

router.use(auth);               // tudo abaixo exige token
router.get('/ocorrencias', list);
router.post('/ocorrencias', create);
router.post('/ocorrencias/batch', batch);

export default router;