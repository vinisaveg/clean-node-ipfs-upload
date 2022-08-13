import { File } from "domain/entities/file";
import { FileValidator } from "validation/protocols/file-validator";

export class FileValidatorAdapter implements FileValidator {
  isValid(file: File): boolean {
    return false;
  }
}
