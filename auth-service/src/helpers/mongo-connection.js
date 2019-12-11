import { connect } from 'mongoose';

import logger from '../libs/logger';
import { User } from '../users/models/user.model';

const log = logger.get('MONGO-USERS', { ignoreLogLevel: true });

const mongoPort = process.env.MONGO_PORT;
const mongoHost = process.env.MONGO_HOST;
const mongoProtocol = process.env.NODE_ENV === 'production' ? 'http' : 'mongodb';

export const connection = `${mongoProtocol}://${mongoHost}:${mongoPort}/users`;

const initializeUserCollection = () => User.createCollection()
  .then(() => log.info('User collection initialized'))
  .catch((err) => log.error(err));

export const connectUsersDb = () => {
  return connect(connection, { useNewUrlParser: true })
    .then(() => initializeUserCollection());
};
