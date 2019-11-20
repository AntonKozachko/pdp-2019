import express from 'express';

import {
  GestPostsHandler,
  CreatePostHandler,
} from './handlers';
import { verifyUser } from '../middlewares/verify-user';

const router = express.Router();
router.use(verifyUser);

// routes
router.get('', (req, res, next) => new GestPostsHandler().execute(req, res, next));
router.post('', (req, res, next) => new CreatePostHandler().execute(req, res, next));

export const postsRouter = router;
