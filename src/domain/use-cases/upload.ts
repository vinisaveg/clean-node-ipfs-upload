import { File } from "domain/entities/file";
import { FileUploaded } from "domain/entities/file-uploaded";

export interface Upload {
  execute: (data: UploadParams) => Promise<UploadResult>;
}

export type UploadParams = {
  data: Array<File>;
};

export type UploadResult = {
  files: Array<FileUploaded>;
};
