import isEmpty from 'lodash/isEmpty';

import { BaseController } from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Update_User_Handler');

export class UpdateUserHandler extends BaseController {
  async executeImpl () {
    const { password, username, ...propsToUpdate } = this.req.body;
    const { userId } = this.req;

    if (isEmpty(propsToUpdate)) {
      log.error('Data is not provided');
      return this.badRequest();
    }

    if (isEmpty(userId)) {
      log.error('Token is not provided or invalid');
      return this.forbidden();
    }

    try {
      await User.findOneAndUpdate({ _id: userId }, propsToUpdate, { new: true });
      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
