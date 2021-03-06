import { connect } from 'mongoose';

import logger from '../libs/logger';
import { Posts } from '../posts/models/post.model';

const log = logger.get('MONGO-POSTS', { ignoreLogLevel: true });

const mongoPort = process.env.MONGO_PORT;
const mongoHost = process.env.MONGO_HOST;
const mongoUser = process.env.MONGO_USER;
const mongoPwd = process.env.MONGO_PASSWORD;

let connection;

if (process.env.BUILD_ENV === 'production') {
  log.info(`Use ${mongoUser} to connect MongoAtlas cluster`);
  // todo: maybe store cluster url in ci
  connection = `mongodb+srv://${mongoUser}:${mongoPwd}@pdp-mongo-cluster-rjbpc.mongodb.net/test?retryWrites=true&w=majority`;
} else {
  connection = `mongodb://${mongoHost}:${mongoPort}/posts`;
}

const initializePostsCollection = () => Posts.createCollection()
  .then(() => log.info('Posts collection initialized'))
  .catch((err) => log.error(err));

export const connectUsersDb = () => {
  return connect(connection, { useNewUrlParser: true })
    .then(() => initializePostsCollection());
};
