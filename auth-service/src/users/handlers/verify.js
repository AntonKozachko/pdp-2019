import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';
import config from '../../config.json';
import { User } from '../models/user.model';

const log = logger.get('Verify_Token_Handler');

export class VerifyTokenHandler extends BaseController {
  executeImpl () {
    const { authorization = '' } = this.req.headers;

    const token = authorization.replace('Bearer ', '');

    if (isEmpty(token)) {
      const error = 'Token is not provided';
      log.error(error);

      return this.badRequest('Token is not provided');
    }

    const tokenIsBlacklisted = User.isBlacklisted(token);

    if (tokenIsBlacklisted) {
      return this.forbidden('Token is not valid');
    }

    return jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        log.error(err);
        return this.jwtError(err);
      }

      return this.success(decoded.sub);
    });
  }
}
