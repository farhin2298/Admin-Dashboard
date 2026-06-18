import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(asyncHandler(protect), adminOnly);
router.get('/', asyncHandler(getOrders));
router.put('/:id', asyncHandler(updateOrderStatus));

export default router;
