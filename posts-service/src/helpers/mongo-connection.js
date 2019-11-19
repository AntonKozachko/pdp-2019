import { connect } from 'mongoose';

import logger from '../libs/logger';
import { Posts } from '../posts/models/post.model';

const log = logger.get('MONGO-POSTS', { ignoreLogLevel: true });

const mongoPort = process.env.MONGO_PORT;
const mongoHost = process.env.MONGO_HOST;
export const connection = `mongodb://${mongoHost}:${mongoPort}/posts`;

const initializePostsCollection = () => Posts.createCollection()
  .then(() => log.info('Posts collection initialized'))
  .catch((err) => log.error(err));

export const connectUsersDb = () => {
  return connect(connection, { useNewUrlParser: true })
    .then(() => initializePostsCollection());
};
