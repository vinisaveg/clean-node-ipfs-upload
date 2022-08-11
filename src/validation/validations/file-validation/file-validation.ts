import { File } from "domain/entities/file";
import { InvalidFileError } from "../../../presentation/errors/invalid-file-error";
import { Validation } from "presentation/protocols/validation";
import { FileValidator } from "validation/protocols/file-validator";

export class FileValidation implements Validation<File> {
  constructor(private readonly fileValidator: FileValidator) {}

  validate(input: File): Error | null {
    const isValid = this.fileValidator.isValid(input);

    if (!isValid) {
      return new InvalidFileError();
    }

    return null;
  }
}
