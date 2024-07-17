import express from 'express';

import { productController } from '../controllers/productController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getAllProducts);
router.get('/:id', auth, productController.getProductById);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/branch/:branchId', auth, productController.getProductsByBranch);
router.patch('/:id/stock', auth, productController.updateProductStock);

export default router;
