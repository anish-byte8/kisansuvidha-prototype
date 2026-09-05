import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card } from '../components/UI';
import { CheckCircle, QrCode } from 'lucide-react';

const Confirmation = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <CheckCircle size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-green-800">{t('slotConfirmed')}</h1>

        <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-300 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">{t('tokenNumber')}</span>
            <span className="text-3xl font-black text-green-700">A127</span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="text-left space-y-2">
            <p className="text-sm text-gray-500">{t('centreName')}</p>
            <p className="font-bold text-lg">Shivaji Nagar Procurement Centre</p>
            <p className="text-sm text-gray-500 mt-2">{t('date')}</p>
            <p className="font-bold text-lg">5 September 2026</p>
            <p className="text-sm text-gray-500 mt-2">{t('time')}</p>
            <p className="font-bold text-lg">10:00 AM – 11:00 AM</p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            <QrCode size={120} className="text-gray-800" />
          </div>
        </div>

        <p className="text-gray-600 font-medium px-4">
          "Please reach the centre during your scheduled slot."
        </p>

        <BigButton onClick={() => navigate('/queue')}>
          {t('trackQueue')}
        </BigButton>
      </Card>
    </div>
  );
};

export default Confirmation;
