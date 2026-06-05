import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';

const AdminUserListPage = () => {
  const { userInfo } = useAuth();
  const { addToast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/users', authHeaders);
      setUsers(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load users', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserHandler = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/users/${id}`, authHeaders);
      addToast('User deleted', 'success');
      fetchUsers();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Users</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="admin-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="order-id-cell">{u._id.slice(-8)}</td>
                  <td>{u.name}</td>
                  <td>
                    <a href={`mailto:${u.email}`} style={{ color: 'var(--primary)' }}>
                      {u.email}
                    </a>
                  </td>
                  <td>
                    {u.isAdmin ? (
                      <span className="status-badge badge-success">Yes</span>
                    ) : (
                      <span className="status-badge badge-warning">No</span>
                    )}
                  </td>
                  <td>
                    {!u.isAdmin && (
                      <button
                        className="btn-remove"
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px' }}
                        onClick={() => deleteUserHandler(u._id)}
                      >
                        Delete
                      </button>
                    )}
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

export default AdminUserListPage;
