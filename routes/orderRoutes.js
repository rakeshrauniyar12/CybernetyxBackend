const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Add Order
router.post('/add', orderController.addOrder);

// Get Orders by User ID
router.get('/get/:userId', orderController.getOrderByUserId);
router.get('/get/:userId/:orderId', orderController.getOrderByUserAndOrderId);
router.get('/get/:userId/:orderId/:productId', orderController.getOrderByUserOrderAndProductId);
router.put('/return/:orderId', orderController.updateForReturnOrder);

// Get All Orders
router.get('/getall', orderController.getAllOrders);

// Update Order
router.patch('/update/:orderId', orderController.updateOrder);

module.exports = router;
