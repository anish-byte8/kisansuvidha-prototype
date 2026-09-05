import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card } from '../components/UI';
import { Calendar, MapPin, CreditCard, ClipboardList, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const { t, setLang, lang } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी' },
    { id: 'mr', label: 'मराठी' },
  ];

  const features = [
    {
      title: t('featureBookSlot'),
      desc: t('featureBookSlotDesc'),
      icon: <Calendar className="text-green-600" size={32} />,
    },
    {
      title: t('featureTrackQueue'),
      desc: t('featureTrackQueueDesc'),
      icon: <ClipboardList className="text-green-600" size={32} />,
    },
    {
      title: t('featureFindCentres'),
      desc: t('featureFindCentresDesc'),
      icon: <MapPin className="text-green-600" size={32} />,
    },
    {
      title: t('featureTrackPayment'),
      desc: t('featureTrackPaymentDesc'),
      icon: <CreditCard className="text-green-600" size={32} />,
    },
  ];

  const steps = [
    { label: t('stepRegister') },
    { label: t('stepBook') },
    { label: t('stepReach') },
    { label: t('stepTrack') },
  ];

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900 overflow-x-hidden">
      {/* Header / Language Selector */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="text-2xl font-black text-green-800">KisanSuvidha</div>
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                lang === l.id ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black text-green-900 leading-tight">
            {t('landingHeroTitle')}
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-green-700 italic">
            {t('landingHeroTagline')}
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('landingHeroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <BigButton
              onClick={() => navigate('/select-language')}
              className="px-12 py-6 text-2xl shadow-xl hover:shadow-green-200"
            >
              {t('landingGetStarted')}
            </BigButton>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl font-bold text-gray-600 hover:bg-white/50 transition-all"
            >
              {t('landingHowItWorks')}
            </button>
          </div>
        </div>

        {/* Hero Visual Placeholder */}
        <div className="mt-16 relative max-w-4xl w-full aspect-video bg-green-100 rounded-[3rem] shadow-inner border-8 border-white flex items-center justify-center overflow-hidden animate-in fade-in zoom-in duration-1000" style={{ animationDelay: '0.5s' }}>
           <div className="text-center space-y-4">
              <div className="text-6xl">🌾🚜🌽</div>
              <p className="text-green-800 font-bold italic opacity-60">Agricultural Visual / Illustration</p>
           </div>
           {/* Subtle floating decorations */}
           <div className="absolute top-10 left-10 animate-bounce" style={{ animationDuration: '3s' }}>🍃</div>
           <div className="absolute bottom-10 right-10 animate-bounce" style={{ animationDuration: '4s' }}>🍂</div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">{t('landingFeaturesTitle')}</h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                className="group hover:-translate-y-2 transition-all duration-300 border-none shadow-sm hover:shadow-xl bg-white p-8 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-4 bg-green-50 rounded-3xl group-hover:bg-green-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">{t('landingStepsTitle')}</h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-200 -translate-y-1/2 z-0"></div>

            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 group w-full md:w-auto">
                <div className="w-16 h-16 bg-white border-4 border-green-600 text-green-600 rounded-full flex items-center justify-center text-2xl font-black shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  {i + 1}
                </div>
                <p className="font-bold text-gray-800 max-w-[150px]">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 px-6 bg-green-900 text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            {t('landingTrustTitle')}
          </h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed">
            {t('landingTrustDesc')}
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          {t('landingFinalCta')}
        </h2>
        <BigButton
          onClick={() => navigate('/select-language')}
          className="max-w-md mx-auto px-12 py-6 text-2xl shadow-2xl hover:shadow-green-200"
        >
          {t('landingGetStarted')}
        </BigButton>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        © 2026 KisanSuvidha. Designed for the Farmers of India.
      </footer>
    </div>
  );
};

import { cn } from '../utils/cn';

export default LandingPage;
