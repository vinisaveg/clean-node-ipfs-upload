import { FileValidation } from "./file-validation";
import { InvalidFileError } from "../../../presentation/errors/invalid-file-error";
import { FileValidatorSpy } from "./test/file-validator-spy";
import { mockFile } from "../../../../test/mocks/file/mock-file";

type SutTypes = {
  fileValidatorSpy: FileValidatorSpy;
  sut: FileValidation;
};

const makeSut = (): SutTypes => {
  const fileValidatorSpy = new FileValidatorSpy();
  const sut = new FileValidation(fileValidatorSpy);

  return {
    sut,
    fileValidatorSpy,
  };
};

describe("FileValidation", () => {
  it("Should return InvalidFileError if file is invalid", async () => {
    const { sut, fileValidatorSpy } = makeSut();

    fileValidatorSpy.result = false;

    const file = await mockFile();

    const result = sut.validate(file);

    expect(result).toEqual(new InvalidFileError());
  });

  it("Should return null if file is valid", async () => {
    const { sut, fileValidatorSpy } = makeSut();

    fileValidatorSpy.result = true;

    const file = await mockFile();

    const result = sut.validate(file);

    expect(result).toEqual(null);
  });
});
