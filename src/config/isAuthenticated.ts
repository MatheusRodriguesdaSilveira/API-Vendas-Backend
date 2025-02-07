import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('JWT token is missing');
  }
  try {
    const decodeToken = verify(token, process.env.JWT_SECRET as string);

    const { sub } = decodeToken as IPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token');
  }
}
