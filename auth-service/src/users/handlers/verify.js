import jwt from 'jsonwebtoken'
import logger from '../../libs/logger'

const config = require('../../config.json')

const log = logger.get('users/verify')

export async function verify(req, res, next) {

  const { headers: { authorization } } = req

  const token = authorization.replace('Bearer ', '')

  if (!token) {
    const error = new Error('Token is not provided')
    log.error(error)

    return next(error)
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      log.error(err)
      return next(err)
    }
    return res.json({ userId: decoded.sub })
  })
}