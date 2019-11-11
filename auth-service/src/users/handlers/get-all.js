import { BaseController } from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Get_Users_Handler');

export class GetUsersHandler extends BaseController {
  async executeImpl () {
    const { userId } = this.req;
    if (!userId) {
      log.error('Token is not provided or invalid');
      return this.forbidden();
    }

    try {
      const users = await User.find({}, { password: false, username: false });

      return this.success(users);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
