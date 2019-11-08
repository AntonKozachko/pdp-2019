import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

import { BaseController} from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';
import config from '../../config.json';

const log = logger.get('Delete_Handler');

export class DeleteHandler extends BaseController {
  async executeImpl() {
    const { authorization = '' } = this.req.headers;

    const token = authorization.replace('Bearer ', '');

    if (isEmpty(token)) {
      log.error('Token is not provided');
      return this.forbidden();
    }

    return jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        log.error(err);
        return this.jwtError(err);
      }

      try {
        log.info(`Delete user ${decoded.sub}`)
        let deletedUser = await User.deleteOne({ _id: decoded.sub });

        // todo: add to blacklist token of deleted user
        User.addToBlacklist(token);

        return this.success();
      } catch (err) {
        log.error(err);
        return this.mongoError(err);
      }
    });
  }
}
