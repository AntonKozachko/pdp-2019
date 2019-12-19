import faker from 'faker';
import { mongo } from 'mongoose';

module.exports = [
  {
    _id: mongo.ObjectID(),
    username: 'first_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
  {
    _id: mongo.ObjectID(),
    username: 'second_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
  {
    _id: mongo.ObjectID(),
    username: 'third_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
];
