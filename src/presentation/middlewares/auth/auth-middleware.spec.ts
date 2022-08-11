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
  it.todo("Should return 200 if apiToken is valid");
  it.todo("Should return an InvalidTokenError if apiToken is invalid");
  it.todo("Should return 500 if TokenValidation throws");
});
