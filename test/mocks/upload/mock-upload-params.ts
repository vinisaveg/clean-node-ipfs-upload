import { UploadParams } from "../../../src/domain/use-cases/upload";

import { Buffer } from "node:buffer";
import { faker } from "@faker-js/faker";

export const mockUploadParams = (): UploadParams => {
  const file = Buffer.from(faker.random.word(), "base64");
  const uploadParams: UploadParams = {
    data: [
      {
        name: faker.random.word(),
        extension: faker.random.alpha(3),
        size: Number(faker.random.numeric(3)),
        buffer: file,
      },
    ],
  };

  return uploadParams;
};
