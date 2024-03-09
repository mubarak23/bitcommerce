import  * as jwt from 'jsonwebtoken'

const verify = function(token: string, secret: string) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, secret, function(err, decode) {
      if (err) {
        reject(err)
        return
      }
      resolve(decode)
    })
  })
}

export default verify
