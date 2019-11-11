import express from 'express';

import { ParseTokenMiddleware } from '../middlewares/verify-token';
import {
  VerifyTokenHandler,
  RegisterHandler,
  AuthenticateHandler,
  GetUsersHandler,
  UpdateUserHandler,
  DeleteHandler,
} from './handlers';

const router = express.Router();

const verifyTokenHandler = new VerifyTokenHandler();
const registerHandler = new RegisterHandler();
const authenticateHandler = new AuthenticateHandler();
const getUsersHandler = new GetUsersHandler();
const updateHandler = new UpdateUserHandler();
const deleteHandler = new DeleteHandler();

// routes
router.post('/authenticate', (req, res, next) => authenticateHandler.execute(req, res, next));
router.post('/verify', (req, res, next) => verifyTokenHandler.execute(req, res, next));
router.get('/all', ParseTokenMiddleware.verify, (req, res, next) => getUsersHandler.execute(req, res, next));
router.put('/', ParseTokenMiddleware.verify, (req, res, next) => updateHandler.execute(req, res, next));
router.post('/', (req, res, next) => registerHandler.execute(req, res, next));
router.delete('/', ParseTokenMiddleware.verify, (req, res, next) => deleteHandler.execute(req, res, next));

export const userRouter = router;
