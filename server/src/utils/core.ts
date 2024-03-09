import { AxiosError } from 'axios';
import bcrypt from "bcrypt";
import moment from 'moment';





export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
	return typeof obj === "undefined" || obj === null
}




export const utcNow = () => {
  return moment.utc().toDate()
}

export const standardizeDateTime = (dateTime: string) => {
  return moment.utc(dateTime).toDate()
}

function rand(min: number, max: number) {
  const random = Math.random()
  return Math.floor(random * (max - min) + min)
}

export const generateOtp = (length: number) => {
  if (process.env.NODE_ENV !== 'production') {
    return '111111111111111111'.substring(0, length)
  }

  let otp = ''
  const digits = '0123456789'

  while (otp.length < length) {
    const charIndex = rand(0, digits.length - 1)
    otp += digits[charIndex]
  }
  return otp
}

export const generatePasswordHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const passwordSalt = await bcrypt.genSalt(saltRounds);
  
  return bcrypt.hash(password, passwordSalt);
}

export const pickWithRoundRobin = (lastIndex: number, candidateIds: any[]) => {
  if(lastIndex === -1 || lastIndex === candidateIds.length - 1) {
    return candidateIds[0]
  }
  return candidateIds[lastIndex + 1]
}

export const getOrderEntityReferenceNumber = (entity: {id: number}) => {
  return `${10000 + entity.id}`
}

export const generateUniqueReference = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}


export const handleAxiosRequestError = (error: AxiosError) => {
  if (error.response) {
    /*
    * The request was made and the server responded with a
    * status code that falls out of the range of 2xx
    */
    return error.response.data.error
  }
  if (error.request) {
    /*
    * The request was made but no response was received, `error.request`
    * is an instance of XMLHttpRequest in the browser and an instance
    * of http.ClientRequest in Node.js
    */
    const errorMessage = 'The server seems down at the moment. Please try again later.'
    return errorMessage
  }

  // Something happened in setting up the request and triggered an Error
  return error.message
}

export const jsonbArrayValue = (array: any[]) => {
  return `'${JSON.stringify(array)}'`
}
