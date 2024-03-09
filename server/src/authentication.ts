import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
// import { User } from "./entity/User";
// import { User } from "./entity/User";
import { ErrorMessages } from "./enums/ErrorMessages";


export function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
  const token = request.headers["x-access-token"] as string;
  const jwtSecret = (process.env.JWT_SECRET as string) || 'rth5766d'

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("Swagger Error! No token provided"));
    }
    jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
      if (err) {
        reject(err);
      } else {
        (async () => {
          const { uuid } = decoded;

           // const userRepo = getRepository(User);
          const currentUser = {id: "34456"} // await userRepo.findOne({ uuid });

          if (!currentUser) {
            return reject(ErrorMessages.USER_NON_EXISTENCE);
          }
          resolve(currentUser);
        })();
      }
    });
  });
}
