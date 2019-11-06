import { users } from '../mock';
import logger from '../../libs/logger';

const log = logger.get('users/');

function getAll () {
  return users.map((u) => {
    const { password, username, ...userData } = u;

    return userData;
  });
}

export function getUsers (req, res) {
  const users = getAll();

  return res.json(users);
}
