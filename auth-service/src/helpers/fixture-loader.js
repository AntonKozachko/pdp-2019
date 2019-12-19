import { User } from '../users/models/user.model';
import logger from '../libs/logger';
import { getFixtures } from './fixtures';

const log = logger.get('FIXTURE-LOADER', { ignoreLogLevel: true });

const mongoPort = process.env.MONGO_PORT;
const mongoHost = process.env.MONGO_HOST;
const connection = `mongodb://${mongoHost}:${mongoPort}/posts`;

const fixtures = getFixtures();

export async function loadFixtures () {
  if (process.env.BUILD_ENV === 'production') {
    log.info('Skip loading fixtures');
    return;
  }

  const count = await User.countDocuments();

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
