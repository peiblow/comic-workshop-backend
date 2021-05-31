const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = function (authorization) {
  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, authConfig.secret)
    const userId = decoded.id
    return userId
  } catch (err) {
    return {
      message: 'unauthorized',
      error: err
    }
  }
}
