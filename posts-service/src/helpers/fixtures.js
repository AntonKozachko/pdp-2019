import Fixtures from 'node-mongodb-fixtures';

export const getFixtures = () => {
  if (process.env.NODE_ENV !== 'production') {
    return new Fixtures({
      dir: 'src/posts/fixtures',
      mute: false,
    });
  }
};
