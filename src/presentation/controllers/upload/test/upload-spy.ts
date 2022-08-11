import { faker } from "@faker-js/faker";
import { Upload, UploadParams, UploadResult } from "domain/use-cases/upload";

export class UploadSpy implements Upload {
  result: UploadResult = {
    files: [
      {
        name: faker.random.word(),
        size: Number(faker.random.numeric(3)),
        extension: faker.random.word(),
        path: faker.random.word(),
        cid: faker.random.word(),
      },
    ],
  };
  data: UploadParams;

  execute(data: UploadParams): Promise<UploadResult> {
    this.data = data;
    return Promise.resolve(this.result);
  }
}
