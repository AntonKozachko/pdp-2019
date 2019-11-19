import Fixtures from 'node-mongodb-fixtures';

import { Posts } from '../posts/models/post.model';
import { connection } from './mongo-connection';
import logger from '../libs/logger';

const log = logger.get('FIXTURE-LOADER', { ignoreLogLevel: true });

const fixtures = new Fixtures({
  dir: 'src/posts/fixtures',
  mute: false,
});

export async function loadFixtures () {
  const count = await Posts.count();

  if (count) {
    log.info(`Found ${count} posts. Skip loading posts`);
    return;
  }

  fixtures
    .connect(connection)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .then(() => fixtures.disconnect())
    .then(() => log.info('Posts loaded'));
}
