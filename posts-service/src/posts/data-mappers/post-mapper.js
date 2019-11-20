import get from 'lodash/get';

export class PostMapper {
  static toPostDto(post = {}, user = {}) {
    const voters = get(post, 'likes.voters', []);
    const { id: userId } = user;
    const voted = userId
      ? voters.some(id => id === userId)
      : false;

    const { _id, title, description,
      article, author, postCover = null, created,
    } = post;

    return {
      id: _id,
      title, description, article,
      author, postCover, created,
      likes: {
        count: voters.length,
        voted,
      },
    };
  }

  static toPostPersistance(post = {}, user = {}) {
    const { id: userId, firstname, lastname } = user;
    const authorName = `${firstname} ${lastname}`;

    const { likes, created, ...rest } = post;
    return {
      ...rest,
      author: { id: userId, name: authorName.trim() },
    }
  }
}