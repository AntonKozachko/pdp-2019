import faker from 'faker';
import { mongo } from 'mongoose';

module.exports = [
  {
    _id: mongo.ObjectID(),
    username: 'test_user',
    password: 'test',
    name: faker.name.firstName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(60),
  },
  {
    _id: mongo.ObjectID(),
    username: 'second_user',
    password: 'test',
    name: faker.name.firstName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(60),
  },
  {
    _id: mongo.ObjectID(),
    username: 'third_user',
    password: 'test',
    name: faker.name.firstName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(60),
  },
];
