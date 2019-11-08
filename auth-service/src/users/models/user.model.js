import { Schema, model } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';

import {
  preSaveHook,
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

userSchema.static('addToBlacklist', function(token) {
  blacklist.push(token);
});

userSchema.static('isBlacklisted', function(token) {
  return blacklist.includes(token);
});

userSchema.static('getBlacklist', function() {
  return JSON.stringify(blacklist);
});

export const User = model('User', userSchema);
