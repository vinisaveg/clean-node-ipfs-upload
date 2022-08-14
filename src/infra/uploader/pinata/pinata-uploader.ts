import {
  Uploader,
  UploaderParams,
  UploaderResult,
} from "data/protocols/uploader";
import { PinataHelper } from "./utils/pinata-helper";

export class PinataUploader implements Uploader {
  async execute(params: UploaderParams): Promise<UploaderResult> {
    const uploaderResult: UploaderResult = [];

    try {
      const result = await PinataHelper.upload(params.data[0].stream);

      uploaderResult.push({
        name: params.data[0].name,
        extension: params.data[0].extension,
        size: result.PinSize,
        cid: result.IpfsHash,
        path: `ipfs.io/ipfs/${result.IpfsHash}`,
      });

      return uploaderResult;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
