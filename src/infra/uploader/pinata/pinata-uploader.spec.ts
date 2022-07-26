import { PinataUploader } from "./pinata-uploader";

import { createReadStream } from "fs";
import path from "path";

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

  it.todo("Should return correct uploaded data");
});
