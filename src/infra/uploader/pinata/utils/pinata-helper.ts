import pinataSDK, { PinataClient, PinataPinResponse } from "@pinata/sdk";

export class PinataHelper {
  static pinata: PinataClient;

  static connect(apiKey: string, secretApiKey: string): void {
    this.pinata = pinataSDK(apiKey, secretApiKey);
  }

  static async upload(file: any): Promise<PinataPinResponse> {
    return await this.pinata.pinFileToIPFS(file);
  }
}
