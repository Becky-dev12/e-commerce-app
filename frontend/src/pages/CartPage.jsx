import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatETB } from '../utils/currency';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, cartTotalPrice, cartItemsCount } = useCart();
  const { userInfo } = useAuth();

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Your cart is empty.</p>
          <Link to="/" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <Link to={`/product/${item._id}`}>
                    <div className="cart-item-title">{item.name}</div>
                  </Link>
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-price">{formatETB(item.price)}</div>
                </div>
                <div className="cart-item-actions">
                  <select
                    className="qty-select"
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    aria-label={`Quantity for ${item.name}`}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item._id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
              {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in cart
            </p>
            <div className="summary-row summary-total">
              <span>Subtotal:</span>
              <span>{formatETB(cartTotalPrice)}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>
              Shipping and taxes calculated at checkout
            </p>
            <button
              type="button"
              className="btn"
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout →
            </button>
            <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
