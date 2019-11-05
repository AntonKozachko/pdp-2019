import express from 'express'

import usersHandlers from './handlers'

const router = express.Router()

// routes
router.post('/authenticate', usersHandlers.authenticate)
router.post('/verify', usersHandlers.verify)
router.get('/all', usersHandlers.getUsers)

export const userRouter = router
