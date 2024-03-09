import express from 'express'
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const setupSentry = (app: express.Application) => {
  if(process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
      ],


      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 0.5,
    })
  }

  // The sentry request handler must be the first middleware on the app
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

export default setupSentry
