import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import { formatETB } from '../utils/currency';

const OrderPage = () => {
  const { id } = useParams();
  const { getOrderById, payOrder, order, loading, error } = useOrder();
  const { addToast } = useToast();
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    if (!order || order._id !== id) {
      getOrderById(id);
    }
  }, [id]);

  const simulatePaymentHandler = async () => {
    setPayLoading(true);
    const paymentResult = {
      id: `SIM_${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      payer: { email_address: order?.user?.email || 'customer@example.com' },
    };
    const updated = await payOrder(order._id, paymentResult);
    setPayLoading(false);
    if (updated) addToast('Payment successful!', 'success');
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!order) return null;

  const {
    orderItems, shippingAddress, paymentMethod,
    itemsPrice, shippingPrice, taxPrice, totalPrice,
    isPaid, paidAt, isDelivered, deliveredAt, user,
  } = order;

  return (
    <div>
      <h1 style={{ margin: '1.5rem 0 0.5rem' }}>Order Details</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', fontFamily: 'monospace' }}>
        #{order._id}
      </p>

      <div className="placeorder-grid">
        <div className="placeorder-details">
          <div className="order-section">
            <h2>Shipping</h2>
            {user && (
              <p><strong>Name:</strong> {user.name} &nbsp;|&nbsp;
                <strong>Email:</strong>{' '}
                <a href={`mailto:${user.email}`} style={{ color: 'var(--primary)' }}>{user.email}</a>
              </p>
            )}
            <p>
              <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            <div className={`status-badge ${isDelivered ? 'badge-success' : 'badge-warning'}`}>
              {isDelivered ? `✓ Delivered on ${new Date(deliveredAt).toLocaleDateString()}` : '⏳ Not Delivered'}
            </div>
          </div>

          <div className="order-section">
            <h2>Payment Method</h2>
            <p><strong>{paymentMethod}</strong></p>
            <div className={`status-badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
              {isPaid ? `✓ Paid on ${new Date(paidAt).toLocaleDateString()}` : '⏳ Awaiting Payment'}
            </div>
          </div>

          <div className="order-section">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {orderItems.map((item) => (
                <div key={item.product} className="order-item-row">
                  <img src={item.image} alt={item.name} className="order-item-img" />
                  <Link to={`/product/${item.product}`} className="order-item-name">{item.name}</Link>
                  <span className="order-item-calc">
                    {item.qty} × {formatETB(item.price)} = {formatETB(item.qty * item.price)}
                  </span>
                </div>
              ))}
            </div>
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
            <span>{Number(shippingPrice) === 0 ? <span style={{ color: '#10b981' }}>Free</span> : formatETB(shippingPrice)}</span>
          </div>
          <div className="summary-row">
            <span>VAT (15%)</span>
            <span>{formatETB(taxPrice)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatETB(totalPrice)}</span>
          </div>

          {!isPaid && (
            <button
              className="btn"
              style={{ width: '100%', padding: '1rem', marginTop: '1.5rem' }}
              onClick={simulatePaymentHandler}
              disabled={payLoading}
            >
              {payLoading ? <Loader size={20} /> : `Pay with ${paymentMethod}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
