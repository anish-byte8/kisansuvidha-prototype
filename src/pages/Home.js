import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card, Badge } from '../components/UI';
import { Bell, Calendar, MapPin, CreditCard, ClipboardList } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock current state: Farmer has a booking for Wheat
  const currentBooking = {
    crop: 'Wheat',
    centre: 'Shivaji Nagar Procurement Centre',
    time: 'Today, 10:30 AM',
    token: 'A127',
    waitTime: '35 minutes'
  };

  return (
    <div className="min-h-screen bg-orange-50 pb-24 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('namaste')}, Ramesh</h1>
          <p className="text-gray-600">Welcome to KisanSuvidha</p>
        </div>
        <button className="p-3 bg-white rounded-full shadow-sm relative border border-gray-100" onClick={() => navigate('/notifications')}>
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>

      {/* Current Booking Card */}
      {currentBooking && (
        <Card className="bg-green-600 text-white border-none shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">{t('nextProcurement')}</h2>
            <Badge color="blue" className="bg-green-500 text-white border-none">Active</Badge>
          </div>
          <div className="space-y-1 mb-6">
            <p className="text-3xl font-black">{currentBooking.crop}</p>
            <p className="text-lg opacity-90 flex items-center gap-2">
              <MapPin size={18} /> {currentBooking.centre}
            </p>
            <p className="text-lg opacity-90 flex items-center gap-2">
              <Calendar size={18} /> {currentBooking.time}
            </p>
            <p className="text-2xl font-bold mt-2">Token: {currentBooking.token}</p>
          </div>
          <div className="bg-green-700 p-4 rounded-2xl flex justify-between items-center">
            <span className="font-medium">{t('estimatedWait')}:</span>
            <span className="text-2xl font-black">{currentBooking.waitTime}</span>
          </div>
          <BigButton
            onClick={() => navigate('/queue')}
            variant="secondary"
            className="mt-6 bg-white text-green-700 hover:bg-gray-100"
          >
            {t('trackQueue')}
          </BigButton>
        </Card>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/centres')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 text-center cursor-pointer active:scale-95 transition-transform hover:shadow-md"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <MapPin size={32} />
          </div>
          <span className="font-bold text-gray-800">{t('centres')}</span>
        </div>
        <div
          onClick={() => navigate('/booking')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 text-center cursor-pointer active:scale-95 transition-transform hover:shadow-md"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <Calendar size={32} />
          </div>
          <span className="font-bold text-gray-800">{t('bookSlot')}</span>
        </div>
        <div
          onClick={() => navigate('/status')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 text-center cursor-pointer active:scale-95 transition-transform hover:shadow-md"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <ClipboardList size={32} />
          </div>
          <span className="font-bold text-gray-800">{t('myProcurement')}</span>
        </div>
        <div
          onClick={() => navigate('/payment')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 text-center cursor-pointer active:scale-95 transition-transform hover:shadow-md"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <CreditCard size={32} />
          </div>
          <span className="font-bold text-gray-800">{t('paymentStatus')}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
