import { Router } from 'express';
import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/users';
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router();

router.get('/', [ validateJWT ], getUsers );
router.get('/:id', [ validateJWT ] , getUser );
router.post('/', [ validateJWT ], postUser );
router.put('/:id', [ validateJWT ], putUser );
router.delete('/:id', [ validateJWT ], deleteUser );

export default router;