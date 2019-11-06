import { connect } from 'mongoose';
import { User } from '../users/models/user.model';

// todo: move to config
const connection = "mongodb://mongo:27017/users";

export const connectUsersDb = () => {
  return connect(connection);
};
