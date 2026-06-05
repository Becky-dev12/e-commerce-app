import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();

  // Redirect to shipping if no address saved
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || 'null');
  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem('paymentMethod') || 'Telebirr'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form-page-wrapper">
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Payment Method</h1>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label" style={{ marginBottom: '1rem' }}>
              Select Method
            </label>

            <div className="radio-group">
              {['Telebirr', 'CBE Birr', 'Awash Bank', 'Amole', 'Cash on Delivery'].map((method) => (
                <label key={method} className="radio-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="radio-input"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn" style={{ width: '100%', padding: '0.9rem' }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
