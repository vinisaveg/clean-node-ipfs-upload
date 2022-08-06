import { Upload, UploadParams, UploadResult } from "domain/use-cases/upload";
import { Controller } from "presentation/protocols/controller";
import { HttpResponse } from "presentation/protocols/http";

export class UploadController
  implements Controller<UploadParams, UploadResult>
{
  constructor(private readonly upload: Upload) {}

  async handle(request: UploadParams): Promise<HttpResponse<UploadResult>> {
    try {
      const uploadResult = await this.upload.execute(request);

      return {
        statusCode: 200,
        body: uploadResult,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: {
          error: {
            name: error.name,
            message: error.message,
          },
        },
      };
    }
  }
}
