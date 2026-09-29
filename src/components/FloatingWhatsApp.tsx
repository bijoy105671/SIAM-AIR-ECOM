import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { lang, openWhatsApp, businessInfo } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Mini notification bubble on desktop */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3 rounded-xl shadow-xl border border-emerald-100 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {lang === 'bn'
              ? 'টিকিট বা ভিসা নিয়ে দ্রুত তথ্য চান? হোয়াটসঅ্যাপে লিখুন'
              : 'Need instant flight or visa support? Chat on WhatsApp'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => openWhatsApp()}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat with Siam Air & Digital on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </aside>
  );
};
