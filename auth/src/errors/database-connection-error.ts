export class DatabaseConnectionError extends Error {
  reason = 'Errore di connessione al database';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
