import { File } from "domain/entities/file";
import { Validation } from "presentation/protocols/validation";

export class FileValidation implements Validation<File> {
  validate(input: File): Error | null {
    return null;
  }
}
