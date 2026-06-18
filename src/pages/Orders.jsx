import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import api from '../services/api.js';

const statusClass = {
  Pending: 'bg-amber-50 text-amber-700',
  Processing: 'bg-blue-50 text-blue-700',
  Shipped: 'bg-indigo-50 text-indigo-700',
  Delivered: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-700',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load orders');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update order status');
    }
  };

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-ink">Orders</h2>
        <p className="text-sm text-slate-500">Review orders and update fulfillment status.</p>
      </div>
      <DataTable
        rows={orders}
        emptyText="No orders found."
        columns={[
          { key: 'customerName', label: 'Customer' },
          { key: 'products', label: 'Products', render: (row) => row.products.map((item) => item.name || item.product?.name || 'Product').join(', ') },
          { key: 'totalAmount', label: 'Total', render: (row) => `$${Number(row.totalAmount).toFixed(2)}` },
          {
            key: 'status',
            label: 'Status',
            render: (row) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[row.status]}`}>{row.status}</span>,
          },
        ]}
        renderActions={(row) => (
          <select
            value={row.status}
            onChange={(event) => updateStatus(row._id, event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          >
            {Object.keys(statusClass).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      />
      {error && <div className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</div>}
    </section>
  );
}
