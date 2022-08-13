import { mockFile } from "../../../../test/mocks/file/mock-file";
import { FileValidatorAdapter } from "./file-validator-adapter";

describe("FileValidator", () => {
  it("Should validate with correct value", async () => {
    const sut = new FileValidatorAdapter();

    const file = await mockFile();

    jest.spyOn(sut, "isValid");

    sut.isValid(file);

    expect(sut.isValid).toHaveBeenCalledWith(file);
  });

  it("Should return false if file is invalid", async () => {
    const sut = new FileValidatorAdapter();

    const file = await mockFile();
    file.name = "";
    file.extension = ".svg";

    const result = sut.isValid(file);

    expect(result).toBe(false);
  });

  it.todo("Should return true if file is valid");
});
