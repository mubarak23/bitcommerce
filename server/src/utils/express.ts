import { Response } from 'express'
import HttpStatus from 'http-status-codes'
import { BaseServiceException } from './error-response-types'
import { IServerResponse } from '../interfaces/IServerResponse'


export const respondWithStatus = (res: Response, statusCode: number, data?: string | object | undefined) => {
  res.status(statusCode).send(data)
}

export const respondWithError = (res: Response, exception?: BaseServiceException | undefined) => {
  const resData: IServerResponse<any> = {
    status: false,
    error: exception?.error || exception?.message
  }
  if(exception?.detailErrors) {
    resData.errors = exception?.detailErrors
  }

  try {
    if(exception?.statusCode) {
      res.status(exception.statusCode).send(resData)    
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resData)  
    }
  } catch(e) {
    console.log(e.message)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: false,
      error: e.message
    })
  }
}

export const respondWithSimpleError = (res: Response, statusCode: number, message?: string) => {
  const resData: IServerResponse<any> = {
    status: false,
    error: message
  }
  try {
    res.status(statusCode).send(resData) 
  } catch(e) {
    console.log(e.message)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: false,
      error: e.message
    })
  }
}

export const respondWithBadRequest = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.BAD_REQUEST, message)
}

export const respondWithUnauthorized = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.UNAUTHORIZED, message)
}

export const respondWithForbidden = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.FORBIDDEN, message)
}

export const respondWithNotFound = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.NOT_FOUND, message)
}

export const respondWithUnprocessableEntity = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.UNPROCESSABLE_ENTITY, message)
}

export const respondWithServerError = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.INTERNAL_SERVER_ERROR, message)
}

export const respondWithConflict = (res: Response, message: string) => {
  respondWithSimpleError(res, HttpStatus.CONFLICT, message)
}
