import { Link } from 'react-router-dom';
import { formatETB } from '../utils/currency';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </Link>

      <div className="product-info">
        {/* Category pill */}
        <span className="product-category">{product.category}</span>

        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {/* Star rating */}
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">({product.numReviews})</span>
        </div>

        <div className="product-card-footer">
          <div className="product-price">{formatETB(product.price)}</div>
          <span className={`stock-pill ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

/** Render filled / half / empty star icons */
function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }
  return stars;
}

export default Product;
