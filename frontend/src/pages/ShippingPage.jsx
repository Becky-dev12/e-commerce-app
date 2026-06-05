import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const navigate = useNavigate();

  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');

  const [address, setAddress] = useState(savedAddress.address || '');
  const [city, setCity] = useState(savedAddress.city || '');
  const [postalCode, setPostalCode] = useState(savedAddress.postalCode || '');
  const [country, setCountry] = useState(savedAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingAddress = { address, city, postalCode, country };
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    navigate('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form-page-wrapper">
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Shipping Address</h1>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Postal Code</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', padding: '0.9rem' }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
