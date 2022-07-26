import { Uploader, UploaderResult } from "data/protocols/uploader";
import { UploadParams } from "domain/use-cases/upload";

export class PinataUploader implements Uploader {
  async execute(data: UploadParams): Promise<UploaderResult> {
    return Promise.resolve([
      {
        name: "test",
        size: 100,
        extension: "test",
        path: "test",
        cid: "test",
      },
    ]);
  }
}
