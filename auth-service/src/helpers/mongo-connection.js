import { connect } from 'mongoose';
import { User } from '../users/models/user.model';

const mongoPort = process.env.MONGO_PORT;

// todo: move to config
const connection = `mongodb://mongo:${mongoPort}/users`;

export const connectUsersDb = () => {
  return connect(connection, { useNewUrlParser: true });
};
