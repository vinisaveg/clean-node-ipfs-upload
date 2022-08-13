import { Middleware } from "../../../presentation/protocols/middleware";

import { Request, Response, NextFunction } from "express";

export const authMiddlewareAdapter = (middleware: Middleware) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const bearerToken = request.headers.authorization;
    const token = bearerToken?.split(" ")[1];

    const authMiddlewareRequest = {
      apiToken: token,
    };

    const httpResponse = middleware.handle(authMiddlewareRequest);

    if (httpResponse.statusCode === 200) {
      next();
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body,
      });
    }
  };
};
