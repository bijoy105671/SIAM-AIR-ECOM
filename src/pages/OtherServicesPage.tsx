import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle,
  FileText,
  Camera,
  Printer,
  ShieldCheck,
  Building,
  Phone,
  MessageCircle,
  Car
} from 'lucide-react';

interface OtherServicesPageProps {
  navigate: (path: string) => void;
}

export const OtherServicesPage: React.FC<OtherServicesPageProps> = ({ navigate }) => {
  const { lang, services, openWhatsApp, callNow, openEnquiryModal } = useApp();

  const digitalCategories = [
    {
      titleBn: 'সরকারি ও অনলাইন সেবা সহায়তা',
      titleEn: 'Government & Citizen Online Services',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      items: [
        { name: 'ই-পাসপোর্ট (E-Passport) অনলাইন আবেদন ও ফি জমা', fee: 'BDT 200 - 500' },
        { name: 'জাতীয় পরিচয়পত্র (NID) সংশোধন ও রি-ইস্যু আবেদন', fee: 'BDT 150 - 300' },
        { name: 'অনলাইন জন্ম ও মৃত্যু নিবন্ধন আবেদন', fee: 'BDT 100 - 200' },
        { name: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (Police Clearance) আবেদন', fee: 'BDT 300 - 500' },
        { name: 'টিন (TIN) সার্টিফিকেট ও আয়কর অনলাইন নিবন্ধন', fee: 'BDT 200 - 400' }
      ]
    },
    {
      titleBn: 'স্টুডিও, ফটো ও কম্পিউটার কম্পোজ',
      titleEn: 'Photo Studio, Printing & Composition',
      icon: <Camera className="w-6 h-6 text-purple-600" />,
      items: [
        { name: 'ভিসা সাইজ ছবি (ভারত ২x২, থাইল্যান্ড ৩.৫x৪.৫ সেমি, ইত্যাদি)', fee: 'BDT 50 - 100' },
        { name: 'লেজার কালার প্রিন্ট ও হাই-রেজ্যুলিউশন স্ক্যানিং', fee: 'BDT 5 - 20 per page' },
        { name: 'বাংলা ও ইংরেজি দ্রুত কম্পিউটার কম্পোজ ও টাইপিং', fee: 'BDT 20 - 50 per page' },
        { name: 'প্রফেশনাল চাকরির সিভি (CV / Resume) ও কাভার লেটার তৈরি', fee: 'BDT 150 - 300' },
        { name: 'ডকুমেন্ট লেমিনেটিং ও প্লাস্টিক স্পাইরাল বাইন্ডিং', fee: 'BDT 30 - 80' }
      ]
    },
    {
      titleBn: 'আন্তর্জাতিক হোটেল ও এয়ারপোর্ট ট্রান্সফার',
      titleEn: 'International Hotels & Airport Transfers',
      icon: <Car className="w-6 h-6 text-emerald-600" />,
      items: [
        { name: 'বিশ্বব্যাপী হোটেল বুকিং ভাউচার (Agoda/Booking/GDS নিশ্চিত)', fee: 'Actual Hotel Tariff' },
        { name: 'জেদ্দা/মদিনা এয়ারপোর্ট থেকে হারাম শরিফে প্রাইভেট কার/ট্যাক্সি', fee: 'Based on vehicle' },
        { name: 'ব্যাংকক এয়ারপোর্ট থেকে পাতায়া/শহরের ট্রান্সফার কার সার্ভিস', fee: 'Based on vehicle' },
        { name: 'ঢাকা হযরত শাহজালাল বিমানবন্দর পিকআপ ও ড্রপ কার সেবা', fee: 'Market competitive' }
      ]
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'ডিজিটাল ও কম্পিউটার সেবাসমূহ' : 'Computer & Digital Services'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'পাসপোর্ট, সরকারি আবেদন, ভিসা ফটো ও দৈনন্দিন ডিজিটাল সেবা'
              : 'Citizen Portals, Passport Assistance, Visa Photography & IT Services'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'হোমনা, রামকৃষ্ণপুর বাজার সূত্রধর সুপার মার্কেটে অবস্থিত সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসে মিলবে সকল ধরণের কম্পিউটার ও সরকারি অনলাইন আবেদনের নির্ভুল সমাধান।'
              : 'Your one-stop reliable digital center in Shutradhar Super Market, Ramkrishnapur Bazar for official paperwork, photo printing, and travel logistics.'}
          </p>
        </div>
      </section>

      {/* 2. Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {digitalCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {lang === 'bn' ? cat.titleBn : cat.titleEn}
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  {cat.items.map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between text-xs space-y-1">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-[11px] font-bold text-blue-700">{item.fee}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openEnquiryModal(cat.titleEn)}
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সেবাটির জন্য যোগাযোগ করুন' : 'Inquire for This Service'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Physical Shop Visit Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              সরাসরি দোকানে আসুন
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              জরুরি ছবি প্রিন্ট বা অনলাইন আবেদন করতে আজই চলে আসুন
            </h3>
            <p className="text-xs text-slate-300">
              সূত্রধর সুপার মার্কেট, রামকৃষ্ণপুর বাজার, হোমনা, কুমিল্লা। প্রতিদিন সকাল ৮:৩০ থেকে রাত ১০:৩০ পর্যন্ত খোলা।
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={callNow}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন</span>
            </button>
            <button
              onClick={() => openWhatsApp('আসসালামু আলাইকুম, আমি আপনাদের দোকানে এসে কম্পিউটার/অনলাইন সেবার কাজ করাতে চাই।')}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>হোয়াটসঅ্যাপ</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
