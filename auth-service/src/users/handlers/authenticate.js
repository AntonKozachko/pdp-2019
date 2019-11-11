import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';
import config from '../../config.json';

const log = logger.get('Authenticate_Handler');

export class AuthenticateHandler extends BaseController {
  async executeImpl () {
    const { username, password } = this.req.body;

    try {
      const foundUser = await User.findOne(
        { username, password },
        { username: false, password: false },
      );
      const user = foundUser.toObject();

      return jwt.sign({ sub: user._id }, config.secret, { expiresIn: '30m' }, (err, token) => {
        if (err) {
          log.error(err);
          return this.jwtError(err);
        }

        const userResponse = {
          ...user,
          authToken: token,
        };

        return this.success(userResponse);
      });
    } catch (err) {
      log.error(err);
      return this.notFound();
    }
  }
}
