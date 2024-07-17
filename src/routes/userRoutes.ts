import express from 'express';

import { userController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

export default router;
