import express from 'express';
import {
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  paymentVerification,
  placeOrder,
  placeOrderonline,
  processOrder,
} from '../controllers/order.js';
import { authrizeAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/createorder', isAuthenticated, placeOrder);

router.post('/createorderonline', isAuthenticated, placeOrderonline);

router.post('/paymentverification', isAuthenticated, paymentVerification);

router.get('/myOrder', isAuthenticated, getMyOrders);

router.get('/order/:id', isAuthenticated, getOrderDetails);

router.get('/admin/orders', isAuthenticated, authrizeAdmin, getAdminOrders);

router.get('/admin/order/:id', isAuthenticated, authrizeAdmin, processOrder);

export default router;
