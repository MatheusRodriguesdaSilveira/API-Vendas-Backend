import 'reflect-metadata';
import '@shared/typeorm';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from '@shared/routes/routes';
import { AppError } from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof AppError) {
      return (res as any).status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

app.listen(3333, () => console.log(`Server Online!!! Port: ${3333}`));
