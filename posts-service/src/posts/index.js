import express from 'express';

import { verifyUser } from '../middlewares/verify-user';

const router = express.Router();

// routes
router.get('', verifyUser, (req, res) => res.json('OK'));

export const postsRouter = router;
