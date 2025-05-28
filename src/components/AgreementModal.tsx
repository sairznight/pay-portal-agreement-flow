
import React, { useState, useRef } from 'react';
import { X, FileText, PenTool } from 'lucide-react';

interface AgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: () => void;
  paymentMethod: string;
  amount: string;
}

const AgreementModal: React.FC<AgreementModalProps> = ({
  isOpen,
  onClose,
  onSign,
  paymentMethod,
  amount,
}) => {
  const [signature, setSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignature('');
  };

  const handleSign = () => {
    if ((signature.trim() || canvasRef.current?.getContext('2d')) && agreedToTerms) {
      onSign();
    }
  };

  const agreementText = `
PAYMENT PROCESSING AGREEMENT

By signing this agreement, I acknowledge and agree to the following terms:

1. PAYMENT AUTHORIZATION
I authorize the processing of payment in the amount of $${amount} via ${paymentMethod}.

2. PAYMENT TERMS
- Payment will be processed immediately upon agreement signature
- All fees associated with the chosen payment method may apply
- Refunds are subject to our refund policy

3. SECURITY AND PRIVACY
- All payment information is processed securely
- Personal and financial data is protected according to industry standards
- We do not store sensitive payment information

4. DISPUTE RESOLUTION
- Any disputes regarding this payment must be reported within 30 days
- Disputes will be handled according to our dispute resolution policy

5. ACKNOWLEDGMENT
I confirm that:
- I am authorized to make this payment
- All information provided is accurate and complete
- I understand the terms and conditions of this transaction

Date: ${new Date().toLocaleDateString()}
Payment Method: ${paymentMethod}
Amount: $${amount}
  `;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Payment Agreement</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Agreement Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
              {agreementText}
            </pre>
          </div>

          {/* Signature Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PenTool className="w-5 h-5 mr-2" />
              Digital Signature
            </h3>
            
            {/* Text Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type your full name:
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full legal name"
              />
            </div>

            {/* Canvas Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or draw your signature:
              </label>
              <div className="border border-gray-300 rounded-md">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={150}
                  className="w-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              <button
                onClick={clearSignature}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Signature
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-700">
                I have read, understood, and agree to the terms and conditions outlined in this payment agreement.
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSign}
            disabled={(!signature.trim() && !canvasRef.current?.getContext('2d')) || !agreedToTerms}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sign Agreement & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementModal;
