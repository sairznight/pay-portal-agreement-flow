
import React, { useState } from 'react';
import { CreditCard, Building2, Send, Smartphone, DollarSign, Globe } from 'lucide-react';
import PaymentMethodCard from '../components/PaymentMethodCard';
import AgreementModal from '../components/AgreementModal';

const Index = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [amount, setAmount] = useState('');

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: Building2,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'wise',
      name: 'Wise',
      description: 'International money transfer',
      icon: Globe,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      description: 'Digital wallet payment',
      icon: Smartphone,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      description: 'Fast bank-to-bank transfer',
      icon: Send,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    {
      id: 'payoneer',
      name: 'Payoneer',
      description: 'Global payment platform',
      icon: DollarSign,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    }
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleProceedToAgreement = () => {
    if (selectedPayment && amount) {
      setShowAgreement(true);
    }
  };

  const handleAgreementSigned = () => {
    setAgreementSigned(true);
    setShowAgreement(false);
    // Here you would typically proceed with the actual payment processing
    console.log('Agreement signed, proceeding with payment:', {
      method: selectedPayment,
      amount: amount
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secure Payment Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred payment method and complete your transaction securely
          </p>
        </div>

        {/* Payment Amount */}
        <div className="max-w-md mx-auto mb-8">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Select Payment Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isSelected={selectedPayment === method.id}
                onSelect={handlePaymentSelect}
              />
            ))}
          </div>
        </div>

        {/* Selected Payment Summary */}
        {selectedPayment && amount && (
          <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold">
                  {paymentMethods.find(m => m.id === selectedPayment)?.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <div className="text-center">
          <button
            onClick={handleProceedToAgreement}
            disabled={!selectedPayment || !amount || parseFloat(amount) <= 0}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            Proceed to Agreement
          </button>
        </div>

        {/* Success Message */}
        {agreementSigned && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Agreement signed successfully!</span>
            </div>
          </div>
        )}
      </div>

      {/* Agreement Modal */}
      <AgreementModal
        isOpen={showAgreement}
        onClose={() => setShowAgreement(false)}
        onSign={handleAgreementSigned}
        paymentMethod={paymentMethods.find(m => m.id === selectedPayment)?.name || ''}
        amount={amount}
      />
    </div>
  );
};

export default Index;
