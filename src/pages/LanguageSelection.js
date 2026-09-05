import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton } from '../components/UI';

const LanguageSelection = () => {
  const { setLang } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'hi', label: 'Hindi', native: 'हिंदी' },
    { id: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const handleLanguageSelect = (langId) => {
    setLang(langId);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-green-800 mb-2">KisanSuvidha</h1>
        <p className="text-xl text-green-700 font-medium italic">"Your Crop Deserves Less Waiting."</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Choose your language / अपनी भाषा चुनें / तुमची भाषा निवडा</h2>

        <div className="grid grid-cols-1 gap-4">
          {languages.map((lang) => (
            <BigButton
              key={lang.id}
              onClick={() => handleLanguageSelect(lang.id)}
              variant="secondary"
              className="py-8 text-2xl"
            >
              {lang.native}
            </BigButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
