import Cart from '../models/cartModel.js';
import asyncHandle from 'express-async-handler';

export const addToCart = asyncHandle(async (req, res, next) => {
  const { product, cartId } = req.body;

  const cart = await Cart.findById(cartId);
  console.log(cart);
  if (!cart) {
    res.status(400);
    throw new Error('no cart found');
  }
  const inCart = cart.items.find((p) => p.product._id === product.product._id);

  if (inCart) {
    const index = cart.items.findIndex(
      (i) => i.product._id === product.product._id
    );

    const count = cart.items[index].qty;
    const saved = await Cart.updateOne(
      { _id: cartId, 'items.product._id': product.product._id },
      {
        $set: {
          'items.$.qty': count + 1,
          total: cart.total + product.price,
          quantity: cart.quantity + 1,
        },
      },
      { overwrite: true }
    );

    return res.json(saved);
  } else {
    cart.items.push(product);
    cart.quantity = cart.quantity + 1;
    cart.total = cart.total + product.price;

    const updated = await cart.save();
    console.log('U', updated);
    return res.json(updated);
  }
});

export const getCart = asyncHandle(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  return res.json(cart);
});

export const createCart = asyncHandle(async (req, res, next) => {
  const cart = await Cart.create({
    items: [],
  });

  return res.json(cart._id);
});
