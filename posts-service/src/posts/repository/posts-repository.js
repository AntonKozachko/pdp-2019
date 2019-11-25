import { PostsMapper } from './posts-mapper';
import get from 'lodash/get';

export class PostsRepository {
  constructor(models) {
    this.models = models;
  }

  async exists(id) {
    const PostsModel = this.models.Posts;

    const result = await PostsModel.findOne({
      where: { _id: id },
    });

    return !!result;
  }

  async delete(document) {
    const PostsModel = this.models.Posts;

    return await PostsModel.deleteOne({
      where: { _id: document.id },
    });
  }

  async save(document, user) {
    const PostsModel = this.models.Posts;

    const documentId = get (document, 'id', '');
    const isExist = await this.exists(documentId);

    const rawData = PostsMapper.toPostPersistence(document, user);

    if (isExist) {
      const dbDoc = await PostsModel.findOne({
        where: { _id: documentId },
      });

      try {
        await dbDoc.update(rawData);
      } catch (e) {
        return Error(e);
      }
    } else {
      await PostsModel.create(rawData);
    }

    return document;
  }

  async findPostById(id) {
    const PostsModel = this.models.Posts;

    const post = await PostsModel.findOne({
      where: { _id: id },
    });

    return post;
  }

  async createPost()
}
