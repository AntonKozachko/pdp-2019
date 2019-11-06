import { isString } from 'lodash';

export function jwtErrorHandler (err, req, res, next) {
  if (isString(err)) {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (err.name === 'TokenExpiredError') {
    // jwt token expired error
    return res.status(401).json({ message: 'Token expired' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
