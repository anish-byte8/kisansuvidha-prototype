import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card } from '../components/UI';
import { LogOut, Globe, HelpCircle, User } from 'lucide-react';

const Profile = () => {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी' },
    { id: 'mr', label: 'मराठी' },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6 pb-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('profile')}</h1>
        <p className="text-gray-600">Your account details</p>
      </div>

      <Card className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <User size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ramesh Kumar</h2>
          <p className="text-gray-500">Mobile: +91 98765 43210</p>
          <p className="text-gray-500">Village: Pipariya, MP</p>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 ml-1">{t('changeLanguage')}</h3>
        <div className="grid grid-cols-1 gap-3">
          {languages.map((l) => (
            <BigButton
              key={l.id}
              variant={lang === l.id ? 'primary' : 'secondary'}
              onClick={() => setLang(l.id)}
            >
              {l.label}
            </BigButton>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <BigButton variant="secondary" onClick={() => navigate('/help')} className="flex items-center justify-center gap-2">
          <HelpCircle size={20} /> {t('help')}
        </BigButton>
        <BigButton variant="danger" onClick={() => navigate('/login')} className="flex items-center justify-center gap-2">
          <LogOut size={20} /> {t('logout')}
        </BigButton>
      </div>
    </div>
  );
};

export default Profile;
