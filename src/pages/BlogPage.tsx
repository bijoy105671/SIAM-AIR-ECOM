import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  ArrowRight,
  Plane,
  ShieldCheck,
  FileCheck,
  Building,
  Tag
} from 'lucide-react';

interface BlogPageProps {
  navigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ navigate }) => {
  const { lang, openWhatsApp, openEnquiryModal } = useApp();

  const articles = [
    {
      id: 'baggage-guide',
      titleBn: 'মধ্যপ্রাচ্য ও উপসাগরীয় দেশসমূহে বিমান ভ্রমণের ব্যাগেজ রুলস ও লাগেজ নিয়মাবলী',
      titleEn: 'Baggage Allowances & Luggage Rules for Middle East Flights (Saudi, UAE, Qatar)',
      categoryBn: 'ফ্লাইট গাইড',
      categoryEn: 'Flight Guide',
      date: '15 Sep 2026',
      readTime: '4 min read',
      summaryBn: 'বিমানে কত কেজি লাগেজ নেওয়া যায়, হ্যান্ড ব্যাগের সাইজ ও ওজন কত, তরল পদার্থ বহনের নিয়ম এবং অতিরিক্ত ব্যাগেজ চার্জ কীভাবে সাশ্রয় করবেন।',
      summaryEn: 'Comprehensive guide on checked baggage limits, hand carry weight restrictions, liquid rules, and how to prepurchase extra baggage.'
    },
    {
      id: 'india-visa-ivac-rules',
      titleBn: '২০২৬ সালের হালনাগাদ ভারত ভিসা আবেদন ও আইভ্যাক (IVAC) স্লট বুকিং নির্দেশিকা',
      titleEn: 'Updated 2026 Indian Visa Application and IVAC Appointment Slot Guide',
      categoryBn: 'ভিসা আপডেট',
      categoryEn: 'Visa Guide',
      date: '10 Sep 2026',
      readTime: '6 min read',
      summaryBn: 'নতুন নিয়মে কীভাবে আইভ্যাক সেন্টারের আবেদন সম্পন্ন করবেন, বিদ্যুৎ বিলের ত্রুটি এড়ানোর উপায় এবং জরুরি মেডিকেল ভিসার ফাস্ট-ট্র্যাক প্রসেস।',
      summaryEn: 'Avoid common IVAC rejections, understand utility bill address requirements, and fast-track medical invitations from Indian hospitals.'
    },
    {
      id: 'umrah-essential-checklist',
      titleBn: 'পবিত্র ওমরাহ পালনের প্রাথমিক প্রস্তুতি ও নুসুক অ্যাপ ব্যবহারে দরকারি টিপস',
      titleEn: 'Essential Umrah Preparation Checklist & Nusuk App Guidelines',
      categoryBn: 'ওমরাহ হজ্ব',
      categoryEn: 'Umrah Advice',
      date: '05 Sep 2026',
      readTime: '5 min read',
      summaryBn: 'মিকাত অতিক্রমের আগে ইহরামের প্রস্তুতি, রওজা মোবারক জিয়ারতের স্লট বুকিং, স্বাস্থ্য সতর্কতা এবং মক্কা-মদিনা ভ্রমণের জরুরি নির্দেশিকা।',
      summaryEn: 'A step-by-step spiritual and logistical guide for first-time pilgrims: Ihram rules, Rawdah booking on Nusuk, and packing essentials.'
    },
    {
      id: 'epassport-citizen-guide',
      titleBn: 'ই-পাসপোর্ট (E-Passport) অনলাইন আবেদন, ভুল সংশোধন ও রি-ইস্যু পদ্ধতি',
      titleEn: 'Bangladeshi E-Passport Online Application, Correction & Re-issue Process',
      categoryBn: 'ডিজিটাল সেবা',
      categoryEn: 'Digital Portal',
      date: '28 Aug 2026',
      readTime: '5 min read',
      summaryBn: 'পাসপোর্টের জন্য এনআইডি বা জন্মনিবন্ধন অনলাইনে যাচাই, ফি পরিশোধ, পুলিশ ভেরিফিকেশন এবং ডেলিভারি স্লিপ ট্র্যাকিং করার সঠিক নিয়ম।',
      summaryEn: 'Step-by-step guidance on Bangladeshi e-passport portal, fee vouchers, biometrics, and police verification procedures.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'ভ্রমণ ব্লগ ও ভিসা আপডেট' : 'Travel Blog & Visa Updates'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn' ? 'যাত্রী ও প্রবাসীদের জন্য প্রয়োজনীয় তথ্য ও পরামর্শ' : 'Practical Travel Knowledge & Regulatory Updates'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'এয়ার টিকিট নিয়মাবলী, লাগেজ পলিসি, আন্তর্জাতিক ভিসা আপডেট ও ওমরাহ পালনের দরকারি নির্দেশিকা।'
              : 'Stay informed with verified airline baggage allowances, consular rules, and official visa filing tips.'}
          </p>
        </div>
      </section>

      {/* 2. Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    <span>{lang === 'bn' ? art.categoryBn : art.categoryEn}</span>
                  </span>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {lang === 'bn' ? art.titleBn : art.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn' ? art.summaryBn : art.summaryEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openEnquiryModal(`Blog Inquiry: ${art.titleEn}`)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'পরামর্শের জন্য যোগাযোগ' : 'Ask Specialist'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => openWhatsApp(`আমি এই আর্টিকেল সংক্রান্ত তথ্য জানতে চাই: ${art.titleEn}`)}
                  className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
