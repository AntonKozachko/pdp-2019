import Fixtures from 'node-mongodb-fixtures';

import { User } from '../users/models/user.model';
import { connection } from './mongo-connection';
import logger from '../libs/logger';

const log = logger.get('FIXTURE-LOADER', { ignoreLogLevel: true });

const mongoPort = process.env.MONGO_PORT;
const mongoHost = process.env.MONGO_HOST;

const connection = `mongodb://${mongoHost}:${mongoPort}/posts`;

const fixtures = new Fixtures({
  dir: 'src/users/fixtures',
  mute: false,
});

export async function loadFixtures () {
  const count = await User.count();

  if (count) {
    log.info(`Found ${count} users. Skip loading users`);
    return;
  }

  fixtures
    .connect(connection)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .then(() => fixtures.disconnect())
    .then(() => log.info('Users loaded'));
}
