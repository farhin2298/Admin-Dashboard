import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export async function getStats(req, res) {
  const [totalUsers, totalProducts, totalOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
  ]);

  res.json({ totalUsers, totalProducts, totalOrders });
}
