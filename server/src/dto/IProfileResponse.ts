import { ICloudFile } from "../interfaces/ICloudFile";

export interface IProfile {
  userUuid: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  photo: ICloudFile,
}
