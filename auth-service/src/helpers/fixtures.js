import Fixtures from 'node-mongodb-fixtures';

export const getFixtures = () => {
  if (process.env.BUILD_ENV !== 'production') {
    return new Fixtures({
      dir: 'fixtures',
      mute: false,
    });
  }
};
