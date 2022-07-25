import { UploadParams } from "../../../src/domain/use-cases/upload";

import { Buffer } from "node:buffer";

export const mockUploadParams = (): UploadParams => {
  const file = Buffer.from("test", "base64");
  const data = [file];

  return { data };
};
