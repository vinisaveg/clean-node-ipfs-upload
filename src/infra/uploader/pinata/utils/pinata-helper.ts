import pinataSDK, { PinataClient, PinataPinResponse } from "@pinata/sdk";
import { ReadStream } from "fs";

export class PinataHelper {
  static pinata: PinataClient;

  static connect(apiKey: string, secretApiKey: string): void {
    this.pinata = pinataSDK(apiKey, secretApiKey);
  }

  static async upload(file: ReadStream): Promise<PinataPinResponse> {
    return await this.pinata.pinFileToIPFS(file);
  }
}
