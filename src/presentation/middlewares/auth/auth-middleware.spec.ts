import { faker } from "@faker-js/faker";

import { AuthMiddleware } from "./auth-middleware";
import { TokenValidationSpy } from "./test/token-validation-spy";

describe("AuthMiddleware", () => {
  it("Should call TokenValidation with correct value", () => {
    const tokenValidationSpy = new TokenValidationSpy();
    const sut = new AuthMiddleware(tokenValidationSpy);

    const request = {
      apiToken: faker.random.alphaNumeric(16),
    };

    sut.handle(request);

    expect(tokenValidationSpy.token).toBe(request.apiToken);
  });

  it("Should return 200 if apiToken is valid", () => {
    const tokenValidationSpy = new TokenValidationSpy();
    const sut = new AuthMiddleware(tokenValidationSpy);

    const request = {
      apiToken: faker.random.alphaNumeric(16),
    };

    tokenValidationSpy.result = null;

    const response = sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(null);
  });
  it.todo("Should return an InvalidTokenError if apiToken is invalid");
  it.todo("Should return 500 if TokenValidation throws");
});
