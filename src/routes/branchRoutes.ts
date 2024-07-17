import express from 'express';

import { branchController } from '../controllers/branchController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, branchController.createBranch);
router.get('/', auth, branchController.getAllBranches);
router.get('/:id', auth, branchController.getBranchById);
router.put('/:id', auth, branchController.updateBranch);
router.delete('/:id', auth, branchController.deleteBranch);
router.post('/:id/add-user', auth, branchController.addUserToBranch);
router.post('/:id/remove-user', auth, branchController.removeUserFromBranch);

export default router;
