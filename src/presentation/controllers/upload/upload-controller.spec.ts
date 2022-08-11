import { mockUploadParams } from "../../../../test/mocks/upload/mock-upload-params";
import { UploadSpy } from "./test/upload-spy";
import { UploadController } from "./upload-controller";

describe("UploadController", () => {
  it("Should call Upload with correct values", async () => {
    const uploadSpy = new UploadSpy();
    const sut = new UploadController(uploadSpy);

    const request = mockUploadParams();
    await sut.handle(request);

    expect(uploadSpy.data).toEqual({
      data: [
        {
          name: request.data[0].name,
          extension: request.data[0].extension,
          size: request.data[0].size,
          buffer: request.data[0].buffer,
        },
      ],
    });
  });

  it("Should return 200 with correct body if uploaded correctly", async () => {
    const uploadSpy = new UploadSpy();
    const sut = new UploadController(uploadSpy);

    const request = mockUploadParams();
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(uploadSpy.result);
  });

  it.todo("Should return 400 if request is invalid");
  it.todo("Should return 500 if Upload throws");
});
