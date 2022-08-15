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
  const VALID_API_TOKEN = process.env.VALID_API_TOKEN as string;
  const APP_PASS = process.env.APP_PASS as string;

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

  it("Should return true if token is valid", () => {
    const sut = new TokenValidatorAdapter();

    jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
      pass: APP_PASS,
    }));

    const result = sut.isValid(VALID_API_TOKEN);

    expect(result).toBe(true);
  });

  it("Should return false when TokenValidatorAdapter throws", () => {
    const sut = new TokenValidatorAdapter();

    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw new Error();
    });

    const result = sut.isValid(VALID_API_TOKEN);

    expect(result).toBe(false);
  });
});
