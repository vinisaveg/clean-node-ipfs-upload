import { ServerError } from "../../../presentation/errors/server-error";

import { InvalidTokenError } from "../../../presentation/errors/invalid-token-error";
import { AuthMiddleware } from "./auth-middleware";
import { TokenValidationSpy } from "./test/token-validation-spy";
import { mockRequest } from "../../../../test/mocks/request/mock-request";

type SutTypes = {
  tokenValidationSpy: TokenValidationSpy;
  sut: AuthMiddleware;
};

const makeSut = (): SutTypes => {
  const tokenValidationSpy = new TokenValidationSpy();
  const sut = new AuthMiddleware(tokenValidationSpy);

  return {
    tokenValidationSpy,
    sut,
  };
};

describe("AuthMiddleware", () => {
  it("Should call TokenValidation with correct value", () => {
    const { tokenValidationSpy, sut } = makeSut();

    const request = mockRequest();

    sut.handle(request);

    expect(tokenValidationSpy.token).toBe(request.apiToken);
  });

  it("Should return 200 if apiToken is valid", () => {
    const { tokenValidationSpy, sut } = makeSut();

    tokenValidationSpy.result = null;

    const response = sut.handle(mockRequest());

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(null);
  });

  it("Should return an InvalidTokenError if apiToken is invalid", () => {
    const { tokenValidationSpy, sut } = makeSut();

    tokenValidationSpy.result = new Error();

    const response = sut.handle(mockRequest());

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual(new InvalidTokenError());
  });

  it("Should return 500 if TokenValidation throws", () => {
    const { tokenValidationSpy, sut } = makeSut();

    jest.spyOn(tokenValidationSpy, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = sut.handle(mockRequest());

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError(new Error()));
  });
});
