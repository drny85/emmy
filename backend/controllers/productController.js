import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    imageUrl,
    estimatedDelivery,
    available,
  } = req.body;

  const product = new Product({
    name,
    description,
    price,
    imageUrl,
    estimatedDelivery,
    available,
  });

  await product.save();
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res.status(200).json(products);
});

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    description,
    price,
    imageUrl,
    estimatedDelivery,
    available,
  } = req.body;
  const updated = await Product.findByIdAndUpdate(
    id,
    { name, description, price, imageUrl, estimatedDelivery, available },
    { new: true }
  );
  if (updated) {
    return res.json(updated);
  } else {
    res.status(400);
    throw new Error('error updating product');
  }
});
