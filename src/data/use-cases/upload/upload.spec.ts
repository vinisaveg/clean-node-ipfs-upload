import { UploaderSpy } from "../test/uploader-spy";
import { UploadUseCase } from "./upload";
import { mockUploadParams } from "../../../../test/mocks/upload/mock-upload-params";

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

    const data = mockUploadParams();

    await sut.execute(data);

    expect(uploaderSpy.data).toEqual(data);
  });

  it("Should throw if Uploader throws", () => {
    const { sut, uploaderSpy } = makeSut();

    jest.spyOn(uploaderSpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(mockUploadParams());

    expect(promise).rejects.toThrow();
  });

  it("Should return correct data on Upload execution", async () => {
    const { sut, uploaderSpy } = makeSut();

    const result = await sut.execute(mockUploadParams());

    expect(result).toEqual({
      files: uploaderSpy.result,
    });
  });
});
