import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation();

  const keyword = new URLSearchParams(search).get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = keyword ? `/api/products?keyword=${encodeURIComponent(keyword)}` : '/api/products';
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Make sure the backend is running.');
      }
      setLoading(false);
    };

    fetchProducts();
  }, [keyword]);

  return (
    <>
      {keyword ? (
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>Results for "{keyword}"</h1>
          <Link to="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            Clear
          </Link>
        </div>
      ) : (
        <h1 style={{ marginBottom: '2rem' }}>Latest Products</h1>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : products.length === 0 ? (
        <div className="alert alert-info">No products found for "{keyword}".</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
