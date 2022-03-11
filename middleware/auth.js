const UnauthorizedError = require('../exceptions/Unauthorized')
const jwt = require('jsonwebtoken')
// ! Remove hardcoded secret key in production
const jwtPrivateKey = 'superSecureSecret'

const parseToken = function (cookieValue) {
  if (cookieValue) {
    const [name, token] = cookieValue.split('=')
    if (name === 'userToken' && typeof token !== 'undefined') {
      return token
    }
    return undefined
  }
}

module.exports = (req, res, next) => {
  const token = parseToken(req.get('Cookie'))
  if (!token) throw new UnauthorizedError('Missing bearer token')

  try {
    // If there is a token, validate it
    const payload = jwt.verify(token, jwtPrivateKey)
    // set the decoded payload as the user key on the request object
    req.user = payload
    next()
  } catch (err) {
    next(err)
  }
}