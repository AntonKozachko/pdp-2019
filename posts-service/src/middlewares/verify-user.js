import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import logger from '../libs/logger';

const log = logger.get('Verify_User_Middleware');

export async function verifyUser (req, res, next) {
  const { authorization = '' } = req.headers;

  const verifyUrl = `http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/user/verify`;

  log.info(`Verify User token: ${req.headers.authorization}`);

  try {
    const { data: user } = await axios.post(verifyUrl, null, {
      headers: { 'Authorization': authorization },
    });

    if(!isEmpty(user)) {
      req.user = user;
    }
  } catch (err) {
    const errMsg = get(err, 'response.data.message', err);
    log.error(errMsg);
  }

  next();
}
