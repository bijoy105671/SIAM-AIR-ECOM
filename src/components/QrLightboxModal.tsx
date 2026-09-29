import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, QrCode } from 'lucide-react';

export const QrLightboxModal: React.FC = () => {
  const { lang, modalState, closeModal, showNotification } = useApp();
  const [copied, setCopied] = useState(false);

  if (!modalState.isOpen || modalState.type !== 'qr_lightbox' || !modalState.qrData) {
    return null;
  }

  const { title, image, number, instructions } = modalState.qrData;

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    showNotification(lang === 'bn' ? 'নম্বর কপি করা হয়েছে!' : 'Number copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6 space-y-4">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-blue-700">
          <QrCode className="w-6 h-6" />
          <h3 className="font-extrabold text-lg text-slate-900">{title}</h3>
        </div>

        {/* QR image preview */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
          <img
            src={image}
            alt={title}
            className="w-56 h-56 object-contain mx-auto rounded-lg"
          />
        </div>

        {/* Account / Mobile number */}
        <div className="bg-slate-100 p-3 rounded-xl flex items-center justify-between gap-2 border border-slate-200">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              {lang === 'bn' ? 'একাউন্ট / মোবাইল নম্বর' : 'Account / Mobile Number'}
            </span>
            <span className="font-mono text-base font-bold text-slate-900">{number}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
          </button>
        </div>

        {instructions && (
          <p className="text-xs text-slate-500 leading-relaxed text-left bg-blue-50/70 p-3 rounded-lg border border-blue-100">
            {instructions}
          </p>
        )}

        <button
          onClick={closeModal}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
        </button>
      </div>
    </div>
  );
};
