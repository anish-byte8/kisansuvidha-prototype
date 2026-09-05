import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, Badge } from '../components/UI';
import { CreditCard, Calendar, FileText } from 'lucide-react';

const PaymentStatus = () => {
  const { t } = useLanguage();

  // Mock payment data
  const payment = {
    status: 'Paid', // Pending, Processing, Paid
    amount: '₹24,850',
    crop: 'Wheat',
    quantity: '48 quintals',
    procurementDate: '5 September 2026',
    paymentDate: '6 September 2026',
    transactionId: 'KS202609051278'
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return <Badge color="green">{t('paid')}</Badge>;
      case 'Processing': return <Badge color="yellow">{t('processing')}</Badge>;
      case 'Pending': return <Badge color="red">{t('pending')}</Badge>;
      default: return <Badge color="blue">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 pb-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('paymentStatus')}</h1>
        <p className="text-gray-600">Payment details for your crop</p>
      </div>

      <Card className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <CreditCard size={48} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-500 font-medium">Status</p>
          <div className="flex justify-center">{getStatusBadge(payment.status)}</div>
        </div>

        <div className="text-5xl font-black text-gray-900">
          {payment.amount}
        </div>

        <div className="grid grid-cols-1 gap-4 text-left pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <FileText size={16} /> {t('crop')}
            </span>
            <span className="font-bold">{payment.crop}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <FileText size={16} /> Quantity
            </span>
            <span className="font-bold">{payment.quantity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <Calendar size={16} /> Procurement Date
            </span>
            <span className="font-bold">{payment.procurementDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <Calendar size={16} /> Payment Date
            </span>
            <span className="font-bold">{payment.paymentDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <FileText size={16} /> Transaction ID
            </span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{payment.transactionId}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentStatus;
