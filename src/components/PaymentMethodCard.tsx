
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (paymentId: string) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  isSelected,
  onSelect,
}) => {
  const { id, name, description, icon: Icon, color, hoverColor } = method;

  return (
    <div
      onClick={() => onSelect(id)}
      className={`
        relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} ${hoverColor} transition-colors duration-200 mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Processing Indicator */}
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
        Secure Processing
      </div>
    </div>
  );
};

export default PaymentMethodCard;
