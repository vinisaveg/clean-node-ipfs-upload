import { FileValidation } from "./file-validation";
import { InvalidFileError } from "../../../presentation/errors/invalid-file-error";
import { FileValidatorSpy } from "./test/file-validator-spy";

import { readFile } from "fs/promises";
import path from "path";

describe("FileValidation", () => {
  const testFilePath = path.resolve("./test/fixtures/files/test-file.gif");
  let testFile: Buffer;

  beforeAll(async () => {
    testFile = await readFile(testFilePath);
  });

  it("Should return InvalidFileError if file is invalid", async () => {
    const fileValidatorSpy = new FileValidatorSpy();
    const sut = new FileValidation(fileValidatorSpy);

    fileValidatorSpy.result = false;

    const result = sut.validate({
      name: "testfile",
      extension: ".svg",
      size: 100,
      buffer: testFile,
    });

    expect(result).toEqual(new InvalidFileError());
  });
});
