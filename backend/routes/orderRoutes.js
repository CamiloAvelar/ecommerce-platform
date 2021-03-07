import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getLoggedUserOders,
  getOders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOders);
router.route('/user').get(protect, getLoggedUserOders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
