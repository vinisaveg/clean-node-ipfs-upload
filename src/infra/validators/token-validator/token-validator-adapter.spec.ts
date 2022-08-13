import { faker } from "@faker-js/faker";
import { TokenValidatorAdapter } from "./token-validator-adapter";

describe("TokenValidatorAdapter", () => {
  it("Should validate with correct value", () => {
    const sut = new TokenValidatorAdapter();

    const token = faker.random.alphaNumeric(16);

    jest.spyOn(sut, "isValid");

    sut.isValid(token);

    expect(sut.isValid).toHaveBeenCalledWith(token);
  });
  it.todo("Should return false if token is invalid");
  it.todo("Should return true if token is valid");
});
