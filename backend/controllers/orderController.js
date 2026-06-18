import Order from '../models/Order.js';

export async function getOrders(req, res) {
  const orders = await Order.find().populate('products.product', 'name price').sort({ createdAt: -1 });
  res.json(orders);
}

export async function updateOrderStatus(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status ?? order.status;
  await order.save();
  res.json(order);
}
