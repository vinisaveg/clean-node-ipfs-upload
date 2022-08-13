import { UploadParams, UploadResult } from "../../../domain/use-cases/upload";
import { UploadController } from "../../../presentation/controllers/upload/upload-controller";
import { Controller } from "../../../presentation/protocols/controller";
import { makeUpload } from "../use-cases/upload-factory";
import { makeFileValidation } from "../validation/file-validation-factory";

export const makeUploadController = (): Controller<
  UploadParams,
  UploadResult
> => {
  const upload = makeUpload();
  const fileValidation = makeFileValidation();
  return new UploadController(upload, fileValidation);
};
