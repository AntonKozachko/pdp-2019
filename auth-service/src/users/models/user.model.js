import { Schema, model } from 'mongoose';
import faker from 'faker';
import uniqueValidator from 'mongoose-unique-validator';

import {
  documentToObject,
} from '../../helpers/mongo-helpers';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15,
  },
  avatar: {
    type: String,
    default: faker.internet.avatar(),
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    default: '',
  },
});

const blacklist = [];

userSchema.plugin(uniqueValidator);
userSchema.post('save', documentToObject);

userSchema.static('addToBlacklist', (token) => {
  blacklist.push(token);
});

userSchema.static('isBlacklisted', (token) => {
  return blacklist.includes(token);
});

export const User = model('User', userSchema);
