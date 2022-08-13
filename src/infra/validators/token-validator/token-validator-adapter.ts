import { TokenValidator } from "validation/protocols/token-validator";

import jwt from "jsonwebtoken";

export class TokenValidatorAdapter implements TokenValidator {
  isValid(token: string): boolean {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      if (decodedToken.pass === process.env.APP_PASS) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
