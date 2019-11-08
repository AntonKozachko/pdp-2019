import isEmpty from 'lodash/isEmpty';

import { BaseController} from '../../helpers/base-controller';
import { User } from '../models/user.model';
import logger from '../../libs/logger';

const log = logger.get('Update_User_Handler');

export class UpdateUserHandler extends BaseController {
  async executeImpl() {
    const { password, username, ...propsToUpdate  } = this.req.body;
    const { authorization = '' } = this.req.headers;

    const token = authorization.replace('Bearer ', '');

    if (isEmpty(propsToUpdate)) {
      log.error('Data is not provided');
      return this.badRequest();
    }

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
        let updatedUser = await User.findOneAndUpdate({ id: decoded.sub }, propsToUpdate, { new: true });
        return this.created();
      } catch (err) {
        log.error(err);
        return this.mongoError(err);
      }
    });
  }
}
