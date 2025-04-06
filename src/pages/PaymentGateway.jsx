import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

const PaymentGateway = ({ billData }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    // Simulate payment processing
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard /> },
    { id: 'upi', name: 'UPI', icon: <Smartphone /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet /> },
  ];

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-[#3A506B] mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your payment.</p>
          <p className="font-semibold mt-4">Amount Paid: ₹{billData?.total}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#3A506B] mb-6">Payment Details</h2>
        
        <div className="mb-6">
          <p className="text-lg font-semibold">Amount to Pay: ₹{billData?.total}</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? 'border-[#3A506B] bg-[#F4EBDC]'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                <div className="flex items-center space-x-3">
                  {method.icon}
                  <span>{method.name}</span>
                </div>
              </label>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="input-field"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="UPI ID"
                className="input-field"
                required
              />
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="space-y-4">
              <select className="input-field" required>
                <option value="">Select Wallet</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="gpay">Google Pay</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={!paymentMethod || paymentStatus === 'processing'}
            className={`w-full bg-[#3A506B] text-white py-3 px-4 rounded-md transition-colors ${
              !paymentMethod || paymentStatus === 'processing'
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-90'
            }`}
          >
            {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;