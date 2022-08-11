import { File } from "../../../src/domain/entities/file";
import { readFile } from "fs/promises";
import { faker } from "@faker-js/faker";

import path from "path";

export const mockFile = async (): Promise<File> => {
  const testFilePath = path.resolve("./test/fixtures/files/test-file.gif");
  const testFile = await readFile(testFilePath);

  return {
    name: faker.random.word(),
    extension: faker.random.alpha(3),
    size: Number(faker.random.numeric(3)),
    buffer: testFile,
  };
};
