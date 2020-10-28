import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

export const createOrder = asyncHandler(async (req, res, next) => {
  const body = req.body;

  const order = await Order.create(body);

  if (order) return res.json(order);

  res.status(400);
  throw new Error('error placing order');
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    res.status(400);
    throw new Error('Invalid route or ID');
  }

  const order = await Order.findById(id);

  if (order) return res.json(order);

  res.status(400);
  throw new Error('no order found');
});
