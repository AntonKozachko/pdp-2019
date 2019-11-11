import { Schema, model } from 'mongoose';
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
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: '',
  },
  votes: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
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
// todo: remove after check
userSchema.static('getBlacklist', () => {
  return JSON.stringify(blacklist);
});

export const User = model('User', userSchema);
