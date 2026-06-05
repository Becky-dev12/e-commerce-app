import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { label: 'Sign In', active: step1, path: '/login' },
    { label: 'Shipping', active: step2, path: '/shipping' },
    { label: 'Payment', active: step3, path: '/payment' },
    { label: 'Place Order', active: step4, path: '/placeorder' },
  ];

  return (
    <nav className="checkout-steps" aria-label="Checkout progress">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className={`checkout-step ${step.active ? 'active' : 'disabled'}`}
        >
          {step.active ? (
            <Link to={step.path}>{step.label}</Link>
          ) : (
            <span>{step.label}</span>
          )}
          {index < steps.length - 1 && <span className="step-divider">›</span>}
        </div>
      ))}
    </nav>
  );
};

export default CheckoutSteps;
