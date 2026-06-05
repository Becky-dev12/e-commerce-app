import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';
import { formatETB } from '../../utils/currency';

const AdminProductListPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load products', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProductHandler = async () => {
    if (!window.confirm('Create a new sample product?')) return;
    setCreateLoading(true);
    try {
      const { data } = await axios.post('/api/products', {}, authHeaders);
      addToast('Product created', 'success');
      navigate(`/admin/product/${data._id}/edit`);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create product', 'error');
    }
    setCreateLoading(false);
  };

  const deleteProductHandler = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/products/${id}`, authHeaders);
      addToast('Product deleted', 'success');
      fetchProducts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Products</h1>
        <button className="btn" onClick={createProductHandler} disabled={createLoading}>
          {createLoading ? 'Creating...' : '+ Create Product'}
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="admin-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="order-id-cell">{p._id.slice(-8)}</td>
                  <td>{p.name}</td>
                  <td>{formatETB(p.price)}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>
                    <span className={`status-badge ${p.countInStock > 0 ? 'badge-success' : 'badge-warning'}`}>
                      {p.countInStock}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        to={`/admin/product/${p._id}/edit`}
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn-remove"
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px' }}
                        onClick={() => deleteProductHandler(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductListPage;
