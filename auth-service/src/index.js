import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import logger from './libs/logger';

import { requestLoggerMiddleware } from './libs/middlewares';

import { jwt } from './helpers/jwt';
import { jwtErrorHandler } from './helpers/error-handler';

import { userRouter } from './users';
import { connectUsersDb } from './helpers/mongo-connection';
import { loadFixtures } from './helpers/fixture-loader';

import swaggerDocument from './swagger.json';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
process.env.MODE = process.env.MODE || 'isolated';
process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || '27017';

const log = logger.get('AUTH-SVC', { ignoreLogLevel: true });

let server;
const port = process.env.AUTH_PORT || 9000;

log.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
log.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
log.info(`[AUTH_PORT = ${process.env.AUTH_PORT}]`);
log.info(`[MODE = ${process.env.MODE}]`);

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      log.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening () {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  log.info(`Listening on ${bind}`);
}

function onClosing () {
  log.info('Server stopped');
}

const app = express();
app.set('port', port);
if (process.env.NODE_ENV !== 'production') app.use(requestLoggerMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
// todo: use api/v1 base path
app.use('/user', userRouter);

// global error handler
app.use(jwtErrorHandler);

// swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRouter);

if (process.env.MODE === 'normal') {
  log.info('Connecting db...');

  connectUsersDb()
    .then(() => log.info(`Db connected on port ${process.env.MONGO_PORT}`))
    .then(() => loadFixtures())
    .then(() => log.info('Load fixtures complete'))
    .catch((err) => log.error(err));
}

server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClosing);
