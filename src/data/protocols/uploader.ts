import { UploadParams } from "domain/use-cases/upload";

export interface Uploader {
  execute: (data: UploaderParams) => Promise<UploaderResult>;
}

export type UploaderParams = UploadParams;

export type UploaderResult = {
  cid: string;
  path: string;
};
