import { UploadUseCase } from "../../../data/use-cases/upload/upload";
import { PinataUploader } from "../../../infra/uploader/pinata/pinata-uploader";

export const makeUpload = (): UploadUseCase => {
  const uploader = new PinataUploader();
  return new UploadUseCase(uploader);
};
