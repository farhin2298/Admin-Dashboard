import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import api from '../services/api.js';

const blankProduct = { name: '', category: '', price: '', stock: '', description: '' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(blankProduct);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openForm = (product = null) => {
    setEditing(product);
    setForm(product ? { ...product, price: product.price.toString(), stock: product.stock.toString() } : blankProduct);
    setIsOpen(true);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(blankProduct);
    setIsOpen(false);
  };

  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editing) await api.put(`/products/${editing._id}`, payload);
      else await api.post('/products', payload);
      closeForm();
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save product');
    }
  };

  const remove = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        await loadProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to delete product');
      }
    }
  };

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink">Products</h2>
          <p className="text-sm text-slate-500">Manage catalog inventory and pricing.</p>
        </div>
        <button onClick={() => openForm()} className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Add Product
        </button>
      </div>
      <DataTable
        rows={products}
        emptyText="No products found."
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          { key: 'price', label: 'Price', render: (row) => `$${Number(row.price).toFixed(2)}` },
          { key: 'stock', label: 'Stock' },
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
        <ProductModal
          title={editing ? 'Edit Product' : 'Add Product'}
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSubmit={save}
        />
      )}
    </section>
  );
}

function ProductModal({ title, form, setForm, onClose, onSubmit }) {
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
        <Field label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} required />
        <Field label="Price" type="number" value={form.price} onChange={(value) => setForm({ ...form, price: value })} required />
        <Field label="Stock" type="number" value={form.stock} onChange={(value) => setForm({ ...form, stock: value })} required />
        <label className="sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </label>
        <div className="sm:col-span-2">
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save Product</button>
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
