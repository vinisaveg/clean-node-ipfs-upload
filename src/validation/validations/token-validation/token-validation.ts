import { Validation } from "validation/protocols/validation";
import { TokenValidator } from "validation/protocols/token-validator";
import { InvalidTokenError } from "../../../presentation/errors/invalid-token-error";

export class TokenValidation implements Validation<string> {
  constructor(private readonly validator: TokenValidator) {}

  validate(token: string): Error | null {
    const isValid = this.validator.isValid(token);

    if (!isValid) {
      return new InvalidTokenError();
    }

    return null;
  }
}
