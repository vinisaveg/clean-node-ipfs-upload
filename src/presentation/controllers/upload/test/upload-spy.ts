import { Upload, UploadParams, UploadResult } from "domain/use-cases/upload";

export class UploadSpy implements Upload {
  result: UploadResult;
  data: UploadParams;

  execute(data: UploadParams): Promise<UploadResult> {
    this.data = data;
    return Promise.resolve(this.result);
  }
}
