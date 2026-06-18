import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(asyncHandler(protect), adminOnly);
router.route('/').get(asyncHandler(getUsers)).post(asyncHandler(createUser));
router.route('/:id').put(asyncHandler(updateUser)).delete(asyncHandler(deleteUser));

export default router;
