import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Printer,
  QrCode,
  Sparkles,
  Download,
  Phone,
  MapPin,
  Camera,
  FileText,
  Palette,
  ArrowLeft,
  Check
} from 'lucide-react';

interface QrStandsPageProps {
  navigate: (path: string) => void;
}

export const QrStandsPage: React.FC<QrStandsPageProps> = ({ navigate }) => {
  const { lang, businessInfo } = useApp();

  const [selectedStand, setSelectedStand] = useState<'main' | 'passport' | 'print' | 'design'>('main');

  // Direct origin URL for counter upload
  const uploadUrl = typeof window !== 'undefined' ? `${window.location.origin}/upload` : 'https://siamairbd.com/upload';

  // High quality QR code via api
  const getQrUrl = (url: string) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}&color=0f172a&bgcolor=ffffff&margin=1`;

  const stands = [
    {
      id: 'main',
      titleEn: 'Main Counter Customer Upload QR',
      titleBn: 'কাউন্টার ডিজিটাল সেবা ও ফটো আপলোড কিউআর',
      taglineEn: 'Scan to upload photo & documents instantly',
      taglineBn: 'মোবাইল দিয়ে স্ক্যান করে ছবি ও ফাইল আপলোড করুন',
      icon: QrCode,
      color: 'from-blue-900 to-indigo-950',
      badge: 'মেইন কাউন্টার ডিসপ্লে'
    },
    {
      id: 'passport',
      titleEn: 'Passport & Visa Photo Studio QR',
      titleBn: 'পাসপোর্ট ও ভিসা ছবি আপলোড কিউআর',
      taglineEn: 'Upload your photo for instant passport print',
      taglineBn: 'পাসপোর্ট, এনআইডি ও ভিসা সাইজ ছবির জন্য স্ক্যান করুন',
      icon: Camera,
      color: 'from-slate-900 via-blue-950 to-slate-900',
      badge: 'ফটো স্টুডিও কাউন্টার'
    },
    {
      id: 'print',
      titleEn: 'Document & PDF Print QR',
      titleBn: 'ডকুমেন্ট ও ফাইল কালার প্রিন্ট কিউআর',
      taglineEn: 'Send documents directly from your phone',
      taglineBn: 'সার্টিফিকেট, সিভি ও ফাইল সরাসরি প্রিন্ট পাঠাতে স্ক্যান করুন',
      icon: FileText,
      color: 'from-emerald-900 to-teal-950',
      badge: 'ডকুমেন্ট ও প্রিন্ট কাউন্টার'
    },
    {
      id: 'design',
      titleEn: 'Projapoti Print Media Design QR',
      titleBn: 'প্রজাপতি প্রিন্ট মিডিয়া ডিজাইন কিউআর',
      taglineEn: 'Visiting Card, Banner, Poster & Media Print',
      taglineBn: 'ভিজিটিং কার্ড, ব্যানার, পোস্টার ও প্রচারণার জন্য স্ক্যান করুন',
      icon: Palette,
      color: 'from-purple-900 to-slate-950',
      badge: 'প্রজাপতি প্রিন্ট মিডিয়া'
    }
  ];

  const activeStandObj = stands.find((s) => s.id === selectedStand) || stands[0];

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto print:max-w-none">
        {/* Navigation & Actions (Hidden during print) */}
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
              {lang === 'bn' ? 'দোকানের কাউন্টার কিউআর কোড স্ট্যান্ড' : 'Counter QR Code Stands'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>স্ট্যান্ড প্রিন্ট করুন (Print Stand Card)</span>
            </button>
          </div>
        </div>

        {/* Stand Selector Tabs (Hidden in Print) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 print:hidden">
          {stands.map((stand) => {
            const Icon = stand.icon;
            const isSelected = selectedStand === stand.id;
            return (
              <button
                key={stand.id}
                onClick={() => setSelectedStand(stand.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {stand.badge}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                  {lang === 'bn' ? stand.titleBn : stand.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* PRINTABLE STAND CARD (Designed for Acrylic Counter Stands / A5 / A4) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-4 border-slate-900 shadow-2xl max-w-lg mx-auto text-center relative overflow-hidden print:border-2 print:shadow-none print:m-0 print:p-8 print:w-full">
          {/* Top Brand Header */}
          <div className="space-y-1 pb-4 border-b-2 border-slate-100">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {activeStandObj.badge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস
            </h2>
            <p className="text-xs font-extrabold text-blue-700">
              + প্রজাপতি প্রিন্ট মিডিয়া (Projapoti Print Media)
            </p>
          </div>

          {/* Stand Headline */}
          <div className="my-5">
            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {lang === 'bn' ? activeStandObj.titleBn : activeStandObj.titleEn}
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {lang === 'bn' ? activeStandObj.taglineBn : activeStandObj.taglineEn}
            </p>
          </div>

          {/* Big Scannable QR Code */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl inline-block my-2 shadow-inner">
            <img
              src={getQrUrl(uploadUrl)}
              alt="Counter QR Code"
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl mx-auto"
            />
          </div>

          {/* 3 Step Simple Instructions */}
          <div className="grid grid-cols-3 gap-2 my-5 text-[11px] text-slate-700 font-bold">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block text-blue-700 text-xs">১. ক্যামেরা খুলুন</span>
              <span>কিউআর স্ক্যান করুন</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block text-blue-700 text-xs">২. ফাইল বাছুন</span>
              <span>ছবি/ডকুমেন্ট দিন</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block text-blue-700 text-xs">৩. প্রিন্ট নিন</span>
              <span>কাউন্টার থেকে সংগ্রহ</span>
            </div>
          </div>

          {/* Footer Contact & Location */}
          <div className="pt-4 border-t-2 border-slate-100 space-y-1.5 text-xs text-slate-700 font-semibold">
            <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold">
              <Phone className="w-3.5 h-3.5 text-emerald-600 fill-current" />
              <span>হেল্পলাইন ও WhatsApp: {businessInfo.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা</span>
            </div>
          </div>
        </div>

        {/* Print instructions tip */}
        <p className="text-center text-xs text-slate-400 mt-4 print:hidden">
          💡 এই পেজটি কালার প্রিন্ট করে কাউন্টার ডেস্কে এক্রাইলিক স্ট্যান্ডে রাখলে কাস্টমার সহজেই ফাইল পাঠাতে পারবে।
        </p>
      </div>
    </div>
  );
};
