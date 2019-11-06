import expressJwt from 'express-jwt';

const config = require('../config.json');

// public routes that don't require authentication
const publicRoutes = [
  '/user/authenticate',
  '/user/verify',
  /favicon.ico/,
  /\/api-docs*/,
];

export function jwt () {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: publicRoutes,
  });
}
