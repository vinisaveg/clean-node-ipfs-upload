import { File } from "domain/entities/file";

export interface FileValidator {
  isValid: (file: File) => boolean;
}
