import { TokenValidatorAdapter } from "../../../infra/validators/token-validator/token-validator-adapter";
import { TokenValidation } from "../../../validation/validations/token-validation/token-validation";

export const makeTokenValidation = (): TokenValidation => {
  const tokenValidator = new TokenValidatorAdapter();
  return new TokenValidation(tokenValidator);
};
