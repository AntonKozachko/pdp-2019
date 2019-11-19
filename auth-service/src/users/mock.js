import faker from 'faker';

export const users = [
  {
    username: 'First_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
  {
    username: 'Second_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
  {
    username: 'Third_user',
    password: 'test',
    avatar: faker.internet.avatar(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
];
