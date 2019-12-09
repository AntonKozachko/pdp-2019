import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';

const log = logger.get('Create_Post_Handler');

export class CreatePostHandler extends BaseController {
  constructor (repo) {
    super();
    this.postsRepo = repo;
  }

  async executeImpl () {
    const { user, body } = this.req;

    if (!user) {
      return this.unauthorized('Please login to create post');
    }

    try {
      await this.postsRepo.save(body, user);
      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
