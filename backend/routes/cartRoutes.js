import express from 'express';

const router = express.Router();

import {
  addToCart,
  createCart,
  getCart,
} from '../controllers/cartController.js';
import { protect, admin } from '../middleware/protectMiddleware.js';

router.route('/').post(addToCart).get(createCart);
router.route('/:id').get(getCart);

export default router;
