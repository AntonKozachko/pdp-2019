import isEmpty from 'lodash/isEmpty';

import { BaseController } from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Delete_Handler');

export class DeleteHandler extends BaseController {
  async executeImpl () {
    const { userId } = this.req;

    if (isEmpty(userId)) {
      log.error('Token is not provided or invalid');
      return this.forbidden();
    }

    try {
      log.info(`Delete user ${userId}`);
      await User.deleteOne({ _id: userId });

      const { authorization } = this.req.headers;
      const token = authorization.replace('Bearer ', '');

      User.addToBlacklist(token);

      return this.success();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
