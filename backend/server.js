import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';

import path from 'path';

//routes import
import uploadRoutes from './routes/uploadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import { errorHandler, notFound } from './middleware/errorMidleware.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//make statis folders
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//routes

app.use('/api/products', productRoutes);

app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.get('/api/paypal', (req, res) => {
  return res.json(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Hello');
  });
}

// errors middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.underline.green);
});
