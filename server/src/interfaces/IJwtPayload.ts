import { ICloudFile } from "../interfaces/ICloudFile";
export interface IJwtPayload {
  uuid: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  emailAddress?: string,
  photo?: ICloudFile,
}
