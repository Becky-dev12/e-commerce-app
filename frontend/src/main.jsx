import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ToastProvider } from './context/ToastContext';

// Set the live backend URL globally for all files and components
axios.defaults.baseURL = 'https://e-commerce-app-6gef.onrender.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
