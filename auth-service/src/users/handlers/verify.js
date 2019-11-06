import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import logger from '../../libs/logger';

const config = require('../../config.json');

const log = logger.get('users/verify');

export async function verify (req, res, next) {
  const { headers: { authorization = '' } } = req;

  const token = authorization.replace('Bearer ', '');

  if (isEmpty(token)) {
    const error = new Error('Token is not provided');
    log.error(error);

    return next(error);
  }

  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      log.error(err);
      return next(err);
    }
    return res.json({ userId: decoded.sub });
  });
}
