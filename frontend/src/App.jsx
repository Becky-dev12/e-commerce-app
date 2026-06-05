import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Checkout flow
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';

// User pages
import ProfilePage from './pages/ProfilePage';

// Admin pages
import AdminProductListPage from './pages/admin/AdminProductListPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminOrderListPage from './pages/admin/AdminOrderListPage';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected – logged in users */}
            <Route path="/shipping" element={<ProtectedRoute><ShippingPage /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="/placeorder" element={<ProtectedRoute><PlaceOrderPage /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Protected – admins only */}
            <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProductListPage /></ProtectedRoute>} />
            <Route path="/admin/product/:id/edit" element={<ProtectedRoute adminOnly><AdminProductEditPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUserListPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrderListPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
