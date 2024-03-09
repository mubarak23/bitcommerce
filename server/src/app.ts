import express from 'express'
import iniitializeMiddlewares from './middleware'

process.env.TZ = "UTC"

const app: express.Application = express()

iniitializeMiddlewares(app)

export default app
