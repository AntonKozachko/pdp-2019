import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';

const log = logger.get('Get_Posts_Handler');

export class GetPostsHandler extends BaseController {
  constructor(repo) {
    super();
    this.postsRepo = repo;
  }

  async executeImpl () {
    try {
      const user = this.req.user;

      const dto = await this.postsRepo.getAll(user);


      return this.success(dto);
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
