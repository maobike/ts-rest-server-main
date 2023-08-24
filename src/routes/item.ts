import { Router } from 'express';
import { getItem, getItems, postItem } from '../controllers/items';

const router = Router();

router.get('/',       getItems );
router.get('/:id',    getItem );
router.post('/',      postItem );

export default router;