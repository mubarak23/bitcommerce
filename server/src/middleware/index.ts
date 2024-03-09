import express from 'express'
import helmet from 'helmet'

import * as Sentry from "@sentry/node";
import setupSentry from './sentry'
import runBodyParseMiddleware from './bodyParser'
import runCorsMiddleware from './cors'
import httpLogger from './http-logger'
import setupSwagger from './swagger';


const iniitializeMiddlewares = (app: express.Application) => {
  // The Sentry request handler must be the first middleware on the app
  setupSentry(app)

  app.use(helmet())
  
  runBodyParseMiddleware(app)
  runCorsMiddleware(app)

  if(process.env.NODE_ENV === 'production') {
    app.use(httpLogger)
  }

  // This is key to make swagger work
  app.use(express.static("public"))
  app.set('views', `${__dirname  }/public`)

  setupSwagger(app)

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler())
}

export default iniitializeMiddlewares
