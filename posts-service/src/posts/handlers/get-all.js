import { BaseController } from '../../helpers/base-controller';
import { Posts } from '../models/post.model';
import logger from '../../libs/logger';

const log = logger.get('Get_Posts_Handler');

export class GestPostsHandler extends BaseController {
  async executeImpl() {
    try {
      const posts = await Posts.find({});

      return this.success(posts);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
