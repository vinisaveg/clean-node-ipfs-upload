import { UploaderResult } from "../../../src/data/protocols/uploader";

import { faker } from "@faker-js/faker";

export const mockUploaderResult = (): UploaderResult => {
  const cid = faker.datatype.hexadecimal(32);
  const path = `${faker.internet.url()}/${cid}`;

  return [
    {
      name: faker.random.word(),
      extension: faker.random.word(),
      size: Number(faker.random.numeric()),
      cid,
      path,
    },
  ];
};
