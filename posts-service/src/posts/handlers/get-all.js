import { BaseController } from '../../helpers/base-controller';
import { Posts } from '../models/post.model';
import logger from '../../libs/logger';
import { PostMapper } from '../data-mappers/post-mapper';

const log = logger.get('Get_Posts_Handler');

export class GestPostsHandler extends BaseController {
  async executeImpl () {
    try {
      const user = this.req.user;
      const posts = await Posts.find({}, null, { sort: { created: 'desc' }});

      const dto = posts.map(post => PostMapper.toPostDto(post, user));

      return this.success(dto);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
