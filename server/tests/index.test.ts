import 'mocha'

// import * as chai from 'chai'
// Do NOT do the above. There would be an error: chai.request is not a function
// We need to support tests in separate files.
// It is okay in the other files though.

const chai = require("chai")

// @ts-ignore:
import chaiHttp from 'chai-http'
import 'reflect-metadata'

chai.use(chaiHttp)
const {expect} = chai

import app from '../src/app'
import { createConnection as createDatabasePool } from "typeorm"
import typeOrmConfig from '../src/ormconfig'

import { runUserSignupTests } from './userSignupTests'

before(async function() {
  // const connection = await createDatabasePool(typeOrmConfig)
  // await connection.runMigrations()

  process.on('unhandledRejection', (err: any, p) => {
    console.error('unhandledRejection', err.stack, p)
  })
})

runUserSignupTests(app)
