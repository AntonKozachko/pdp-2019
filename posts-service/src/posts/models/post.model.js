import { Schema, model } from 'mongoose';
import faker from 'faker';
import uniqueValidator from 'mongoose-unique-validator';

import {
  documentToObject,
} from '../../helpers/mongo-helpers';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  article: {
    type: String,
    required: true,
  },
  postCover: {
    type: String,
    default: faker.image.image(),
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  created: {
    type: Date,
    default: new Date().toISOString(),
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    voters: {
      type: [String],
      default: [],
    },
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

postSchema.plugin(uniqueValidator);
postSchema.post('save', documentToObject);

export const Posts = model('Posts', postSchema);
