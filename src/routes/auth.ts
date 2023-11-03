import { Router } from 'express';
import { login } from '../controllers/auth';

const router = Router();

router.post('/', login );

export default router;