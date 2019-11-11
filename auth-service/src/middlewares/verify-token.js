import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

import config from '../config.json';
import logger from '../libs/logger';
import { User } from '../users/models/user.model';

const log = logger.get('Id_By_Token_Middleware');

export class ParseTokenMiddleware {
  static verify (req, res, next) {
    const { headers: { authorization = '' } } = req;

    const token = authorization.replace('Bearer ', '');

    if (isEmpty(token)) {
      return next();
    }

    const isBlacklistedToken = User.isBlacklistedToken(token);
    if (isBlacklistedToken) {
      log.error('Token is blacklisted');

      return next();
    }

    return jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        log.error(err);
        return next();
      }

      req.userId = decoded.sub;

      return next();
    });
  }
}
