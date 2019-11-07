import { User } from '../models/user.model';

export async function createUser(req, res) {
  const { body } = req;    
    // todo: finish
  try {
    let user = await User.create(body);
    return res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.statusMessage = err;
    res.status(400).end();
  }
}
