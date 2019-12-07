import get from 'lodash/get';

import logger from '../../libs/logger';

const log = logger.get('Posts_Mapper');

export class PostsMapper {
  static toPostDto(post = {}, user = {}) {
    const likes = get(post, 'likes', []);
    const likesCount = likes.length;
    const { id: userId } = user;
    const voted = userId
      ? likes.some(id => id === userId)
      : false;

    const { _id, title, description,
      article, author, postCover = null, created,
    } = post;

    return {
      id: _id,
      title, description, article,
      author, postCover, created,
      likes: {
        count: likesCount,
        voted,
      },
    };
  }

  static toPostPersistence(post = {}, user = {}) {
    const { id: userId, firstname, lastname } = user;
    const authorName = `${firstname} ${lastname}`;

    const { likes, created, ...rest } = post;
    return {
      ...rest,
      author: { id: userId, name: authorName.trim() },
    }
  }
}
