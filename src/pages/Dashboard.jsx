import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import api from '../services/api.js';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-ink">Overview</h2>
        <p className="text-sm text-slate-500">Current totals across your admin system.</p>
      </div>
      {error && <div className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Users" value={loading ? '...' : stats.totalUsers} accent="bg-blue-500" />
        <StatCard label="Total Products" value={loading ? '...' : stats.totalProducts} accent="bg-emerald-500" />
        <StatCard label="Total Orders" value={loading ? '...' : stats.totalOrders} accent="bg-amber-500" />
      </div>
    </section>
  );
}
