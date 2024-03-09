import express from 'express'
import cors from 'cors'

const runCorsMiddleware = (app: express.Application) => {
  // app.use(cors())
  const corsOptions = {
    origin: [
      'http://localhost:42965',
      "http://localhost:4200",
      // 'http://192.168.88.203'
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions))
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next()
  })
  app.options('*', cors())
}

export default runCorsMiddleware
