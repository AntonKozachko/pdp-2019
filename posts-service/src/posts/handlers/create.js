import { BaseController } from '../../helpers/base-controller';
import { Posts } from '../models/post.model';
import logger from '../../libs/logger';

const log = logger.get('Create_Post_Handler');

export class CreatePostHandler extends BaseController {
  async executeImpl () {
    const { user, body } = this.req;

    if (!user) {
      return this.unauthorized('Please login to create post');
    }

    try {
      const author = this.createAuthor(user);
      const NewPost = new Posts({ ...body, author });

      await NewPost.save();

      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }

  createAuthor(user) {
    const { id, firstname, lastname } = user;
    log.info(user);
    const name = `${firstname} ${lastname}`.trim();

    return { id, name };
  }
}
