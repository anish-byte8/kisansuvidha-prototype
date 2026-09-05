import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card } from '../components/UI';
import { CheckCircle } from 'lucide-react';

const Booking = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    crop: '',
    date: '',
    time: '',
    centre: 'Shivaji Nagar Procurement Centre'
  });

  const crops = ['Wheat', 'Paddy/Rice', 'Soybean', 'Maize'];
  const dates = ['5 Sep', '6 Sep', '7 Sep', '8 Sep'];
  const slots = [
    { time: '09:00 AM – 10:00 AM', available: 12, status: 'available' },
    { time: '10:00 AM – 11:00 AM', available: 6, status: 'almost-full' },
    { time: '11:00 AM – 12:00 PM', available: 0, status: 'full' },
    { time: '12:00 PM – 01:00 PM', available: 9, status: 'available' },
  ];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const confirmBooking = () => {
    navigate('/confirmation');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('bookSlot')}</h1>
        <p className="text-gray-600">Step {step} of 4</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">{t('selectCrop')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {crops.map((crop) => (
                  <BigButton
                    key={crop}
                    variant={bookingData.crop === crop ? 'primary' : 'secondary'}
                    onClick={() => setBookingData({...bookingData, crop})}
                  >
                    {crop}
                  </BigButton>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">{t('selectDate')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {dates.map((date) => (
                  <BigButton
                    key={date}
                    variant={bookingData.date === date ? 'primary' : 'secondary'}
                    onClick={() => setBookingData({...bookingData, date})}
                  >
                    {date}
                  </BigButton>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">{t('selectTime')}</h2>
              <div className="space-y-3">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={slot.status === 'full'}
                    onClick={() => setBookingData({...bookingData, time: slot.time})}
                    className={`w-full p-4 rounded-2xl text-left flex justify-between items-center border-2 transition-all ${
                      bookingData.time === slot.time
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 bg-white'
                    } ${slot.status === 'full' ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div>
                      <p className="font-bold text-lg">{slot.time}</p>
                      <p className="text-sm text-gray-500">
                        {slot.available} {slot.available === 0 ? 'slots' : 'slots available'}
                      </p>
                    </div>
                    {slot.status === 'full' ? (
                      <span className="text-red-500 font-bold text-sm">{t('full')}</span>
                    ) : (
                      <span className="text-green-600 font-bold text-sm">
                        {slot.status === 'almost-full' ? 'Almost Full' : 'Available'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Confirm Booking</h2>
              <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('crop')}:</span>
                  <span className="font-bold">{bookingData.crop || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('centreName')}:</span>
                  <span className="font-bold text-right">{bookingData.centre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('date')}:</span>
                  <span className="font-bold">{bookingData.date || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('time')}:</span>
                  <span className="font-bold">{bookingData.time || 'Not selected'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            {step > 1 && (
              <BigButton variant="secondary" onClick={handlePrev}>
                Back
              </BigButton>
            )}
            {step < 4 ? (
              <BigButton
                disabled={
                  (step === 1 && !bookingData.crop) ||
                  (step === 2 && !bookingData.date) ||
                  (step === 3 && !bookingData.time)
                }
                onClick={handleNext}
              >
                {t('continue')}
              </BigButton>
            ) : (
              <BigButton onClick={confirmBooking}>
                {t('confirmSlot')}
              </BigButton>
            )}
          </div>
        </Card>

        {/* Desktop Summary Sidebar */}
        <div className="hidden lg:block w-80 space-y-4">
          <Card className="bg-green-50 border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('crop')}</span>
                <span className="font-bold">{bookingData.crop || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('centreName')}</span>
                <span className="font-bold text-right">{bookingData.centre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('date')}</span>
                <span className="font-bold">{bookingData.date || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('time')}</span>
                <span className="font-bold">{bookingData.time || '-'}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
