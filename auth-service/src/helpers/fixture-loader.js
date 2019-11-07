import Fixtures from 'node-mongodb-fixtures';

import { connection } from './mongo-connection';

const fixtures = new Fixtures({
  dir: 'src/users/fixtures',
  mute: false,
});

export const loadFixtures = () => {
  fixtures
    .connect(connection)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .then(() => fixtures.disconnect());
}
