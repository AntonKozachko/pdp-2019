import logger from '../libs/logger';

const log = logger.get('Verify_User_Middleware');

export function verifyUser (req, res, next) {
  const { headers: { authorization = '' } } = req;

  log.info(`User token: ${authorization}`);

  // todo: call to auth service to verify token
  next();
}
