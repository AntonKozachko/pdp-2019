/* eslint-disable */
import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';
import _ from 'lodash';

import $pkg from '../../package.json';

const loggers = {};

/**
 * req processing
 * @param {object} req
 * @return {{method, url, headers}}
 */
function reqSerializer (req) {
  const headers = _.pick(req.headers, ['host', 'user-agent', 'x-real-ip']);

  const res = {
    method: req.method,
    url: req.url,
    headers,
  };

  if (!_.isEmpty(req.query)) {
    res.query = req.query;
  }
  if (!_.isEmpty(req.params)) {
    res.params = req.params;
  }
  if (!_.isEmpty(req.body)) {
    res.body = req.body;
  }

  return res;
}

/**
 * res processing
 * @param {object} res
 * @return {{statusCode: (*|number|Number), headers, body: *}}
 */
function resSerializer (res) {
  const headers = _.pick(res._headers, ['content-length', 'content-type']);

  return {
    statusCode: res.statusCode,
    headers,
    body: res.body,
  };
}

/**
 * err preprocessing
 * @param {object} err
 * @return {*}
 */
function errSerializer (err) {
  if (!_.isObject(err)) {
    return err;
  }

  let resErr = err.name || 'Error';
  resErr += ': ';
  if (_.has(err, 'message') && err.message) {
    resErr += err.message;
  }
  if (_.has(err, 'body.errors.base') && _.isArray(err.body.errors.base)) {
    resErr += err.body.errors.base.join(', ');
  }

  resErr = {
    code: err.code,
    message: resErr,
  };

  if (_.has(err, 'stack') && err.code > 404) {
    resErr.stack = err.stack;
  }

  return resErr;
}

const defaultOpts = {
  name: $pkg.name,
  level: 'error',
  serializers: {
    req: reqSerializer,
    res: resSerializer,
  },
};

/**
 * Apply format to logger
 * @param {object} opts
 * @return {Object|*}
 */
function applyFormat (opts) {
  if (!_.includes(
    ['development', 'test', 'production'],
    process.env.NODE_ENV,
  )) return;

  const formatOut = bunyanFormat({ outputMode: 'short' });
  const logLevel = opts.ignoreLogLevel ? 'info' : process.env.LOG_LEVEL;
  const streams = [];

  streams.push({ stream: formatOut });

  opts = _.extend(opts, {
    streams,
    level: logLevel,
    serializers: _.extend(defaultOpts.serializers, {
      err: errSerializer,
    }),
  });

  return opts;
}

/**
 * Create logger instance
 * @param {string} name
 * @param {object} opts
 * @return {*}
 */
function createLogger (name, opts) {
  opts = _.defaults(opts, defaultOpts);
  opts.name = name;
  applyFormat(opts);
  return bunyan.createLogger(_.omit(opts, ['ignoreLogLevel', 'client']));
}

/**
 * get existed logger instance
 * @param {string} name
 * @param {object} opts - { ignoreEnv }
 * @return {*}
 */
function getLogger (name, opts) {
  opts = _.defaults(opts, {
    ignoreLogLevel: false,
  });

  if (!name) {
    name = $pkg.name;
  }
  if (loggers[name]) {
    return loggers[name];
  }

  const newLogger = createLogger(name, opts);
  loggers[name] = newLogger;
  return newLogger;
}

export default { get: getLogger };
