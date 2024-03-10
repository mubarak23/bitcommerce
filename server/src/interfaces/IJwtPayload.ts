import { ICloudFile } from "../interfaces/ICloudFile";
export interface IJwtPayload {
  uuid: string,
  walletName?: string,
  emailAddress?: string,
  photo?: ICloudFile,
}
