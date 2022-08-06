import { faker } from "@faker-js/faker";
import { InvalidTokenError } from "../../../presentation/errors/invalid-token-error";
import { TokenValidatorSpy } from "./test/token-validator-spy";
import { TokenValidation } from "./token-validation";

type SutTypes = {
  tokenValidator: TokenValidatorSpy;
  sut: TokenValidation;
};

const makeSut = (): SutTypes => {
  const tokenValidator = new TokenValidatorSpy();
  const sut = new TokenValidation(tokenValidator);

  return {
    tokenValidator,
    sut,
  };
};

describe("TokenValidation", () => {
  it("Should return null if token is valid", () => {
    const { sut, tokenValidator } = makeSut();

    tokenValidator.result = true;

    const token = faker.random.alphaNumeric(32);

    const result = sut.validate(token);

    expect(result).toBe(null);
  });

  it("Should return an InvalidTokenError if token is invalid", () => {
    const { sut, tokenValidator } = makeSut();

    tokenValidator.result = false;

    const token = faker.random.alphaNumeric(32);

    const result = sut.validate(token);

    expect(result).toEqual(new InvalidTokenError());
  });
});
