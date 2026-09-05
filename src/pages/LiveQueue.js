import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BigButton, Card, Badge } from '../components/UI';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const LiveQueue = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [servingToken, setServingToken] = useState(118);
  const [myToken] = useState(127);
  const [showAlert, setShowAlert] = useState(false);

  const tokensAhead = myToken - servingToken;
  const estimatedWait = tokensAhead * 4; // 4 mins per token mock

  const simulateNextToken = () => {
    setServingToken(prev => prev + 1);
  };

  useEffect(() => {
    if (tokensAhead <= 3 && tokensAhead > 0) {
      setShowAlert(true);
    } else if (tokensAhead <= 0) {
      setShowAlert(false);
    }
  }, [tokensAhead]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900">{t('trackQueue')}</h1>
        <p className="text-gray-600">Live status for your booking</p>
      </div>

      {showAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-2xl flex items-start gap-3 animate-bounce">
          <AlertCircle className="text-yellow-600 shrink-0" size={24} />
          <p className="text-yellow-800 font-bold">{t('yourTurnApproaching')}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center space-y-1 py-6">
          <p className="text-gray-500 text-sm font-medium">{t('yourToken')}</p>
          <p className="text-4xl font-black text-green-700">A{myToken}</p>
        </Card>
        <Card className="text-center space-y-1 py-6">
          <p className="text-gray-500 text-sm font-medium">{t('nowServing')}</p>
          <p className="text-4xl font-black text-orange-600">A{servingToken}</p>
        </Card>
      </div>

      <Card className="text-center space-y-2 py-8">
        <p className="text-gray-500 font-medium">{t('tokensAhead')}: <span className="text-3xl font-bold text-gray-900">{tokensAhead}</span></p>
        <p className="text-gray-500 font-medium">{t('estimatedWait')}: <span className="text-3xl font-bold text-gray-900">~{estimatedWait} min</span></p>
      </Card>

      {/* Queue Visualization */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-700 ml-2">{t('currentQueue')}</h3>
        <div className="flex flex-col gap-2 max-w-md mx-auto">
          {[...Array(15)].map((_, i) => {
            const tokenNum = servingToken + i;
            const isServing = tokenNum === servingToken;
            const isMe = tokenNum === myToken;

            if (tokenNum > myToken + 5) return null;

            return (
              <div
                key={tokenNum}
                className={cn(
                  "flex justify-between items-center p-4 rounded-2xl transition-all",
                  isServing ? "bg-orange-500 text-white scale-105 shadow-md" :
                  isMe ? "bg-green-600 text-white ring-4 ring-green-200" : "bg-white text-gray-700"
                )}
              >
                <span className="font-bold text-lg">A{tokenNum}</span>
                {isServing && <span className="text-sm font-black uppercase tracking-wider">Serving Now</span>}
                {isMe && <span className="text-sm font-black uppercase tracking-wider">You</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-8 text-center">
        <BigButton
          variant="secondary"
          onClick={simulateNextToken}
          className="max-w-md mx-auto border-dashed border-4"
        >
          {t('simulateNext')}
        </BigButton>
        <p className="text-xs text-gray-400 mt-2 italic">Demo only: simulate queue movement</p>
      </div>
    </div>
  );
};

export default LiveQueue;
