import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/UI';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const ProcurementStatus = () => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, label: t('slotBooked'), status: 'completed' },
    { id: 2, label: t('reachedCentre'), status: 'completed' },
    { id: 3, label: t('tokenCalled'), status: 'current' },
    { id: 4, label: t('qualityCheck'), status: 'pending' },
    { id: 5, label: t('procurementCompleted'), status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6 pb-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('procurementStatus')}</h1>
        <p className="text-gray-600">Tracking your crop procurement</p>
      </div>

      <Card className="py-8">
        <div className="relative space-y-8">
          {/* Connector Line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200" />

          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4 relative z-10">
              <div className="bg-orange-50 p-1">
                {step.status === 'completed' ? (
                  <CheckCircle className="text-green-600" size={28} />
                ) : step.status === 'current' ? (
                  <Clock className="text-orange-500 animate-pulse" size={28} />
                ) : (
                  <Circle className="text-gray-300" size={28} />
                )}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-lg font-bold",
                  step.status === 'completed' ? "text-green-700" :
                  step.status === 'current' ? "text-gray-900" : "text-gray-400"
                )}>
                  {step.label}
                </p>
                {step.status === 'current' && (
                  <p className="text-sm text-gray-500">Happening right now...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
        <p className="text-blue-800 text-sm font-medium text-center">
          Need help? Contact the centre admin at the help desk.
        </p>
      </div>
    </div>
  );
};

import { cn } from '../utils/cn';

export default ProcurementStatus;
