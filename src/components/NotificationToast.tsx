import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notification } = useApp();

  if (!notification) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-white text-slate-800',
    error: 'border-rose-200 bg-white text-slate-800',
    info: 'border-blue-200 bg-white text-slate-800'
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
      <div className={`p-4 rounded-xl shadow-2xl border ${borderColors[notification.type]} flex items-start gap-3 pointer-events-auto`}>
        {icons[notification.type]}
        <div className="text-sm font-medium leading-snug">
          {notification.message}
        </div>
      </div>
    </div>
  );
};
