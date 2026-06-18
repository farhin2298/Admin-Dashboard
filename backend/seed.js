import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function seed() {
  await connectDB();
  await Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany()]);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  });

  const products = await Product.insertMany([
    { name: 'Wireless Keyboard', category: 'Accessories', price: 79, stock: 34, description: 'Compact mechanical keyboard.' },
    { name: 'USB-C Monitor', category: 'Displays', price: 399, stock: 12, description: '27 inch productivity monitor.' },
    { name: 'Desk Dock', category: 'Accessories', price: 149, stock: 20, description: 'Multi-port laptop dock.' },
  ]);

  await Order.insertMany([
    {
      customerName: 'Jordan Lee',
      products: [{ product: products[0]._id, name: products[0].name, quantity: 1, price: products[0].price }],
      totalAmount: products[0].price,
      status: 'Processing',
    },
    {
      customerName: 'Morgan Smith',
      products: [{ product: products[1]._id, name: products[1].name, quantity: 2, price: products[1].price }],
      totalAmount: products[1].price * 2,
      status: 'Pending',
    },
  ]);

  console.log(`Seeded admin ${admin.email} with sample products and orders`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
