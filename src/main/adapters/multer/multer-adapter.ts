import { UploadParams, UploadResult } from "../../../domain/use-cases/upload";
import { Controller } from "../../../presentation/protocols/controller";

import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const multerAdapter = (
  controller: Controller<UploadParams, UploadResult>
) => {
  return async (request: Request, response: Response) => {
    const file = request.file as Express.Multer.File;
    const originalname = file.originalname.split(".");
    const filename = originalname[0];
    const extension = originalname[1];

    const filePath = path.resolve(`./uploads/${file.filename}`);
    const fileReadstream = fs.createReadStream(filePath);

    const requestData: UploadParams = {
      data: [
        {
          name: filename,
          size: file.size,
          extension: `.${extension}`,
          stream: fileReadstream,
        },
      ],
    };

    const httpResponse = await controller.handle(requestData);

    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
