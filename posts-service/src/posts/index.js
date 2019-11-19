import express from 'express';

import { verifyUser } from '../middlewares/verify-user';
import { GestPostsHandler } from './handlers';

const router = express.Router();

// routes
router.get('', (req, res, next) => new GestPostsHandler().execute(req, res, next));

export const postsRouter = router;
