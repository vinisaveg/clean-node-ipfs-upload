import { faker } from "@faker-js/faker";
import { TokenValidatorSpy } from "./test/token-validator-spy";
import { TokenValidation } from "./token-validation";

describe("TokenValidation", () => {
  it("Should return null if token is valid", () => {
    const tokenValidator = new TokenValidatorSpy();
    const sut = new TokenValidation(tokenValidator);

    tokenValidator.result = true;

    const token = faker.random.alphaNumeric(32);

    const result = sut.validate(token);

    expect(result).toBe(null);
  });
});
