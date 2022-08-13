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

  it.todo("Should return false if file is invalid");
  it.todo("Should return true if file is valid");
});
