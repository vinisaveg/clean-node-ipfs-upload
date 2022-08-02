import {
  Uploader,
  UploaderParams,
  UploaderResult,
} from "data/protocols/uploader";
import { PinataHelper } from "./utils/pinata-helper";

export class PinataUploader implements Uploader {
  async execute(params: UploaderParams): Promise<UploaderResult> {
    const result = await PinataHelper.upload(params.data[0]);

    return Promise.resolve([
      {
        name: "test-file",
        size: result.PinSize,
        extension: ".gif",
        path: `ipfs.io/ipfs/${result.IpfsHash}`,
        cid: result.IpfsHash,
      },
    ]);
  }
}
