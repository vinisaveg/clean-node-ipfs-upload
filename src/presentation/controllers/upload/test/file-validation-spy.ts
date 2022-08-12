import { File } from "domain/entities/file";
import { Validation } from "presentation/protocols/validation";

export class FileValidationSpy implements Validation<File> {
  input: File;
  result: Error | null = null;

  validate(input: File): Error | null {
    this.input = input;
    return this.result;
  }
}
