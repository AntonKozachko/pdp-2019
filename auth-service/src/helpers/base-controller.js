import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

export class BaseController {
/* eslint-disable-next-line */
  executeImpl () {
    return Promise.resolve();
  }

  async execute (req, res, next) {
    this.req = req;
    this.res = res;

    this.next = isFunction(next)
      ? next.bind(this)
      : () => {};

    try {
      await this.executeImpl();
    } catch (err) {
      next(err);
    }
  }

  jsonResponse (code, message) {
    return this.res.status(code).json({ message });
  }

  success (dto) {
    if (dto) {
      return this.res.status(200).json(dto);
    }
    return this.res.sendStatus(200);
  }

  created () {
    return this.res.sendStatus(201);
  }

  badRequest (message) {
    return this.jsonResponse(400, message || 'Bad Request');
  }

  unauthorized (message) {
    return this.jsonResponse(401, message || 'Unauthorized');
  }

  forbidden (message) {
    return this.jsonResponse(403, message || 'Forbidden');
  }

  notFound (message) {
    return this.jsonResponse(404, message || 'Not found');
  }

  fail (error) {
    return this.res.status(500).json({
      message: error.toString(),
    });
  }

  jwtError (err) {
    if (isString(err)) {
      return this.badRequest(err);
    }

    if (err.name === 'UnauthorizedError') {
      return this.badRequest('Invalid Token');
    }

    if (err.name === 'TokenExpiredError') {
      return this.unauthorized('Token expired');
    }

    return this.fail();
  }

  mongoError (err) {
    if (err.name === 'MongoError') {
      return this.fail('Mongo failed');
    }

    if (err.name === 'ValidationError') {
      // mongoose error
      // err.erros === invalidParams object
      return this.badRequest(err.message);
    }

    const errMsg = err.message || 'Mongoose failed';

    return this.badRequest(errMsg);
  }
}
