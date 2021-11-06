import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Errore di connessione al database';
  statusCode = 500;

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
