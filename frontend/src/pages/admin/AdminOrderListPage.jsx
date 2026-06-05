import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';
import { formatETB } from '../../utils/currency';

const AdminOrderListPage = () => {
  const { userInfo } = useAuth();
  const { addToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/orders', authHeaders);
      setOrders(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load orders', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deliverHandler = async (id) => {
    if (!window.confirm('Mark order as delivered?')) return;
    try {
      await axios.put(`/api/orders/${id}/deliver`, {}, authHeaders);
      addToast('Order marked as delivered', 'success');
      fetchOrders();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update order', 'error');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>All Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="admin-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td className="order-id-cell">{o._id.slice(-8)}</td>
                  <td>{o.user?.name || 'Deleted User'}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{formatETB(o.totalPrice)}</td>
                  <td>
                    {o.isPaid ? (
                      <span className="status-badge badge-success">
                        {new Date(o.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="status-badge badge-warning">No</span>
                    )}
                  </td>
                  <td>
                    {o.isDelivered ? (
                      <span className="status-badge badge-success">
                        {new Date(o.deliveredAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="status-badge badge-warning">No</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        to={`/order/${o._id}`}
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      >
                        Details
                      </Link>
                      {!o.isDelivered && (
                        <button
                          className="btn"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                          onClick={() => deliverHandler(o._id)}
                        >
                          Mark Delivered
                        </button>
                      )}
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

export default AdminOrderListPage;
