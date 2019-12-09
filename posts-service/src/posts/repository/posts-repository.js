import get from 'lodash/get';
import { PostsMapper } from './posts-mapper';

import logger from '../../libs/logger';

const log = logger.get('Posts_Repo');

export class PostsRepository {
  constructor (models) {
    this.models = models;
  }

  async exists (id) {
    const PostsModel = this.models.Posts;

    const result = await PostsModel.findOne({
      where: { _id: id },
    });

    return !!result;
  }

  async delete (document, user) {
    const PostsModel = this.models.Posts;
    const { id } = document;
    const { id: userId } = user;

    return PostsModel.deleteOne({
      $and: [
        { _id: id },
        { 'author.id': userId },
      ],
    });
  }

  async save (document, user) {
    const PostsModel = this.models.Posts;

    const documentId = get(document, 'id', '');
    const isExist = await this.exists(documentId);

    const rawData = PostsMapper.toPostPersistence(document, user);

    if (isExist) {
      const dbDoc = await PostsModel.findOne({
        _id: documentId,
      });

      try {
        await dbDoc.update(rawData);
      } catch (e) {
        log.error(e);
        return Error(e);
      }
    } else {
      await PostsModel.create(rawData);
    }

    return document;
  }

  async likePost (id, user) {
    const post = await this.findPostById(id);

    const isAlreadyLiked = post.likes.some((likeId) => likeId === user.id);

    let result;

    if (isAlreadyLiked) {
      result = await post.update(
        { $pull: { likes: user.id } },
      );
    } else {
      result = await post.update(
        { $push: { likes: user.id } },
      );
    }

    return result;
  }

  async findPostById (id) {
    const PostsModel = this.models.Posts;

    let result;

    try {
      result = await PostsModel.findOne({
        _id: id,
      });
    } catch (e) {
      log.error(e);
      result = Error(e);
    }

    return result;
  }

  async getAll (user) {
    const PostsModel = this.models.Posts;

    let result;

    try {
      const posts = await PostsModel.find({}, null, { sort: { created: 'desc' } });

      result = posts.map((post) => PostsMapper.toPostDto(post.toObject(), user));
    } catch (e) {
      log.error(e);
      result = Error(e);
    }

    return result;
  }
}
