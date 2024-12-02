import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error';
import authRoutes from './routes/auth-routes';
import adminRoutes from './routes/admin-routes';

const app = express();

// middleware
app.use(json());
app.use(cors());

// routes
app.use(errorHandler);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

export default app;
