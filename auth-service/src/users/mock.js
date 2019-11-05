import faker from 'faker'

export const users = [
  {
    id: '1',
    username: 'First_user',
    password: 'test',
    name: faker.name.findName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(),
  },
  {
    id: '2',
    username: 'Second_user',
    password: 'test',
    name: faker.name.findName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(),
  },
  {
    id: '3',
    username: 'Third_user',
    password: 'test',
    name: faker.name.findName(),
    level: faker.name.jobType(),
    votes: faker.random.number(),
    age: faker.random.number(),
  },
]
