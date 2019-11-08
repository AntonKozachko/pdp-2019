import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

import config from '../config.json';
import logger from '../libs/logger';

const log = logger.get('Id_By_Token_Middleware');

export class IdByTokenMiddleware {
  verify(token) {
    const { headers: { authorization = '' } } = req;

    const token = authorization.replace('Bearer ', '');

    if (isEmpty(token)) {
      return next();
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        log.error(err);
        return next();
      }

      req.userId = decoded.sub;

      return next();
    });
  }
}