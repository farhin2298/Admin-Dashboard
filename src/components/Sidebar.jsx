import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
];

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-5">
        <p className="text-lg font-bold text-ink">Admin Panel</p>
        <p className="text-sm text-slate-500">Operations console</p>
      </div>
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
