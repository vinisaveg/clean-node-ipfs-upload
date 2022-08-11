import { FileValidator } from "../../../protocols/file-validator";
import { File } from "domain/entities/file";

export class FileValidatorSpy implements FileValidator {
  result: boolean;
  file: File;

  isValid(file: File): boolean {
    this.file = file;
    return this.result;
  }
}
