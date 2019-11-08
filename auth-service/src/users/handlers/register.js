import { BaseController } from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Register_User_Handler');

export class RegisterHandler extends BaseController {
  async executeImpl() {
    const { body } = this.req;

    const NewUser = new User(body);

    try {
      let user = await NewUser.save();
      return this.success(user);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
