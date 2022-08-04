import { PinataUploader } from "./pinata-uploader";
import { mockUploaderParams } from "../../../../test/mocks/uploader/mock-uploader-params";

import { PinataPinResponse } from "@pinata/sdk";

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

    const uploaderParams = await mockUploaderParams();

    const pinataUploaderSpy = jest.spyOn(sut, "execute");

    await sut.execute(uploaderParams);

    expect(pinataUploaderSpy).toHaveBeenCalledWith(uploaderParams);
  });

  it("Should return correct uploaded data", async () => {
    const sut = new PinataUploader();

    const uploaderParams = await mockUploaderParams();

    const result = await sut.execute(uploaderParams);

    expect(result[0]).toHaveProperty("cid", "IpfsHash");
  });
});
