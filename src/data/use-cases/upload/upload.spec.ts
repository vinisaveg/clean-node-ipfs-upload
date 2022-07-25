import { UploaderSpy } from "../test/uploader-spy";
import { UploadUseCase } from "./upload";

import { Buffer } from "node:buffer";

type SutTypes = {
  uploaderSpy: UploaderSpy;
  sut: UploadUseCase;
};

const makeSut = (): SutTypes => {
  const uploaderSpy = new UploaderSpy();
  const sut = new UploadUseCase(uploaderSpy);

  return {
    uploaderSpy,
    sut,
  };
};

describe("Upload Use Case", () => {
  it("Should call Uploader with correct data", async () => {
    const { sut, uploaderSpy } = makeSut();

    const file = Buffer.from("test", "base64");
    const data = [file];

    await sut.execute({ data });

    expect(uploaderSpy.data).toEqual({ data });
  });

  it("Should throw if Uploader throws", () => {
    const { sut, uploaderSpy } = makeSut();

    jest.spyOn(uploaderSpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    const file = Buffer.from("test", "base64");
    const data = [file];

    const promise = sut.execute({ data });

    expect(promise).rejects.toThrow();
  });

  it.todo("Should return correct data on Upload execution");
});
