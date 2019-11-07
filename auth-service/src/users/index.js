import express from 'express';

import usersHandlers from './handlers';
import { getUserId } from '../helpers/jwt';

const router = express.Router();

// routes
router.post('/authenticate', usersHandlers.authenticate);
router.post('/verify', usersHandlers.verify);
router.get('/all', getUserId, usersHandlers.getUsers);
router.post('/create', usersHandlers.createUser);

export const userRouter = router;
