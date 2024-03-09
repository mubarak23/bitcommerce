// import * as _ from "underscore";
// import bcrypt from "bcrypt";
// import PhoneNumber from "awesome-phonenumber";

// import { User } from "../entity/User";
// import { IServerResponse } from "../interfaces/IServerResponse";
// import { Put, Request, Route, Security, Body, Post, Tags } from "tsoa";
// import { getFreshConnection } from "../db";
// import { BadRequestError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";
// import { IAccessTokenData } from "../interfaces/IAccessTokenData";

import * as Utils from "../utils/core"


// DO NOT EXPORT DEFAULT

// @Route("api/access")

// export class AccessController {
//   @Post('/login/password')
//   public async loginWithPassword(@Body() reqBody: IPasswordLoginRequestDto): Promise<IServerResponse<IAccessTokenData>> {
//     let { emailOrPhoneNumber } = reqBody;
//     const { password } = reqBody;

//     const connection = await getFreshConnection();
//     const userRepo = connection.getRepository(User);

//     if (emailOrPhoneNumber.indexOf("@") < 0) {
//       if (emailOrPhoneNumber.startsWith('0')) {
//         emailOrPhoneNumber = emailOrPhoneNumber.substring(1)
//       }        
//     }

//     const existingUser = await userRepo
//       .createQueryBuilder()
//       .where(
//         "phone_number = :emailOrPhoneNumber OR email_address = :emailOrPhoneNumber",
//         {
//           emailOrPhoneNumber,
//         }
//       )
//       .getOne();

//     if (!existingUser) {
//       throw new BadRequestError(
//         "The phone number does NOT belong to a VALID cinderbuild user."
//       );
//     }

//     const match = await bcrypt.compare(password, existingUser.passwordHash);
//     if (!match) {
//       throw new UnauthorizedRequestError("User credentials are wrong.");
//     }

//     const tokenData = await TokenService.getAccessToken(existingUser);

//     const resData: IServerResponse<IAccessTokenData> = {
//       status: true,
//       data: tokenData,
//     };
//     return resData;
//   }

//   @Post('/login/phonenumber')
//   public async loginWithPhone(@Body() reqBody: LoginWithPhone): Promise<IServerResponse<{phoneVerificationOtp?: string }>> {
//     const { countryIso2 } = reqBody
//     let { phoneNumber } = reqBody
    
//     if (phoneNumber.startsWith('0')) {
//       phoneNumber = phoneNumber.substring(1)
//     }

//     const supportedCountry = await Utils.getSupportedCountryFromIso2(countryIso2)
    
//     const msisdn = new PhoneNumber(phoneNumber, supportedCountry.iso2).getNumber()

//     const connection = await getFreshConnection()
//     const userRepo = connection.getRepository(User)
//     const existingUser = await userRepo.findOne({
//       msisdn,
//     })

//     if(!existingUser) {
//       throw new BadRequestError('The phone number does NOT belong to a VALID TradeGrid user.')
//     }
    
//     const otp = Utils.generateOtp(4)

//     await PhoneVerificationService.sendPhoneVerificationOtp(
//       phoneNumber, msisdn, otp);

//     const dataInResponse = {
//       phoneVerificationOtp: process.env.NODE_ENV !== 'production' ? otp : ''
//     }

//     const resData = {
//       status: true,
//       data: dataInResponse
//     }
//     return resData
//   }


//   @Post('/login/phonenumber/verify/otp')
//   public async verifyPhoneForLogin(@Body() reqBody: LoginWithPhoneOtpVerify): Promise<IServerResponse<IAccessTokenData>> {
//     const { countryIso2, otp } = reqBody
//     let { phoneNumber } = reqBody

//     if (phoneNumber.startsWith('0')) {
//       phoneNumber = phoneNumber.substring(1)
//     }

//     const supportedCountry = await Utils.getSupportedCountryFromIso2(countryIso2)
    
//     const msisdn = new PhoneNumber(phoneNumber, supportedCountry.iso2).getNumber()

//     const connection = await getFreshConnection()

//     const phoneVerificationRepo = connection.getRepository(PhoneVerification);
//     const checkPhoneVerifyCode = await phoneVerificationRepo.findOne({
//       phoneNumber,
//       verificationCode: otp,
//       isVerified: false,
//     });

//     if (!checkPhoneVerifyCode) {
//       throw new UnauthorizedRequestError('Phone verification failed.')
//     }

//     await phoneVerificationRepo
//       .createQueryBuilder()
//       .update(PhoneVerification)
//       .set({ isVerified: true })
//       .where({ id: checkPhoneVerifyCode.id })
//       .execute();


//     const userRepo = connection.getRepository(User)

//     const existingUser = await userRepo.findOne({msisdn})
//     if(!existingUser) {
//       throw new UnprocessableEntityError('The phone number does NOT belong to a valid Cinderbuild customer')
//     }

//     const tokenData = await TokenService.getAccessToken(existingUser);

//     const resData: IServerResponse<IAccessTokenData> = {
//       status: !!tokenData,
//       data: tokenData
//     }
//     return resData
//   }

//   @Put("/logout")
//   @Security("jwt")
//   public async handleLogout(
//     @Request() req: any
//   ): Promise<IServerResponse<void>> {
//     const currentUser: User = req.user;

//     const connection = await getFreshConnection()
//     const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken)
//     await pushNotificationTokenRepo.delete({userId: currentUser.id})

//     const resData: IServerResponse<void> = {
//       status: true,
//     };
//     return resData;
//   }
// }
