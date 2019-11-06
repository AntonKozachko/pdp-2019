import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  name: String,
  level: String,
  votes: Number,
  age: Number,
});

export const User = model("User", userSchema);
