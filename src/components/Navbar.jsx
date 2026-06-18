import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
      <div>
        <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
        <p className="text-sm text-slate-500">Manage users, products, and orders</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-600 sm:inline">{user.name || 'Administrator'}</span>
        <button
          type="button"
          onClick={logout}
          className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
