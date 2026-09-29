import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  CheckCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Send,
  Building2,
  FileText
} from 'lucide-react';

interface VisaHubPageProps {
  navigate: (path: string) => void;
}

export const VisaHubPage: React.FC<VisaHubPageProps> = ({ navigate }) => {
  const { lang, visaServices, openWhatsApp, openEnquiryModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Tourist' | 'Medical' | 'Umrah / Religious'>('All');

  const countries = [
    {
      id: 'india',
      nameEn: 'India',
      nameBn: 'ভারত',
      flag: '🇮🇳',
      types: 'Tourist, Medical, Business',
      timeline: '8 - 15 Working Days',
      fee: 'IVAC Fee ~ BDT 800 - 850',
      serviceFee: 'BDT 500 - 1,000',
      description: 'Full IVAC online form fill-up, appointment slot assistance, document indexing, and photo verification.',
      path: '/visa/india'
    },
    {
      id: 'thailand',
      nameEn: 'Thailand',
      nameBn: 'থাইল্যান্ড',
      flag: '🇹🇭',
      types: 'Tourist Visa (Single Entry / 60 Days)',
      timeline: '5 - 7 Working Days',
      fee: 'Embassy Fee ~ BDT 4,000 - 5,000',
      serviceFee: 'BDT 1,500 - 2,500',
      description: 'Official file processing, air ticket itinerary, hotel voucher preparation, and bank statement verification.',
      path: '/visa/thailand'
    },
    {
      id: 'saudi',
      nameEn: 'Saudi Arabia',
      nameBn: 'সৌদি আরব',
      flag: '🇸🇦',
      types: 'Umrah E-Visa, Tourist E-Visa',
      timeline: '24 - 72 Hours',
      fee: 'Included in visa package',
      serviceFee: 'BDT 1,000 - 2,000',
      description: 'Fast online e-visa issuance, Nusuk platform integration, mandatory medical insurance, and hotel vouchers.',
      path: '/visa/saudi'
    },
    {
      id: 'dubai',
      nameEn: 'United Arab Emirates (Dubai)',
      nameBn: 'সংযুক্ত আরব আমিরাত (দুবাই)',
      flag: '🇦🇪',
      types: '30 Days / 60 Days Tourist E-Visa',
      timeline: '3 - 5 Working Days',
      fee: 'Approx. BDT 11,000 - 18,000',
      serviceFee: 'Included in package',
      description: 'Passport copy & passport size photo submission for electronic tourist entry with insurance.',
      path: '/visa'
    },
    {
      id: 'malaysia',
      nameEn: 'Malaysia',
      nameBn: 'মালয়েশিয়া',
      flag: '🇲🇾',
      types: 'Social Visit / Tourist E-Visa (eNTRI / eVISA)',
      timeline: '4 - 7 Working Days',
      fee: 'Approx. BDT 4,500 - 6,500',
      serviceFee: 'BDT 1,000 - 1,500',
      description: 'E-visa filing, flight itinerary, hotel reservation, and personal solvency documentation.',
      path: '/visa'
    },
    {
      id: 'singapore',
      nameEn: 'Singapore',
      nameBn: 'সিঙ্গাপুর',
      flag: '🇸🇬',
      types: 'Entry Visa (Authorised Visa Agent File)',
      timeline: '5 - 8 Working Days',
      fee: 'Embassy Fee ~ BDT 3,500',
      serviceFee: 'BDT 1,500 - 2,000',
      description: 'Form 14A, local sponsor / LOI guidance, hotel and flight reservation, bank balance checks.',
      path: '/visa'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'আন্তর্জাতিক ভিসা প্রসেসিং হাব' : 'International Visa Processing Hub'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'নির্ভুল ফাইল তৈরি ও প্রফেশনাল ভিসা প্রসেসিং সেবা'
              : 'Accurate File Preparation & Professional Visa Consultation'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস দূতাবাস নির্ধারিত নিয়ম অনুযায়ী প্রতিটি ডকুমেন্টস পুঙ্খানুপুঙ্খভাবে যাচাই করে ফাইল প্রস্তুত করে। কোনো ভুল তথ্য ছাড়া শতভাগ পেশাদারিত্বের সাথে আমরা আপনার পাশে আছি।'
              : 'We meticulously compile and verify all visa documents according to official embassy rules. Get hassle-free submission support for India, Thailand, Saudi Arabia, and beyond.'}
          </p>
        </div>
      </section>

      {/* Mandatory Regulatory & Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900 block text-sm">
              {lang === 'bn' ? 'আইনি ও ভিসা পলিসি বিষয়ক ঘোষণা (Visa Disclaimer):' : 'Visa Compliance & Legal Notice:'}
            </span>
            <p className="leading-relaxed text-amber-900/90">
              {lang === 'bn'
                ? 'ভিসা মঞ্জুর বা প্রত্যাখ্যান করার একক এখতিয়ার সম্পূর্ণ সংশ্লিষ্ট দেশের দূতাবাস ও কনস্যুলার কর্তৃপক্ষের। সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস কোনো প্রকার "১০০% ভিসা গ্যারান্টি" প্রদান করে না বা কোনো প্রকার জাল/ভুয়া কাগজপত্র তৈরি করে না। আমরা আপনার আসল কাগজপত্র যাচাই করে নির্ভুল অনলাইন আবেদন ও নির্দেশনা প্রদান করি।'
                : 'Visa approval is strictly at the sole discretion of the respective embassy or immigration authority. Siam Air & Digital Service provides certified application processing and document checklist verification, and DOES NOT guarantee visa approvals or fabricate documents.'}
            </p>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'দেশভিত্তিক ভিসা নির্দেশিকা ও সার্ভিস চার্জ' : 'Country-Wise Visa Details'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn' ? 'কাঙ্ক্ষিত দেশের বিস্তারিত রিকোয়ারমেন্ট ও আবেদন প্রক্রিয়া জানতে নির্বাচন করুন' : 'Select a destination for complete checklist, timeline, and charges'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{c.flag}</span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{c.timeline}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {lang === 'bn' ? c.nameBn : c.nameEn}
                  </h3>
                  <p className="text-xs text-blue-700 font-semibold mt-0.5">{c.types}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === 'bn' ? 'সরকারি / দূতাবাস ফি:' : 'Embassy Fee:'}</span>
                    <span className="font-semibold text-slate-800">{c.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === 'bn' ? 'সার্ভিস চার্জ:' : 'Agency Service:'}</span>
                    <span className="font-semibold text-slate-800">{c.serviceFee}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => navigate(c.path)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'বিস্তারিত তথ্য' : 'Full Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => openWhatsApp(lang === 'bn' ? `আমি ${c.nameBn} ভিসা প্রসেসিং সম্পর্কে জানতে চাই` : `I want to inquire about ${c.nameEn} visa`)}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Universal Document Checklist Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'সাধারণ ডকুমেন্ট নির্দেশিকা' : 'Standard Document Checklist'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              {lang === 'bn'
                ? 'যেকোনো দেশের ভিসা আবেদনের পূর্বে যা প্রস্তুত রাখবেন'
                : 'Key Documents You Need Ready Before Any Visa Application'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>পাসপোর্ট ও ছবি</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 leading-relaxed">
                <li>• পাসপোর্টের মেয়াদ অন্তত ৬ মাস থাকতে হবে।</li>
                <li>• কমপক্ষে ২টি খালি ভিসা পৃষ্ঠা থাকতে হবে।</li>
                <li>• সদ্য তোলা ল্যাব প্রিন্ট ছবি (সাদা ব্যাকগ্রাউন্ড, কান ও মুখ স্পষ্ট)।</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>আর্থিক সচ্ছলতা ও ব্যাংক</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 leading-relaxed">
                <li>• গত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট।</li>
                <li>• অ্যাকাউন্টে দেশের ক্যাটাগরি অনুযায়ী পর্যাপ্ত ব্যালেন্স।</li>
                <li>• ভারত ভিসার ক্ষেত্রে $150 এন্ডোর্সমেন্ট গ্রহণযোগ্য।</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>পেশাগত প্রমাণপত্র</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 leading-relaxed">
                <li>• চাকরিজীবীদের জন্য অফিস এনওসি (NOC) ও ভিজিটিং কার্ড।</li>
                <li>• ব্যবসায়ীদের জন্য হালনাগাদ ট্রেড লাইসেন্স ও কোম্পানির প্যাড।</li>
                <li>• শিক্ষার্থীদের জন্য স্টুডেন্ট আইডি কার্ড ও ছুটির সনদ।</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs text-slate-400">
            <span>আপনার কাগজপত্র ঠিক আছে কিনা তা নিয়ে নিশ্চিত নন? আমাদের অফিসে এসে ফ্রি ফাইল চেক করিয়ে নিন।</span>
            <button
              onClick={() => openEnquiryModal('Free Document Check')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
            >
              ফ্রি ডকুমেন্ট চেক রিকোয়েস্ট
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
