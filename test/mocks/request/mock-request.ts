import { faker } from "@faker-js/faker";

export const mockRequest = (): any => {
  return {
    apiToken: faker.random.alphaNumeric(16),
  };
};
