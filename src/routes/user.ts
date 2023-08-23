import { Router } from 'express';
import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/users';


const router = Router();


router.get('/',       getUsers );
router.get('/:id',    getUser );
router.post('/',      postUser );
router.put('/:id',    putUser );
router.delete('/:id', deleteUser );



export default router;