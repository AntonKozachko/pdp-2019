import jwt from 'jsonwebtoken';
import logger from '../../libs/logger';
import { users } from '../mock';

const config = require('../../config.json');

const log = logger.get('users/authenticate');

export async function authenticate (req, res, next) {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) return next('No such user or password is incorrect');

  return jwt.sign({ sub: user.id }, config.secret, { expiresIn: '30m' }, (err, token) => {
    if (err) {
      log.error(err);

      return next(err);
    }

    const { password: mockPassword, username: mockUsername, ...userData } = user;

    const userResponse = {
      ...userData,
      authToken: token,
    };

    return res.json(userResponse);
  });
}
