import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import { formatETB } from '../utils/currency';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    addToast(`${product.name} added to cart`, 'success');
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!product) return null;

  return (
    <>
      <Link className="btn btn-secondary" to="/" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        ← Go Back
      </Link>

      <div className="product-details">
        {/* Image */}
        <div className="details-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="details-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <span className="details-category-pill">{product.category}</span>
        </div>

        {/* Info */}
        <div className="details-info">
          <p className="details-brand">Brand: <strong>{product.brand}</strong></p>
          <h1>{product.name}</h1>

          {/* Rating */}
          <div className="details-rating">
            {renderStars(product.rating)}
            <span className="details-rating-text">
              {product.rating} out of 5 &nbsp;·&nbsp; {product.numReviews} reviews
            </span>
          </div>

          <div className="details-price">{formatETB(product.price)}</div>
          <p className="details-desc">{product.description}</p>

          {/* Stock */}
          <div className={`stock-status ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.countInStock > 0 ? `✓ In Stock (${product.countInStock} left)` : '✗ Out of Stock'}
          </div>

          {/* Qty selector */}
          {product.countInStock > 0 && (
            <div className="qty-row">
              <span>Quantity:</span>
              <select
                className="qty-select"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                aria-label="Select quantity"
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Total for selected qty */}
          {product.countInStock > 0 && qty > 1 && (
            <p className="qty-total-hint">
              Total for {qty}: <strong>{formatETB(product.price * qty)}</strong>
            </p>
          )}

          <button
            className="btn"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
          >
            {product.countInStock === 0 ? 'Out of Stock' : '🛒 Add To Cart'}
          </button>
        </div>
      </div>
    </>
  );
};

function renderStars(rating) {
  return (
    <span className="stars" style={{ fontSize: '1.2rem' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${rating >= i ? 'filled' : rating >= i - 0.5 ? 'half' : 'empty'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default ProductPage;
