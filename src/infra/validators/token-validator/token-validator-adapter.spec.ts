import { faker } from "@faker-js/faker";
import { TokenValidatorAdapter } from "./token-validator-adapter";

import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify(): any {
    return {
      pass: "pass",
    };
  },
}));

describe("TokenValidatorAdapter", () => {
  it("Should validate with correct value", () => {
    const sut = new TokenValidatorAdapter();

    const token = faker.random.alphaNumeric(16);

    const jwtVerifySpy = jest.spyOn(jwt, "verify");

    sut.isValid(token);

    expect(jwtVerifySpy).toHaveBeenCalledWith(token, "secret");
  });

  it("Should return false if token is invalid", () => {
    const sut = new TokenValidatorAdapter();

    const invalidtoken = faker.random.alphaNumeric(16);

    const result = sut.isValid(invalidtoken);

    expect(result).toBe(false);
  });

  it.todo("Should return true if token is valid");
});
