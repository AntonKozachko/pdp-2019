import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

import { BaseController } from '../../helpers/base-controller';
import logger from '../../libs/logger';

const log = logger.get('Remove_Post_Handler');

export class RemovePostHandler extends BaseController {
  constructor (repo) {
    super();
    this.postsRepo = repo;
  }

  async executeImpl () {
    const { user, query: { id } } = this.req;

    if (!user) {
      return this.unauthorized('Please login to delete post');
    }

    if (isEmpty(id) || !isString(id)) {
      return this.badRequest();
    }

    try {
      await this.postsRepo.delete({ id }, user);

      return this.created();
    } catch (err) {
      log.error(err);
      return this.mongoError(err);
    }
  }
}
