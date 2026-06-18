import express from 'express';
import { getStats } from '../controllers/dashboardController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/stats', asyncHandler(protect), adminOnly, asyncHandler(getStats));

export default router;
