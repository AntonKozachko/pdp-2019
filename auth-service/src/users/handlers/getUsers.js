import { User } from '../models/user.model';

export async function getUsers (req, res) {
  const foundUsers = await User.find({}, { password: false, username: false });

  return res.json(foundUsers);
}
