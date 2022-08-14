import { InvalidFileError } from "../../errors/invalid-file-error";
import { mockUploadParams } from "../../../../test/mocks/upload/mock-upload-params";
import { UploadSpy } from "./test/upload-spy";
import { UploadController } from "./upload-controller";
import { FileValidationSpy } from "./test/file-validation-spy";
import { ServerError } from "../../errors/server-error";

type SutTypes = {
  uploadSpy: UploadSpy;
  fileValidationSpy: FileValidationSpy;
  sut: UploadController;
};

const makeSut = (): SutTypes => {
  const uploadSpy = new UploadSpy();
  const fileValidationSpy = new FileValidationSpy();
  const sut = new UploadController(uploadSpy, fileValidationSpy);

  return {
    uploadSpy,
    fileValidationSpy,
    sut,
  };
};

describe("UploadController", () => {
  it("Should call Upload with correct values", async () => {
    const { uploadSpy, sut } = makeSut();

    const request = mockUploadParams();
    await sut.handle(request);

    expect(uploadSpy.data).toEqual({
      data: [
        {
          name: request.data[0].name,
          extension: request.data[0].extension,
          size: request.data[0].size,
          stream: request.data[0].stream,
        },
      ],
    });
  });

  it("Should return 200 with correct body if uploaded correctly", async () => {
    const { uploadSpy, sut } = makeSut();

    const response = await sut.handle(mockUploadParams());

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(uploadSpy.result);
  });

  it("Should return 400 if request is invalid", async () => {
    const { fileValidationSpy, sut } = makeSut();

    fileValidationSpy.result = new InvalidFileError();

    const response = await sut.handle(mockUploadParams());

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "InvalidFileError",
        message: "Invalid file(s) provided.",
      },
    });
  });

  it("Should return 500 if FileValidation throws", async () => {
    const { fileValidationSpy, sut } = makeSut();

    jest.spyOn(fileValidationSpy, "validate").mockImplementationOnce(() => {
      throw new ServerError(new Error());
    });

    const response = await sut.handle(mockUploadParams());

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: {
        name: "ServerError",
        message: "Internal server error.",
      },
    });
  });

  it("Should return 500 if Upload throws", async () => {
    const { uploadSpy, sut } = makeSut();

    jest.spyOn(uploadSpy, "execute").mockImplementationOnce(() => {
      throw new ServerError(new Error());
    });

    const response = await sut.handle(mockUploadParams());

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: {
        name: "ServerError",
        message: "Internal server error.",
      },
    });
  });
});
