import {
  Uploader,
  UploaderParams,
  UploaderResult,
} from "data/protocols/uploader";
import { mockUploaderResult } from "../../../../test/mocks/uploader/mock-uploader-result";

export class UploaderSpy implements Uploader {
  data: UploaderParams;
  result: UploaderResult;

  async execute(data: UploaderParams): Promise<UploaderResult> {
    this.data = data;
    this.result = mockUploaderResult();
    return Promise.resolve(this.result);
  }
}
