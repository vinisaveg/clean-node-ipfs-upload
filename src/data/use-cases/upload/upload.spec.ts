import { UploaderSpy } from "../test/uploader-spy";
import { UploadUseCase } from "./upload";

import { Buffer } from "node:buffer";

describe("Upload Use Case", () => {
  it("Should call Uploader with correct data", async () => {
    const uploaderSpy = new UploaderSpy();
    const sut = new UploadUseCase(uploaderSpy);

    const file = Buffer.from("test", "base64");
    const data = [file];

    await sut.execute({ data });

    expect(uploaderSpy.data).toEqual({ data });
  });

  it.todo("Should throw if Uploader throws");
  it.todo("Should return correct data on Upload execution");
});
