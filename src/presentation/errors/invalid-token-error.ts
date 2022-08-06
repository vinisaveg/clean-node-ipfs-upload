export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token provided.");
    this.name = "InvalidTokenError";
  }
}
