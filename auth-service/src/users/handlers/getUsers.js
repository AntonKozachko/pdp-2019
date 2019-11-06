import { users } from '../mock';

function getAll () {
  return users.map((u) => {
    const { password, username, ...userData } = u;

    return userData;
  });
}

export function getUsers (req, res) {
  const allUsers = getAll();

  return res.json(allUsers);
}
