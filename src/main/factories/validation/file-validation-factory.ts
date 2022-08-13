import { FileValidatorAdapter } from "../../../infra/validators/file-validator/file-validator-adapter";
import { FileValidation } from "../../../validation/validations/file-validation/file-validation";

export const makeFileValidation = (): FileValidation => {
  const fileValidator = new FileValidatorAdapter();
  return new FileValidation(fileValidator);
};
