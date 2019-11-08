import expressJwt from 'express-jwt';
import jwtLib from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

import logger from '../libs/logger';
const config = require('../config.json');

const log = logger.get('JWT', { ignoreLogLevel: true });

// public routes that doesn't require authentication
const publicRoutes = [
  '/user/authenticate',
  '/user/verify',
  '/user',
  /favicon.ico/,
  /\/api-docs*/,
];

export function jwt () {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: publicRoutes,
  });
}

export function getUserId(req, res, next) {
  const { headers: { authorization = '' } } = req;

  const token = authorization.replace('Bearer ', '');

  if (isEmpty(token)) {
    return next();
  }

  jwtLib.verify(token, config.secret, (err, decoded) => {
    if (err) {
      log.error(err);
      return next();
    }

    req.userId = decoded.sub;

    return next();
  });
}
