import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { formatETB } from '../utils/currency';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { createOrder, loading, error } = useOrder();
  const { addToast } = useToast();

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || 'null');
  const paymentMethod = localStorage.getItem('paymentMethod') || 'Telebirr';

  useEffect(() => {
    if (!shippingAddress) navigate('/shipping');
    if (!paymentMethod) navigate('/payment');
  }, []);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 150;
  const taxPrice = Number((itemsPrice * 0.15).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const placeOrderHandler = async () => {
    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    const createdOrder = await createOrder(orderData);
    if (createdOrder) {
      clearCart();
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      addToast('Order placed successfully!', 'success');
      navigate(`/order/${createdOrder._id}`);
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 style={{ margin: '2rem 0 1.5rem' }}>Place Order</h1>

      {error && <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <div className="placeorder-grid">
        <div className="placeorder-details">
          <div className="order-section">
            <h2>Shipping Address</h2>
            <p>
              {shippingAddress?.address}, {shippingAddress?.city},{' '}
              {shippingAddress?.postalCode}, {shippingAddress?.country}
            </p>
          </div>

          <div className="order-section">
            <h2>Payment Method</h2>
            <p><strong>{paymentMethod}</strong></p>
          </div>

          <div className="order-section">
            <h2>Order Items</h2>
            {cartItems.length === 0 ? (
              <p className="empty-msg">Your cart is empty. <Link to="/">Go Back</Link></p>
            ) : (
              <div className="order-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="order-item-row">
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <Link to={`/product/${item._id}`} className="order-item-name">{item.name}</Link>
                    <span className="order-item-calc">
                      {item.qty} × {formatETB(item.price)} = {formatETB(item.qty * item.price)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="cart-summary">
          <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{formatETB(itemsPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingPrice === 0 ? <span style={{ color: '#10b981' }}>Free</span> : formatETB(shippingPrice)}</span>
          </div>
          <div className="summary-row">
            <span>VAT (15%)</span>
            <span>{formatETB(taxPrice)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatETB(totalPrice)}</span>
          </div>
          {shippingPrice === 0 && (
            <p style={{ fontSize: '0.8rem', color: '#10b981', margin: '0.5rem 0' }}>
              ✓ Free delivery on orders above ETB 5,000
            </p>
          )}
          <button
            type="button"
            className="btn"
            style={{ width: '100%', padding: '1rem', marginTop: '1.5rem' }}
            disabled={cartItems.length === 0 || loading}
            onClick={placeOrderHandler}
          >
            {loading ? <Loader size={20} /> : 'Confirm & Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
