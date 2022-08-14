import { authMiddlewareAdapter } from "../adapters/middleware/auth-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";
import { multerAdapter } from "../adapters/multer/multer-adapter";
import { makeUploadController } from "../factories/controllers/upload-controller-factory";
import { multerUpload } from "../config/multer";

import { Router } from "express";

export const uploadRoutes = (router: Router): void => {
  router.post(
    "/upload",
    multerUpload,
    authMiddlewareAdapter(makeAuthMiddleware()),
    multerAdapter(makeUploadController())
  );
};
