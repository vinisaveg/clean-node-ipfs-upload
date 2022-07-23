import { Upload, UploadParams, UploadResult } from "domain/use-cases/upload";
import { Uploader } from "data/protocols/uploader";

export class UploadUseCase implements Upload {
  constructor(private readonly uploader: Uploader) {}

  async execute(data: UploadParams): Promise<UploadResult> {
    await this.uploader.execute(data);

    return Promise.resolve({
      files: [
        {
          name: "test",
          size: 100,
          extension: ".test",
          cid: "test",
          path: "test",
        },
      ],
    });
  }
}
