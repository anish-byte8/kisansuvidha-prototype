import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BigButton = ({ children, onClick, variant = 'primary', className, disabled }) => {
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-white text-green-800 border-2 border-green-600 hover:bg-green-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full py-4 px-6 rounded-2xl text-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className }) => (
  <div className={cn('bg-white p-5 rounded-3xl shadow-sm border border-gray-100', className)}>
    {children}
  </div>
);

export const Badge = ({ children, color = 'green' }) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
  };
  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', colors[color])}>
      {children}
    </span>
  );
};
