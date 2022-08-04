import {
  Uploader,
  UploaderParams,
  UploaderResult,
} from "data/protocols/uploader";
import { PinataHelper } from "./utils/pinata-helper";

export class PinataUploader implements Uploader {
  async execute(params: UploaderParams): Promise<UploaderResult> {
    const uploaderResult: UploaderResult = [];

    params.data.forEach(async (file) => {
      const result = await PinataHelper.upload(file.buffer);

      uploaderResult.push({
        name: file.name,
        extension: file.extension,
        size: result.PinSize,
        cid: result.IpfsHash,
        path: `ipfs.io/ipfs/${result.IpfsHash}`,
      });
    });

    return uploaderResult;
  }
}
