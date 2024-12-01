import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const app: Express = express();
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
