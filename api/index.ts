import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initAdmin } from '../src/utils/init-admin';
import { errorHandler } from '../src/middlewares/error';
import cashierRoutes from '../src/routes/cashier-routes';
import adminRoutes from '../src/routes/admin-routes';
import authRoutes from '../src/routes/auth-routes';
import productRoutes from '../src/routes/product-routes';
import transactionRoutes from '../src/routes/transaction-routes';

dotenv.config();
const app = express();

const port: number = parseInt(process.env.PORT!);

// middleware
app.use(json());
app.use(cors());

// routes
app.use(errorHandler);
app.use('/cashiers', cashierRoutes);
app.use('/cashiers', adminRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);

const startServer = async () => {
  try {
    await initAdmin();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
