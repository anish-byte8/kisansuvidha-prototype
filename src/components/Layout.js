import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Calendar, User, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

const Layout = ({ children }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: t('home') },
    { path: '/centres', icon: MapPin, label: t('centres') },
    { path: '/booking', icon: Calendar, label: t('myBooking') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="p-6 mb-8">
          <h1 className="text-2xl font-black text-green-800">KisanSuvidha</h1>
          <p className="text-xs text-green-600 font-medium italic">"Your Crop Deserves Less Waiting."</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all",
                  isActive ? "bg-green-600 text-white shadow-md" : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
          >
            <User size={20} />
            <span>{t('profile')}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header (Mobile and Desktop) */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="md:hidden">
            <h1 className="text-xl font-black text-green-800">KisanSuvidha</h1>
          </div>
          <div className="hidden md:block">
             <span className="text-gray-500 font-medium">Welcome to the Procurement Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="p-2 bg-gray-100 rounded-full relative hover:bg-gray-200 transition-colors">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </Link>
            <Link to="/profile" className="md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <User size={20} className="text-gray-700" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center safe-area-bottom z-20">
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
      </div>
    </div>
  );
};

export default Layout;
