import faker from 'faker';
import { mongo } from 'mongoose';

const posts = Array(20).fill({}).map(() => ({
  _id: mongo.ObjectID(),
  title: faker.lorem.words(3),
  article: faker.lorem.words(123),
  postCover: faker.image.nightlife(),
  description: faker.lorem.words(6),
  created: faker.date.past(1),
  likes: {
    count: 5,
    voters: Array(5).fill('').map(() => mongo.ObjectID()),
  },
  author: {
    id: mongo.ObjectID(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
}));

module.exports = posts;
