import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Printer,
  Download,
  Palette,
  Sparkles,
  ArrowLeft,
  Check,
  CreditCard,
  FileSpreadsheet,
  Layers,
  Phone,
  MapPin,
  QrCode
} from 'lucide-react';
import { PRINT_TEMPLATES } from '../config/initialData';
import { PrintTemplateItem } from '../types';

interface PrintTemplatesPageProps {
  navigate: (path: string) => void;
}

export const PrintTemplatesPage: React.FC<PrintTemplatesPageProps> = ({ navigate }) => {
  const { lang, businessInfo, showNotification } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState<PrintTemplateItem>(PRINT_TEMPLATES[0]);

  // Form field state map
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PRINT_TEMPLATES[0].fields.forEach((f) => {
      initial[f.key] = f.defaultValue;
    });
    return initial;
  });

  const handleSelectTemplate = (tmpl: PrintTemplateItem) => {
    setSelectedTemplate(tmpl);
    const initial: Record<string, string> = {};
    tmpl.fields.forEach((f) => {
      initial[f.key] = f.defaultValue;
    });
    setFieldValues(initial);
  };

  const handleFieldChange = (key: string, val: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: val }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 print:p-0 print:bg-white">
      <div className="max-w-6xl mx-auto print:max-w-none">
        {/* Top Header (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 print:hidden">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="text-xs text-slate-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer font-semibold mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === 'bn' ? 'প্রজাপতি প্রিন্ট মিডিয়া টেমপ্লেট সিস্টেম' : 'Projapoti Print Media Templates'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              কাস্টমার তথ্য দিলেই মুহূর্তেই তৈরি হবে ভিজিটিং কার্ড, দোকানের ব্যানার, মানি রিসিট ও পোস্টার।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>টেমপ্লেট প্রিন্ট করুন</span>
            </button>
          </div>
        </div>

        {/* Template Selector Tabs (Hidden in Print) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 print:hidden">
          {PRINT_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTemplate.id === tmpl.id
                  ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-900">
                  {lang === 'bn' ? tmpl.titleBn : tmpl.titleEn}
                </span>
                {selectedTemplate.id === tmpl.id && <Check className="w-4 h-4 text-blue-600" />}
              </div>
              <span className="text-[11px] text-slate-400 block">{tmpl.dimensions}</span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {lang === 'bn' ? tmpl.descriptionBn : tmpl.descriptionEn}
              </span>
            </button>
          ))}
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
          {/* Form Fields Column (Hidden in Print) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 print:hidden">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>টেমপ্লেটের তথ্য পূরণ করুন</span>
            </h2>

            <div className="space-y-3">
              {selectedTemplate.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? field.labelBn : field.labelEn}:
                  </label>
                  <input
                    type="text"
                    value={fieldValues[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={handlePrint}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট প্রিভিউ ও প্রিন্ট</span>
              </button>
            </div>
          </div>

          {/* Live Rendered Template (Printable) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-100 rounded-3xl p-6 border border-slate-200 print:p-0 print:border-none print:bg-white">
            {selectedTemplate.category === 'visiting_card' && (
              /* Visiting Card Layout */
              <div className="w-full max-w-md aspect-[3.5/2] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between border-2 border-slate-700 relative overflow-hidden print:shadow-none print:border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-widest text-blue-400 font-extrabold uppercase block">
                      প্রজাপতি প্রিন্ট মিডিয়া
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {fieldValues['business_name'] || 'Siam Air & Digital Service'}
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      {fieldValues['proprietor'] || 'Bijoy Hossain'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://siamairbd.com"
                      alt="QR"
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="my-2 py-1.5 px-3 bg-white/10 rounded-lg text-[11px] font-semibold text-slate-200">
                  {fieldValues['services'] || 'Air Ticket | Visa | Umrah | Photo & Print'}
                </div>

                <div className="space-y-1 text-[11px] text-slate-300 border-t border-white/20 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{fieldValues['mobile'] || '+8801883400808'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{fieldValues['address'] || 'Ramkrishnapur Bazar, Homna, Cumilla'}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedTemplate.category === 'banner' && (
              /* Banner Layout */
              <div className="w-full aspect-[2/1] bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between border-4 border-amber-400 text-center relative overflow-hidden print:border-slate-800">
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full uppercase">
                    PROJAPOTI PRINT MEDIA
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                    {fieldValues['headline']}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                    {fieldValues['subheading']}
                  </p>
                </div>

                <div className="my-2 p-2.5 bg-black/40 rounded-xl border border-white/20 text-xs sm:text-sm font-bold text-amber-300">
                  {fieldValues['features']}
                </div>

                <div className="flex justify-between items-center text-xs font-bold border-t border-white/20 pt-2">
                  <span>হটলাইন: {fieldValues['mobile']}</span>
                  <span>{fieldValues['address']}</span>
                </div>
              </div>
            )}

            {selectedTemplate.category === 'memo' && (
              /* Cash Memo / Receipt Layout */
              <div className="w-full max-w-md bg-white text-slate-900 rounded-xl p-6 shadow-xl border-2 border-slate-300 space-y-4 print:border-none print:shadow-none">
                <div className="text-center border-b pb-3 border-slate-200">
                  <h3 className="text-base font-black text-blue-900">সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস</h3>
                  <p className="text-[11px] text-slate-500">রামকৃষ্ণপুর বাজার, হোমনা, কুমিল্লা | মোবা: ০১৮৮৩-৪০০০৮০৮</p>
                  <span className="inline-block mt-2 px-3 py-0.5 bg-slate-100 font-black text-xs rounded-full border border-slate-300">
                    {fieldValues['memo_title']}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b pb-1 border-slate-100">
                    <span className="text-slate-500">গ্রাহকের নাম:</span>
                    <span className="font-bold">{fieldValues['customer_name']}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 border-slate-100">
                    <span className="text-slate-500">সেবার বিবরণ:</span>
                    <span className="font-bold">{fieldValues['service_name']}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 border-slate-100 text-sm">
                    <span className="font-black text-slate-800">মোট টাকা:</span>
                    <span className="font-black text-blue-700">{fieldValues['amount']}</span>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-end text-[11px] text-slate-500">
                  <div>
                    <span className="block border-t border-slate-300 pt-1">গ্রাহকের স্বাক্ষর</span>
                  </div>
                  <div className="text-right">
                    <span className="block border-t border-slate-300 pt-1">কর্তৃপক্ষের স্বাক্ষর</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
