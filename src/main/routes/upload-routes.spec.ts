import { ServerHelper } from "../server/server";

import request from "supertest";
import { PinataPinResponse } from "@pinata/sdk";

jest.mock("../../infra/uploader/pinata/utils/pinata-helper.ts", () => ({
  PinataHelper: {
    async upload(): Promise<PinataPinResponse> {
      return {
        IpfsHash: "IpfsHash",
        PinSize: 100,
        Timestamp: "Timestamp",
      };
    },
    connect(): null {
      return null;
    },
  },
}));

describe("Upload Routes", () => {
  const port = 3000;
  const serverHelper = new ServerHelper(port);
  const validApiToken = process.env.VALID_API_TOKEN as string;

  beforeAll(() => {
    serverHelper.init();
  });

  it("Should return 200 on upload if token is valid", async () => {
    const response = await request(serverHelper.app)
      .post("/api/upload")
      .set("Authorization", `Bearer ${validApiToken}`)
      .attach("file", "test/fixtures/files/test-file.gif");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      files: [
        {
          name: "test-file",
          extension: ".gif",
          size: 100,
          cid: "IpfsHash",
          path: "ipfs.io/ipfs/IpfsHash",
        },
      ],
    });
  });

  it("Should return 403 on upload if token is not provided", async () => {
    const response = await request(serverHelper.app)
      .post("/api/upload")
      .attach("file", "test/fixtures/files/test-file.gif");

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({ error: { name: "InvalidTokenError" } });
  });
});
