import express from 'express';

import { billController } from '../controllers/billController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, billController.createBill);
router.get('/', auth, billController.getAllBills);
router.get('/:id', auth, billController.getBillById);
router.put('/:id', auth, billController.updateBill);
router.delete('/:id', auth, billController.deleteBill);
router.patch('/:id/status', auth, billController.updateBillStatus);
router.get('/branch/:branchId', auth, billController.getBillsByBranch);

export default router;
