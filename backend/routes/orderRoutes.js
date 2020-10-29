import express from 'express';

const router = express.Router();

import {
  createOrder,
  getOrderById,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/protectMiddleware.js';

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);

export default router;
