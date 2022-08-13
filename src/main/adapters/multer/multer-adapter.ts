import { UploadParams, UploadResult } from "../../../domain/use-cases/upload";
import { Request, Response } from "express";
import { Controller } from "../../../presentation/protocols/controller";

export const multerAdapter = (
  controller: Controller<UploadParams, UploadResult>
) => {
  return async (request: Request, response: Response) => {
    const files = request.files as Array<Express.Multer.File>;
    const fileName = files[0].originalname.split(".");
    const extension = fileName[1];

    const requestData: UploadParams = {
      data: [
        {
          buffer: files[0].buffer,
          name: fileName[0],
          size: files[0].size,
          extension: `.${extension}`,
        },
      ],
    };

    const httpResponse = await controller.handle(requestData);

    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
