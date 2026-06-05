import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (err) {
        addToast('Failed to load product', 'error');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      await axios.put(
        `/api/products/${id}`,
        { name, price: Number(price), image, brand, category, countInStock: Number(countInStock), description },
        authHeaders
      );
      addToast('Product updated successfully', 'success');
      navigate('/admin/products');
    } catch (err) {
      addToast(err.response?.data?.message || 'Update failed', 'error');
    }
    setSaveLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <Link to="/admin/products" className="btn btn-secondary" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        ← Back to Products
      </Link>
      <div className="form-page-wrapper" style={{ maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Edit Product</h1>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input className="form-input" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input className="form-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            {image && (
              <img
                src={image}
                alt="preview"
                style={{ marginTop: '0.75rem', width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: 'var(--radius)' }}
              />
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input className="form-input" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input className="form-input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Count In Stock</label>
            <input className="form-input" type="number" min="0" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', padding: '0.9rem' }} disabled={saveLoading}>
            {saveLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEditPage;
