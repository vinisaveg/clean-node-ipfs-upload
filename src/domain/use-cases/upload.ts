import { FileUploaded } from "domain/entities/file-uploaded";

export interface Upload {
  execute: (data: UploadParams) => Promise<UploadResult>;
}

export type UploadParams = {
  data: Array<any>;
};

export type UploadResult = {
  files: Array<FileUploaded>;
};
