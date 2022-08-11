import { Validation } from "../../../../presentation/protocols/validation";

export class TokenValidationSpy implements Validation<string> {
  token: string;
  result: Error | null;

  validate(token: string): Error | null {
    this.token = token;
    return this.result;
  }
}
