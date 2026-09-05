import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card, BigButton, Badge } from '../components/UI';
import { MapPin, Clock, Users } from 'lucide-react';
import { cn } from '../utils/cn';

const Centres = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCentre, setSelectedCentre] = useState(null);

  const mockCentres = [
    {
      id: 1,
      name: 'Shivaji Nagar Procurement Centre',
      distance: '2.4 km',
      status: 'low',
      farmers: 42,
      waitTime: '35 min'
    },
    {
      id: 2,
      name: 'APMC Main Centre',
      distance: '4.8 km',
      status: 'moderate',
      farmers: 78,
      waitTime: '1 hr 20 min'
    },
    {
      id: 3,
      name: 'Taluka Grain Centre',
      distance: '6.1 km',
      status: 'available',
      farmers: 24,
      waitTime: '20 min'
    }
  ];

  const getStatusDetails = (status) => {
    switch (status) {
      case 'low': return { label: t('lowWaiting'), color: 'green' };
      case 'moderate': return { label: t('moderateWaiting'), color: 'yellow' };
      case 'available': return { label: t('available'), color: 'green' };
      default: return { label: 'Unknown', color: 'blue' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('centres')}</h1>
        <p className="text-gray-600">Find the nearest procurement centre</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Area - Desktop: Fixed size, Mobile: Full width */}
        <div className="lg:w-1/2 h-64 lg:h-[600px] bg-gray-200 rounded-3xl relative overflow-hidden border-2 border-white shadow-sm sticky top-24">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium italic">
            [Interactive Map Area]
          </div>
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            Current Location: On
          </div>
        </div>

        {/* Centres List */}
        <div className="lg:w-1/2 space-y-4">
          {mockCentres.map((centre) => {
            const status = getStatusDetails(centre.status);
            const isSelected = selectedCentre === centre.id;

            return (
              <Card
                key={centre.id}
                className={cn(
                  "cursor-pointer transition-all border-2",
                  isSelected ? "border-green-600 bg-green-50" : "border-transparent"
                )}
                onClick={() => setSelectedCentre(centre.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{centre.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin size={14} /> {centre.distance}
                    </div>
                  </div>
                  <Badge color={status.color}>{status.label}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} className="text-green-600" />
                    <span className="text-sm font-medium">{centre.farmers} {t('currentQueue')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} className="text-green-600" />
                    <span className="text-sm font-medium">~{centre.waitTime} {t('waitEstimate')}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedCentre && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 animate-in slide-in-from-bottom duration-300 z-20">
          <BigButton onClick={() => navigate('/booking')}>
            {t('bookSlot')}
          </BigButton>
        </div>
      )}
    </div>
  );
};

export default Centres;
