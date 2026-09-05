import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Calendar, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn'; // I'll define cn if not available or just use a simple function

const BottomNav = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: t('home') },
    { path: '/centres', icon: MapPin, label: t('centres') },
    { path: '/booking', icon: Calendar, label: t('myBooking') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center safe-area-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-green-600" : "text-gray-500"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
