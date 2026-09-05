import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/UI';
import { CheckCircle, AlertTriangle, IndianRupee, Clock } from 'lucide-react';

const Notifications = () => {
  const { t } = useLanguage();

  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Slot confirmed',
      message: 'Your procurement slot at Shivaji Nagar Centre is confirmed for 10:00 AM.',
      icon: <CheckCircle size={20} className="text-green-600" />,
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Queue Update',
      message: 'Your token A127 is approaching. Current tokens ahead: 3.',
      icon: <AlertTriangle size={20} className="text-yellow-600" />,
      time: '15 mins ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Procurement completed',
      message: 'Your wheat procurement has been recorded successfully.',
      icon: <CheckCircle size={20} className="text-green-600" />,
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment received',
      message: '₹24,850 has been credited to your linked bank account.',
      icon: <IndianRupee size={20} className="text-blue-600" />,
      time: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6 pb-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('notifications')}</h1>
        <p className="text-gray-600">Updates regarding your procurement</p>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((n) => (
          <Card key={n.id} className="flex gap-4 items-start">
            <div className="p-3 bg-gray-50 rounded-full shrink-0">
              {n.icon}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{n.title}</h3>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{n.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
