import { FileCloudProviders, UploadFileCategory } from "../enums/FileUpload";

export interface ICloudFile {
  keyFromCloudProvider: string,
  url: string,
  mimetype: string,
  fileCloudProvider: FileCloudProviders,
}
