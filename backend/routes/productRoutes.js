import express from 'express';

const router = express.Router();

import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/protectMiddleware.js';

router.route('/').post(protect, admin, addProduct).get(getProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

export default router;
