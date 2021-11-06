import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Qualcosa è andato storto :\\');

  if (err instanceof RequestValidationError) {
    console.log('Errore di validazione');
    const formattedError = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return res.status(400).send({ errors: formattedError });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('Errore connessione DB');

    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    message: err.message,
  });
};
