import { BaseController } from '../../helpers/base-controller';
import { Posts } from '../models/post.model';
import logger from '../../libs/logger';
import { PostMapper } from '../data-mappers/post-mapper';

const log = logger.get('Create_Post_Handler');

export class CreatePostHandler extends BaseController {
  async executeImpl () {
    const { user, body } = this.req;

    if (!user) {
      return this.unauthorized('Please login to create post');
    }

    try {
      const model = PostMapper.toPostPersistance(body, user);
      const NewPost = new Posts(model);

      await NewPost.save();

      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
