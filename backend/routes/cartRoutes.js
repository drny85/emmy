import express from 'express';

const router = express.Router();

import {
  addToCart,
  createCart,
  getCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect, admin } from '../middleware/protectMiddleware.js';

router.route('/').post(addToCart).get(createCart);
router.route('/:id').get(getCart).put(clearCart);

export default router;
