import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [order, setOrder] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  });

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/orders', orderData, getAuthHeaders());
      setOrder(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      return null;
    }
  };

  const getOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/orders/${id}`, getAuthHeaders());
      setOrder(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      return null;
    }
  };

  const payOrder = async (orderId, paymentResult) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        getAuthHeaders()
      );
      setOrder(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      return null;
    }
  };

  const getMyOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/api/orders/myorders/list', getAuthHeaders());
      setMyOrders(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      return [];
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        myOrders,
        loading,
        error,
        createOrder,
        getOrderById,
        payOrder,
        getMyOrders,
        setError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
