export class InvalidFileError extends Error {
  constructor() {
    super("Invalid file(s) provided.");
    this.name = "InvalidFileError";
  }
}
