import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth-routes';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

export default app;
