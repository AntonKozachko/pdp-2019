import { Schema, model } from 'mongoose';

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
    default: null,
  },
  level: {
    type: String,
    default: null,
  },
  votes: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: null,
  },
});

export const User = model('User', userSchema);
