const Order = require("../model/Order"); // Assuming you have the Order model in models/Order.js

const User = require("../model/User"); // Ensure correct path

const addOrder = async (req, res) => {
  try {
    console.log(req.body);
    const orderData = req.body;

    // Step 1: Create and save the new order
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Step 2: Find the user and update their orders array
    const user = await User.findById(orderData.userOrderId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Add the new order's _id to the user's orders array
    user.orders.push(newOrder._id);
    await user.save();

    // Step 4: Send response
    res.status(201).json({
      message: "Order added successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding order",
      error: error.message,
    });
  }
};

// 2. Get orders by user ID
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    let orders = await Order.find({ userOrderId: userId })
      .populate("items.productId")
      .populate("addressId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Filter out items that are either returned or canceled
    orders = orders
      .map((order) => {
        order.items = order.items.filter(
          (item) =>
            !item.returnDetails.isReturned && !item.cancelDetails.isCancel
        );
        return order;
      })
      .filter((order) => order.items.length > 0); // Remove orders with no active items

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No active orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

const getOrderByUserAndOrderId = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    let order = await Order.findOne({ userOrderId: userId, _id: orderId })
      .populate("items.productId")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    // Filter out items that are either returned or canceled
    order.items = order.items.filter(
      (item) => !item.returnDetails.isReturned && !item.cancelDetails.isCancel
    );

    if (order.items.length === 0) {
      return res.status(404).json({ message: "No active items in this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

const getOrderByUserOrderAndProductId = async (req, res) => {
  try {
    const { userId, orderId, productId } = req.params;

    let order = await Order.findOne({ userOrderId: userId, _id: orderId })
      .populate("items.productId")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    // Find the specific product in the order
    const productItem = order.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!productItem) {
      return res
        .status(404)
        .json({ message: "Product not found in this order" });
    }

    // Check if the product is returned or canceled
    if (
      productItem.returnDetails.isReturned ||
      productItem.cancelDetails.isCancel
    ) {
      return res
        .status(404)
        .json({ message: "This product is either returned or canceled" });
    }

    res.status(200).json(productItem);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order details",
      error: error.message,
    });
  }
};

// 3. Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .populate("addressId")
      .populate("user");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all orders",
      error: error.message,
    });
  }
};

// 4. Update order (supports updating one or more fields)
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

const updateForReturnOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, returnReason, userId } = req.body;
    console.log("Order Id", orderId);
    console.log("Order Body", req.body);
    // Find the order associated with the userId
    const order = await Order.findOne({ _id: orderId, userOrderId: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    // Find the item in the order
    const itemIndex = order.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in this order" });
    }

    // Check if the item is already returned
    if (order.items[itemIndex].returnDetails.isReturned) {
      return res
        .status(400)
        .json({ message: "Item has already been returned" });
    }

    // Update return details
    order.items[itemIndex].returnDetails = {
      isReturned: true,
      returnReason,
      returnDate: new Date(),
      refundProcessed: false, // Assume refund is not yet processed
      returnAmount: order.items[itemIndex].productPrice, // Set refund amount to product price
    };

    // Save the updated order
    await order.save();

    res.status(200).json({
      message: "Return initiated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing return request",
      error: error.message,
    });
  }
};

const getReturnOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the given user where at least one item is returned
    const orders = await Order.find({
      userOrderId: userId,
      "items.returnDetails.isReturned": true,
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No return orders found" });
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching return orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCancelOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the given user where at least one item is cancelled
    const orders = await Order.find({
      userOrderId: userId,
      "items.cancelDetails.isCancel": true,
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No cancelled orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching cancelled orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addOrder,
  getOrderByUserId,
  getAllOrders,
  updateOrder,
  getOrderByUserAndOrderId,
  getOrderByUserOrderAndProductId,
  updateForReturnOrder,
  getReturnOrdersByUserId,
  getCancelOrdersByUserId,
};
