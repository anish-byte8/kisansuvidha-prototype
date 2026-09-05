import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, BigButton } from '../components/UI';
import { ChevronRight } from 'lucide-react';

const Help = () => {
  const { t } = useLanguage();

  const faqs = [
    { q: t('howToBook'), a: 'Select a centre from the "Find Centre" tab, choose your crop and slot, and confirm.' },
    { q: t('howToTrack'), a: 'Go to "My Booking" or "Home" and click "Track My Queue" to see your live token status.' },
    { q: t('paymentMeaning'), a: 'Pending: Payment is being processed. Paid: Money has been sent to your bank.' },
    { q: 'Centre is closed / unavailable', a: 'Please check the operating hours or select another nearby centre.' },
    { q: t('contactSupport'), a: 'Call our toll-free number 1800-XXX-XXXX or visit the District Office.' },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6 pb-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('help')}</h1>
        <p className="text-gray-600">How can we help you today?</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center gap-4">
              <p className="font-bold text-gray-800 text-lg">{faq.q}</p>
              <ChevronRight className="text-gray-400 shrink-0" />
            </div>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {faq.a}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Help;
