import { InvalidTokenError } from "../../../presentation/errors/invalid-token-error";
import { ServerError } from "../../../presentation/errors/server-error";
import { HttpResponse } from "../../../presentation/protocols/http";
import { Middleware } from "../../../presentation/protocols/middleware";
import { Validation } from "../../../presentation/protocols/validation";

export class AuthMiddleware implements Middleware {
  constructor(private readonly tokenValidation: Validation<string>) {}

  handle(request: any): HttpResponse<any> {
    try {
      const apiToken = request.apiToken;

      if (apiToken) {
        const isValid = this.tokenValidation.validate(apiToken);

        if (isValid === null) {
          return {
            statusCode: 200,
            body: null,
          };
        }
      }

      return {
        statusCode: 403,
        body: new InvalidTokenError(),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(error as Error),
      };
    }
  }
}
