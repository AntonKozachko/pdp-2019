import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import logger from './libs/logger';

import { requestLoggerMiddleware } from './libs/middlewares';

import { postsRouter } from './posts';
import { connectUsersDb } from './helpers/mongo-connection';
import { loadFixtures } from './helpers/fixture-loader';

import swaggerDocument from './swagger.json';

process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
process.env.MODE = process.env.MODE || 'isolated';
process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || '27017';
process.env.AUTH_PORT = process.env.AUTH_PORT || '8000';
process.env.AUTH_HOST = process.env.AUTH_HOST || 'localhost';

const log = logger.get('POSTS-SVC', { ignoreLogLevel: true });

let server;
const port = process.env.POSTS_PORT || 9010;

log.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
log.info(`[BUILD_ENV = ${process.env.BUILD_ENV}]`);
log.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
log.info(`[POSTS_PORT = ${process.env.POSTS_PORT}]`);
log.info(`[AUTH_URL = ${process.env.AUTH_HOST}:${process.env.AUTH_PORT}]`);
log.info(`[MONGO_URL = ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}]`);
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
if (process.env.BUILD_ENV !== 'production') app.use(requestLoggerMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
// todo: use api/v1 base path
app.use('/posts', postsRouter);

// swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.MODE === 'normal') {
  log.info('Connecting db...');

  connectUsersDb()
    .then(() => log.info('Db connected'))
    .then(() => loadFixtures())
    .catch((err) => log.error(err));
}

server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClosing);
