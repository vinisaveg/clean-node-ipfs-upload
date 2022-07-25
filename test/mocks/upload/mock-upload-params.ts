import { UploadParams } from "../../../src/domain/use-cases/upload";

import { Buffer } from "node:buffer";
import { faker } from "@faker-js/faker";

export const mockUploadParams = (): UploadParams => {
  const file = Buffer.from(faker.random.word(), "base64");
  const data = [file];

  return { data };
};
