import { TokenValidator } from "validation/protocols/token-validator";

export class TokenValidatorAdapter implements TokenValidator {
  isValid(token: string): boolean {
    return false;
  }
}
