import { File } from "domain/entities/file";
import { FileValidator } from "validation/protocols/file-validator";

export class FileValidatorAdapter implements FileValidator {
  validExtensions: Array<string> = [".png", ".gif"];

  isValid(file: File): boolean {
    const isEmpty = this.isEmpty(file.name, file.extension);
    const isExtensionInvalid = this.isExtensionInvalid(file.extension);

    if (isEmpty || isExtensionInvalid) {
      return false;
    }

    return true;
  }

  isEmpty(name: string, extension: string): boolean {
    if (name === "" || extension === "") {
      return true;
    }

    return false;
  }

  isExtensionInvalid(extension: string): boolean {
    if (this.validExtensions.includes(extension)) {
      return false;
    }

    return true;
  }
}
