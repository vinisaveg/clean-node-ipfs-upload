import { PinataUploader } from "./pinata-uploader";

import { PinataPinResponse } from "@pinata/sdk";
import { createReadStream } from "fs";
import path from "path";

jest.mock("./utils/pinata-helper.ts", () => ({
  PinataHelper: {
    async upload(): Promise<PinataPinResponse> {
      return {
        IpfsHash: "IpfsHash",
        PinSize: 100,
        Timestamp: "Timestamp",
      };
    },
  },
}));

describe("Pinata Uploader", () => {
  it("Should call execute with correct data", async () => {
    const sut = new PinataUploader();

    const testFilePath = path.resolve("./test/fixtures/files/test-file.gif");
    const testFile = createReadStream(testFilePath);
    const uploaderParams = {
      data: [testFile],
    };

    const pinataUploaderSpy = jest.spyOn(sut, "execute");

    await sut.execute(uploaderParams);

    expect(pinataUploaderSpy).toHaveBeenCalledWith(uploaderParams);
  });

  it("Should return correct uploaded data", async () => {
    const sut = new PinataUploader();

    const testFilePath = path.resolve("./test/fixtures/files/test-file.gif");
    const testFile = createReadStream(testFilePath);
    const uploaderParams = {
      data: [testFile],
    };

    const result = await sut.execute(uploaderParams);

    expect(result[0]).toHaveProperty("cid", "IpfsHash");
  });
});
