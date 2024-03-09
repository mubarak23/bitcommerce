import { ValidateError } from '@tsoa/runtime';
import express from 'express'


export const handleErrors = (app: express.Application) => {
  app.use(function errorHandler(err, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ValidateError) {
      return res.status(422).json({
        status: false,
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err.statusCode) { // substitude for instanceof BaseServiceException
      console.log(err.message)
      console.log(err.stack)
      return res.status(err.statusCode).json({
        status: false,
        error: err.message,
      });
    }
    if (err instanceof Error) {
      console.log(err.message)
      console.log(err.stack)
      return res.status(500).json({
        status: false,
        error: 'Internal Server Error',
      });    
    }
  
    next();
  });
}
