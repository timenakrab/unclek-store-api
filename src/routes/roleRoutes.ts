import express from 'express';

import { roleController } from '../controllers/roleController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, roleController.createRole);
router.get('/', auth, roleController.getAllRoles);
router.get('/:id', auth, roleController.getRoleById);
router.put('/:id', auth, roleController.updateRole);
router.delete('/:id', auth, roleController.deleteRole);

export default router;
