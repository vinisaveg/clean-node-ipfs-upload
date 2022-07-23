import {
  Uploader,
  UploaderParams,
  UploaderResult,
} from "data/protocols/uploader";

export class UploaderSpy implements Uploader {
  data: UploaderParams;

  async execute(data: UploaderParams): Promise<UploaderResult> {
    this.data = data;
    return Promise.resolve({
      cid: "test",
      path: "test",
    });
  }
}
