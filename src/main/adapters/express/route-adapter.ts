import { Controller } from "../../../presentation/protocols/controller";

import { Request, Response } from "express";

export const routeAdapter = (controller: Controller<any, any>) => {
  return async (request: Request, response: Response) => {
    const httpResponse = await controller.handle(request);

    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
