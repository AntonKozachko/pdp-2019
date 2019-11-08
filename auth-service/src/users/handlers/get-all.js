import { BaseController } from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Get_Users_Handler');

export class GetUsersHandler extends BaseController {
  async executeImpl() {
    try {
      let users = await User.find({}, { password: false, username: false });
      log.info(User.getBlacklist())

      return this.success(users);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
