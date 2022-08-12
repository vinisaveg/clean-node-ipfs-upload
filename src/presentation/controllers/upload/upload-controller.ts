import { File } from "domain/entities/file";
import { Upload, UploadParams, UploadResult } from "domain/use-cases/upload";
import { Controller } from "presentation/protocols/controller";
import { HttpResponse } from "presentation/protocols/http";
import { Validation } from "presentation/protocols/validation";

export class UploadController
  implements Controller<UploadParams, UploadResult>
{
  constructor(
    private readonly upload: Upload,
    private readonly fileValidation: Validation<File>
  ) {}

  async handle(request: UploadParams): Promise<HttpResponse<UploadResult>> {
    try {
      const error = this.fileValidation.validate(request.data[0]);

      if (error === null) {
        const uploadResult = await this.upload.execute(request);

        return {
          statusCode: 200,
          body: uploadResult,
        };
      }

      return {
        statusCode: 400,
        body: {
          error: {
            name: error.name,
            message: error.message,
          },
        },
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
