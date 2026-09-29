import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';

interface LegalPageProps {
  navigate: (path: string) => void;
  defaultTab?: 'terms' | 'privacy' | 'refund';
}

export const LegalPage: React.FC<LegalPageProps> = ({ navigate, defaultTab = 'terms' }) => {
  const { lang } = useApp();
  const [tab, setTab] = useState<'terms' | 'privacy' | 'refund'>(defaultTab);

  return (
    <div className="space-y-12 py-8">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full">
            {lang === 'bn' ? 'আইনি ও নীতিমালা' : 'Legal & Policies'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {tab === 'terms' && (lang === 'bn' ? 'ব্যবহারের শর্তাবলী (Terms of Service)' : 'Terms of Service')}
            {tab === 'privacy' && (lang === 'bn' ? 'গোপনীয়তা নীতিমালা (Privacy Policy)' : 'Privacy Policy')}
            {tab === 'refund' && (lang === 'bn' ? 'টিকেট রিফান্ড ও বাতিল নীতিমালা (Refund Policy)' : 'Cancellation & Refund Policy')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            {lang === 'bn'
              ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস সর্বোচ্চ স্বচ্ছতা ও গ্রাহক অধিকার নিশ্চিতকরণে প্রতিশ্রুতিবদ্ধ।'
              : 'Our policies are designed to protect traveler rights and maintain 100% operational transparency.'}
          </p>
        </div>
      </section>

      {/* 2. Tab switcher */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setTab('terms')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'terms' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'শর্তাবলী (Terms)' : 'Terms of Service'}
          </button>
          <button
            onClick={() => setTab('privacy')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'privacy' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'প্রাইভেসি পলিসি (Privacy)' : 'Privacy Policy'}
          </button>
          <button
            onClick={() => setTab('refund')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'refund' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'রিফান্ড পলিসি (Refund)' : 'Refund & Cancellation'}
          </button>
        </div>
      </section>

      {/* 3. Policy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {tab === 'terms' && (
            <>
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {lang === 'bn' ? '১. সেবার সাধারণ শর্তাবলী' : '1. General Terms of Engagement'}
              </h2>
              <p>
                সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস (Siam Air & Digital Service)-এর ওয়েবসাইট বা সেবা গ্রহণের মাধ্যমে আপনি এই শর্তাবলীর সাথে সম্মত হচ্ছেন।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">২. এয়ার টিকিটিং ও পিএনআর নিয়ম</h3>
              <p>
                সমস্ত এয়ার টিকিটের ভাড়া, সিট প্রাপ্যতা ও ব্যাগেজ সংক্রান্ত নিয়মাবলী সংশ্লিষ্ট এয়ারলাইন্স দ্বারা নিয়ন্ত্রিত হয়। টিকিট ইস্যু করার পূর্বে গ্রাহককে পাসপোর্ট অনুযায়ী নাম, যাত্রার তারিখ ও ট্রানজিট সময় নিশ্চিত করতে হবে।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">৩. ভিসা প্রসেসিং ও দূতাবাসের এখতিয়ার</h3>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium">
                ভিসা অনুমোদন বা প্রত্যাখ্যান করার সম্পূর্ণ এখতিয়ার সংশ্লিষ্ট দেশের দূতাবাস ও কনস্যুলার কর্তৃপক্ষের। সিয়াম এয়ার কোনো প্রকার "১০০% ভিসা গ্যারান্টি" প্রদান করে না। আবেদনপত্র ও আসল কাগজপত্র প্রস্তুত করে জমা দেওয়ার প্রক্রিয়াটিতে আমরা সহায়তা করে থাকি।
              </div>
            </>
          )}

          {tab === 'privacy' && (
            <>
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {lang === 'bn' ? 'গ্রাহকের তথ্যের গোপনীয়তা রক্ষা' : 'User Privacy & Data Protection'}
              </h2>
              <p>
                সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস গ্রাহকের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা দিতে অঙ্গীকারবদ্ধ।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">১. আমরা কী কী তথ্য সংগ্রহ করি</h3>
              <p>
                এয়ার টিকিট বুকিং ও ভিসা প্রসেসিংয়ের জন্য গ্রাহকের নাম, মোবাইল নম্বর, ইমেইল, পাসপোর্ট কপি, জাতীয় পরিচয়পত্র এবং প্রয়োজনীয় ইউটিলিটি বিল সংগ্রহ করা হয়।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">২. তথ্যের ব্যবহার</h3>
              <p>
                সংগৃহীত তথ্য কেবলমাত্র এয়ারলাইন্স বুকিং (GDS), অনুমোদিত ভিসা পোর্টাল (যেমন IVAC, Nusuk) এবং পেমেন্ট রিসিট জারির কাজে ব্যবহৃত হয়। কোনো তৃতীয় পক্ষের কাছে তথ্য বিক্রি বা অননুমোদিত শেয়ার করা কঠোরভাবে নিষিদ্ধ।
              </p>
            </>
          )}

          {tab === 'refund' && (
            <>
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {lang === 'bn' ? 'টিকেট রিফান্ড, তারিখ পরিবর্তন ও বাতিল পলিসি' : 'Ticket Cancellation, Reissue & Refund Policy'}
              </h2>
              <p>
                প্রতিটি এয়ারলাইন্সের নিজস্ব ফেয়ার রুলস (Fare Rules) রয়েছে। টিকিট ক্রয় করার সময় উক্ত ফেয়ার নন-রিফান্ডেবল বা রিফান্ডেবল কিনা তা অবহিত করা হয়।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">১. তারিখ পরিবর্তন (Date Change)</h3>
              <p>
                যাত্রার তারিখ পরিবর্তনের ক্ষেত্রে এয়ারলাইন্সের অফিসিয়াল পেনাল্টি চার্জ এবং ক্লাসের ভাড়া পার্থক্য (Fare Difference) প্রযোজ্য হবে। সাথে সিয়াম এয়ারের ন্যূনতম প্রসেসিং চার্জ প্রযোজ্য।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">২. রিফান্ড প্রসেসিং সময়</h3>
              <p>
                টিকিট বাতিলের ক্ষেত্রে এয়ারলাইন্স থেকে রিফান্ড ক্লিয়ারেন্স আসার পর সরাসরি গ্রাহকের ব্যাংক একাউন্ট বা মোবাইল ব্যাংকিংয়ে অর্থ ফেরত প্রদান করা হয় (সাধারণত ৭ থেকে ২১ কার্যদিবস)।
              </p>
              <h3 className="font-bold text-slate-900 text-sm">৩. ভিসা প্রসেসিং ও সরকারি ফি</h3>
              <p>
                দূতাবাস বা ভিসা সেন্টারে (যেমন IVAC) একবার সরকারি ফি প্রদান করা হয়ে গেলে তা ফেরতযোগ্য নয়।
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
