import 'mocha'
import express from 'express'

// import * as chai from 'chai'
const chai = require("chai")

// @ts-ignore:
import chaiHttp from 'chai-http'
import * as _ from 'underscore'

chai.use(chaiHttp)
const {expect} = chai

import sinon from 'sinon'


export const runUserSignupTests = function (app: express.Application) {
  describe('First test', function () {
    it(`1 + 1 = 2`, async function (done) {
      expect(1 + 1 === 2).to.be.true
      done()
    })
  })
}
