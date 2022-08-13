import { uploadRoutes } from "../routes/upload-routes";
import { PinataHelper } from "../../infra/uploader/pinata/utils/pinata-helper";

import { Server } from "http";
import express, { Application, Router } from "express";

export class ServerHelper {
  private server: Server;
  private port: number;
  app: Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  public init(): void {
    this.setupExpress();
    this.setupRoutes();
    this.setupPinata();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    const router = Router();
    uploadRoutes(router);
    this.app.use(router);
  }

  private setupPinata(): void {
    PinataHelper.connect(
      String(process.env.PINATA_API_KEY),
      String(process.env.PINATA_API_SECRET)
    );
  }

  public start(): void {
    const server = this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });

    this.server = server;
  }

  public shutdown(): void {
    this.server.close();
  }
}
