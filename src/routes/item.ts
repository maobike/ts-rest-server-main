import { Router } from 'express';
import { getItem, getItems, postItem } from '../controllers/items';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/', [validateJWT], getItems );
router.get('/:id', [validateJWT], getItem );
router.post('/', [validateJWT], postItem );

export default router;