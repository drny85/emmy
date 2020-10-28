import express from 'express';

const router = express.Router();

import { createOrder, getOrderById } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/protectMiddleware.js';

router.route('/').post(createOrder);
router.route('/:id').get(getOrderById);

export default router;
