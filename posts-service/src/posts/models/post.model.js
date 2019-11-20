import { Schema, model } from 'mongoose';
import faker from 'faker';
import uniqueValidator from 'mongoose-unique-validator';

import { imageUrlValidator } from '../../helpers/validators';

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
    validate: [imageUrlValidator, 'invalid image url format'],
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
