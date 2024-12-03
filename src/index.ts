import dotenv from 'dotenv';
import app from './app';
import { initAdmin } from './utils/init-admin';

dotenv.config();

const port: number = parseInt(process.env.PORT!);

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
