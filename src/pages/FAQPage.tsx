import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  ChevronDown,
  Phone,
  MessageCircle,
  Search,
  CheckCircle,
  Plane,
  FileCheck,
  CreditCard
} from 'lucide-react';

interface FAQPageProps {
  navigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
  const { lang, openWhatsApp, callNow } = useApp();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Flight' | 'Visa' | 'Umrah' | 'Payment'>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Flight',
      qBn: 'আমি কীভাবে নিশ্চিত হব আমার এয়ার টিকিট আসল ও এয়ারলাইন্সে কনফার্মড?',
      qEn: 'How can I verify that my air ticket is genuine and confirmed with the airline?',
      aBn: 'আমরা প্রতিটি টিকিট ইস্যু করার পর এয়ারলাইন্সের অফিসিয়াল পিএনআর (PNR) এবং ই-টিকিট নম্বর প্রদান করি। আপনি সরাসরি যে এয়ারলাইন্সে যাত্রা করবেন (যেমন বিমান বাংলাদেশ, সাউদিয়া, এমিরেটস, এয়ার এরাবিয়া, ইউএস-বাংলা) তাদের ওয়েবসাইটে "Manage Booking" অপশনে আপনার সারনেম (Surname) ও পিএনআর দিয়ে টিকিটটি লাইভ চেক করতে পারবেন।',
      aEn: 'Every ticket issued by Siam Air includes an official airline PNR and e-ticket number. You can verify your booking live on the respective airline official website under "Manage Booking" using your surname and PNR.'
    },
    {
      category: 'Flight',
      qBn: 'যাত্রার তারিখ পরিবর্তন (Date Change) অথবা টিকিট বাতিল (Refund) করতে কী করতে হবে?',
      qEn: 'How can I change my flight date or request a refund?',
      aBn: 'আমাদের হোয়াটসঅ্যাপে আপনার টিকেটের কপি পাঠিয়ে তারিখ পরিবর্তনের অনুরোধ জানান। এয়ারলাইন্সের ফেয়ার রুলস অনুযায়ী প্রযোজ্য পেনাল্টি ও ফেয়ার ডিফারেন্স হিসাব করে তাৎক্ষণিক টিকেট রি-ইস্যু করা হয়। রিফান্ডের ক্ষেত্রে এয়ারলাইন্স থেকে টাকা ফেরত আসা সাপেক্ষে দ্রুততম সময়ে ফেরত দেওয়া হয়।',
      aEn: 'Send your ticket copy to our WhatsApp. We calculate any applicable airline penalty and fare difference according to fare rules and reissue immediately.'
    },
    {
      category: 'Visa',
      qBn: 'ভিসা কি ১০০% নিশ্চিত? আপনারা কি ভিসা গ্যারান্টি দেন?',
      qEn: 'Do you offer a 100% visa guarantee?',
      aBn: 'না। কোনো দূতাবাস বা কনস্যুলেট কোনো এজেন্সিকে ভিসা মঞ্জুরের ক্ষমতা দেয় না। ভিসা অনুমোদন করা সম্পূর্ণ সংশ্লিষ্ট দেশের দূতাবাসের এখতিয়ার। যেসকল এজেন্সি "১০০% ভিসা গ্যারান্টি" দাবি করে তা বিভ্রান্তিকর। সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস দূতাবাসের নীতিমালা মেনে আপনার সকল ডকুমেন্ট নির্ভুলভাবে প্রস্তুত করে যাতে ভিসা রিজেক্ট হওয়ার কোনো সুযোগ না থাকে।',
      aEn: 'No. Visa issuance is strictly the sovereign right of the respective embassy or immigration authority. We do not provide false guarantees; instead, we ensure your application and documents strictly comply with embassy standards to maximize approval chances.'
    },
    {
      category: 'Visa',
      qBn: 'ভারত ভিসার ক্ষেত্রে ইউটিলিটি বিল এবং ব্যাংক স্টেটমেন্টের নিয়ম কী?',
      qEn: 'What are the bank statement and utility bill rules for Indian visas?',
      aBn: 'আইভ্যাকের নিয়ম অনুযায়ী বর্তমান ঠিকানার বিদ্যুৎ বা গ্যাস বিলের কপি দিতে হয় যা বিগত ৩ মাসের মধ্যে ইস্যু করা হতে হবে। ব্যাংক স্টেটমেন্টে সর্বনিম্ন ২০,০০০ টাকা ব্যালেন্স অথবা পাসপোর্টে ১৫০ মার্কিন ডলার এন্ডোর্সমেন্ট থাকতে হবে।',
      aEn: 'For IVAC, utility bill (electricity/gas) must match the present address and be issued within the last 3 months. Bank statement must show minimum BDT 20,000 or USD 150 passport endorsement.'
    },
    {
      category: 'Umrah',
      qBn: 'ওমরাহ পালনের জন্য নুসুক (Nusuk) অ্যাপে কী করতে হয়?',
      qEn: 'What is required for the Nusuk app for Umrah?',
      aBn: 'সৌদি সরকারের নিয়ম অনুযায়ী রওজা মোবারক জিয়ারত এবং ওমরাহ তাওয়াফের নির্দিষ্ট সময়সূচি নির্ধারণ করতে নুসুক অ্যাপে পারমিট নিতে হয়। সিয়াম এয়ারের প্যাকেজ নিলে আমাদের টিমই আপনার ভিসার সাথে নুসুক পারমিট কনফার্ম করে দেয়।',
      aEn: 'Nusuk permits are required for Rawdah Mubarak ziyarah and Umrah tawaf. When booking our package, our dedicated Umrah team handles your Nusuk slot confirmations.'
    },
    {
      category: 'Payment',
      qBn: 'অনলাইনে টাকা পাঠালে কি মানি রিসিট (Money Receipt) পাওয়া যাবে?',
      qEn: 'Will I get an official money receipt upon paying online?',
      aBn: 'হ্যাঁ, অবশ্যই। বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করে ট্রানজেকশন আইডি (TrxID) দিলে আমাদের সিস্টেম থেকে তাৎক্ষণিক সিলযুক্ত অফিসিয়াল মানি রিসিট ও ভাউচার আপনার হোয়াটসঅ্যাপ এবং ইমেইলে পাঠিয়ে দেওয়া হয়।',
      aEn: 'Yes. Upon submitting your TrxID via bKash, Nagad, Rocket, or bank transfer, an official stamped electronic money receipt is immediately issued to your WhatsApp and email.'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;
    const matchesSearch =
      f.qBn.toLowerCase().includes(query) ||
      f.qEn.toLowerCase().includes(query) ||
      f.aBn.toLowerCase().includes(query) ||
      f.aEn.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা ও উত্তর' : 'Frequently Asked Questions'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn' ? 'আপনার সকল প্রশ্নের সুস্পষ্ট ও সৎ উত্তর' : 'Clear & Transparent Answers to Your Questions'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'টিকেট ভেরিফিকেশন, ভিসা প্রক্রিয়া, ওমরাহ প্যাকেজ ও পেমেন্ট নিরাপত্তা সম্পর্কে গ্রাহকদের সাধারণ প্রশ্নের উত্তর নিচে দেওয়া হলো।'
              : 'Find straightforward answers about flight verification, visa rules, Umrah preparations, and payment security.'}
          </p>

          {/* Search box */}
          <div className="pt-2 max-w-xl relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'যেকোনো প্রশ্ন লিখে খুঁজুন (উদা: টিকিট, ভিসা, বিকাশ)...' : 'Search questions (e.g. ticket, refund, visa)...'}
              className="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </section>

      {/* 2. Categories & FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['All', 'Flight', 'Visa', 'Umrah', 'Payment'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat === 'All' && (lang === 'bn' ? 'সকল প্রশ্ন' : 'All FAQs')}
              {cat === 'Flight' && (lang === 'bn' ? '✈️ এয়ার টিকিট' : 'Flights')}
              {cat === 'Visa' && (lang === 'bn' ? '🛂 ভিসা প্রসেসিং' : 'Visas')}
              {cat === 'Umrah' && (lang === 'bn' ? '🕋 ওমরাহ হজ্ব' : 'Umrah')}
              {cat === 'Payment' && (lang === 'bn' ? '💳 পেমেন্ট' : 'Payments')}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{lang === 'bn' ? faq.aBn : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
              কোনো ফলাফল পাওয়া যায়নি। সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করতে পারেন।
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {lang === 'bn' ? 'আপনার নির্দিষ্ট প্রশ্নের উত্তর পাননি?' : 'Still have a specific question?'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'bn'
                ? 'আমাদের ট্রাভেল কনসালট্যান্ট সার্বক্ষণিক আপনার সেবায় নিয়োজিত রয়েছে।'
                : 'Our travel support desk is ready to assist you right now.'}
            </p>
          </div>

          <div className="flex gap-2.5 shrink-0">
            <button
              onClick={callNow}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{lang === 'bn' ? 'কল করুন' : 'Call'}</span>
            </button>
            <button
              onClick={() => openWhatsApp('আসসালামু আলাইকুম, আমার একটি জরুরি জিজ্ঞাসা রয়েছে।')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
