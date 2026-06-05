import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import { formatETB } from '../utils/currency';

const ProfilePage = () => {
  const { userInfo, setError: setAuthError } = useAuth();
  const { myOrders, getMyOrders, loading: ordersLoading } = useOrder();
  const { addToast } = useToast();

  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    getMyOrders();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setUpdateError('Passwords do not match');
      return;
    }
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const body = { name, email };
      if (password) body.password = password;

      const { data } = await axios.put('/api/users/profile', body, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      // Update localStorage with fresh token/name
      const updatedInfo = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
      addToast('Profile updated successfully', 'success');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setUpdateError(err.response?.data?.message || err.message);
    }
    setUpdateLoading(false);
  };

  return (
    <div className="profile-grid">
      {/* Update Profile */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>My Profile</h2>

        {updateError && <div className="alert alert-error">{updateError}</div>}

        <form
          onSubmit={submitHandler}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '2rem',
          }}
        >
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ width: '100%', padding: '0.9rem' }}
            disabled={updateLoading}
          >
            {updateLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Order History */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>My Orders</h2>

        {ordersLoading ? (
          <Loader />
        ) : myOrders.length === 0 ? (
          <div className="empty-orders">
            <p>You have no orders yet.</p>
            <Link to="/" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((o) => (
                  <tr key={o._id}>
                    <td className="order-id-cell">{o._id.slice(-8)}</td>
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
                      <Link to={`/order/${o._id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
