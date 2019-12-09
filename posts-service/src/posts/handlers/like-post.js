import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';

const log = logger.get('Like_Post_Handler');

export class LikePostHandler extends BaseController {
  constructor (repo) {
    super();
    this.postsRepo = repo;
  }

  async executeImpl () {
    const { user, body } = this.req;

    if (!user) {
      return this.unauthorized('Only authorized user could like post');
    }

    try {
      await this.postsRepo.likePost(body.id, user);
      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
