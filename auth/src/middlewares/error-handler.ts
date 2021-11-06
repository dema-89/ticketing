import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Qualcosa è andato storto :\\');

  if (err instanceof CustomError) {
    console.log('Errore custom');

    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    error: [{ message: 'Qualcosa è andato storto' }],
  });
};
