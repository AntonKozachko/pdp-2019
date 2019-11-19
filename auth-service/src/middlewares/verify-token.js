import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

import config from '../config.json';
import logger from '../libs/logger';
import { User } from '../users/models/user.model';

const log = logger.get('Parse_Token_Middleware');

export function parseToken (req, res, next) {
  const { headers: { authorization = '' } } = req;

  const token = authorization.replace('Bearer ', '');

  if (isEmpty(token)) {
    log.info('Token is not provided');
    return next();
  }

  const isBlacklistedToken = User.isBlacklisted(token);
  if (isBlacklistedToken) {
    log.error('Token is blacklisted');

    return next();
  }

  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      log.error(err);
      return next();
    }
    log.info(`Request from userId=${decoded.sub}`);
    req.userId = decoded.sub.id;

    return next();
  });
}
