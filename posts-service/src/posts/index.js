import express from 'express';

import {
  GetPostsHandler,
  CreatePostHandler,
  LikePostHandler,
  RemovePostHandler,
} from './handlers';
import { Posts } from './models/post.model';
import { PostsRepository } from './repository/posts-repository';
import { verifyUser } from '../middlewares/verify-user';

const router = express.Router();
router.use(verifyUser);

const PostsRepo = new PostsRepository({ Posts });

// routes
router.get('', (req, res, next) => new GetPostsHandler(PostsRepo).execute(req, res, next));
router.post('', (req, res, next) => new CreatePostHandler(PostsRepo).execute(req, res, next));
router.patch('', (req, res, next) => new LikePostHandler(PostsRepo).execute(req, res, next));
router.delete('', (req, res, next) => new RemovePostHandler(PostsRepo).execute(req, res, next));

export const postsRouter = router;
