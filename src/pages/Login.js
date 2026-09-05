import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card } from '../components/UI';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep('otp');
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      navigate('/home');
    } else {
      alert('Please enter the 4-digit OTP');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-800">KisanSuvidha</h1>
          <p className="text-gray-600 font-medium">{step === 'phone' ? 'Login to your account' : 'Verify your identity'}</p>
        </div>

        <div className="space-y-6">
          {step === 'phone' ? (
            <>
              <div className="text-left space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">{t('home')} / Mobile Number</label>
                <input
                  type="tel"
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 text-xl focus:border-green-500 outline-none"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <BigButton onClick={handlePhoneSubmit}>
                {t('sendOtp')}
              </BigButton>
            </>
          ) : (
            <>
              <div className="text-left space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">{t('enterOtp')}</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-3xl tracking-widest focus:border-green-500 outline-none"
                  placeholder="1234"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <BigButton onClick={handleOtpSubmit}>
                {t('continue')}
              </BigButton>
              <button
                onClick={() => setStep('phone')}
                className="text-green-600 font-bold text-lg"
              >
                Change Number
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Login;
