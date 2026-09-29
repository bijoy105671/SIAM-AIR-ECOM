import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, FileText, Upload } from 'lucide-react';

interface MobileQuickBarProps {
  navigate?: (path: string) => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ navigate }) => {
  const { lang, callNow, openWhatsApp, openEnquiryModal } = useApp();

  return (
    <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5">
        <button
          onClick={callNow}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-slate-100 active:bg-slate-200 rounded-xl text-slate-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-blue-700 mb-0.5" />
          <span className="text-[10px] font-bold leading-none">
            {lang === 'bn' ? 'কল করুন' : 'Call'}
          </span>
        </button>

        <button
          onClick={() => openWhatsApp()}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors cursor-pointer min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
          <span className="text-[10px] font-bold leading-none">WhatsApp</span>
        </button>

        <button
          onClick={() => navigate?.('/upload')}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-indigo-600 active:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors cursor-pointer min-h-[44px]"
        >
          <Upload className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold leading-none">
            {lang === 'bn' ? 'ফাইল আপলোড' : 'Upload'}
          </span>
        </button>

        <button
          onClick={() => openEnquiryModal()}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-sm transition-colors cursor-pointer min-h-[44px]"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold leading-none">
            {lang === 'bn' ? 'কোটেশন' : 'Enquiry'}
          </span>
        </button>
      </div>
    </aside>
  );
};
