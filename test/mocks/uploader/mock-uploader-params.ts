import { UploaderParams } from "../../../src/data/protocols/uploader";

import path from "path";
import { readFile } from "fs/promises";
import { faker } from "@faker-js/faker";

export const mockUploaderParams = async (): Promise<UploaderParams> => {
  const testFilePath = path.resolve("./test/fixtures/files/test-file.gif");
  const testFile = await readFile(testFilePath);

  const uploadParams: UploaderParams = {
    data: [
      {
        name: faker.random.word(),
        extension: faker.random.alpha(3),
        size: Number(faker.random.numeric(3)),
        buffer: testFile,
      },
    ],
  };

  return uploadParams;
};
