import { NextFunction, Request, Response } from 'express';
import { formatError } from 'node-backend-utils/utils';

export function errorHandler(error: unknown, _: Request, res: Response, next: NextFunction): void {
  const { statusCode, ...response } = formatError(error).getJSON();

  res.status(statusCode).json(response);

  next();
}