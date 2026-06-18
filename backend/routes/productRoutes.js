import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(asyncHandler(protect), adminOnly);
router.route('/').get(asyncHandler(getProducts)).post(asyncHandler(createProduct));
router.route('/:id').put(asyncHandler(updateProduct)).delete(asyncHandler(deleteProduct));

export default router;
