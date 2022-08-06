import { TokenValidator } from "validation/protocols/token-validator";

export class TokenValidatorSpy implements TokenValidator {
  token: string;
  result: boolean;

  isValid(token: string): boolean {
    this.token = token;

    return this.result;
  }
}
