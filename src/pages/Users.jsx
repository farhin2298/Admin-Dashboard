import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import api from '../services/api.js';

const blankUser = { name: '', email: '', password: '', role: 'user' };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(blankUser);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openForm = (user = null) => {
    setEditing(user);
    setForm(user ? { name: user.name, email: user.email, password: '', role: user.role } : blankUser);
    setIsOpen(true);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(blankUser);
    setIsOpen(false);
  };

  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (editing && !payload.password) delete payload.password;
    try {
      if (editing) await api.put(`/users/${editing._id}`, payload);
      else await api.post('/users', payload);
      closeForm();
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save user');
    }
  };

  const remove = async (id) => {
    if (confirm('Delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        await loadUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to delete user');
      }
    }
  };

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink">Users</h2>
          <p className="text-sm text-slate-500">Create and maintain administrator accounts.</p>
        </div>
        <button onClick={() => openForm()} className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Add User
        </button>
      </div>
      <DataTable
        rows={users}
        emptyText="No users found."
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'createdAt', label: 'Created', render: (row) => new Date(row.createdAt).toLocaleDateString() },
        ]}
        renderActions={(row) => (
          <div className="space-x-2">
            <button onClick={() => openForm(row)} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">
              Edit
            </button>
            <button onClick={() => remove(row._id)} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700">
              Delete
            </button>
          </div>
        )}
      />
      {error && <div className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</div>}
      {isOpen && (
        <UserModal
          title={editing ? 'Edit User' : 'Add User'}
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSubmit={save}
          editing={Boolean(editing)}
        />
      )}
    </section>
  );
}

function UserModal({ title, form, setForm, onClose, onSubmit, editing }) {
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <Field
          label={editing ? 'Password (optional)' : 'Password'}
          type="password"
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          required={!editing}
        />
        <label>
          <span className="mb-1 block text-sm font-medium text-slate-700">Role</span>
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div className="sm:col-span-2">
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save User</button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <label>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-md border border-slate-300 px-3 py-2" />
    </label>
  );
}
