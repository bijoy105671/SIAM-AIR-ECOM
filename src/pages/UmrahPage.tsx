import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building,
  CheckCircle,
  Clock,
  MapPin,
  Plane,
  Phone,
  MessageCircle,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface UmrahPageProps {
  navigate: (path: string) => void;
}

export const UmrahPage: React.FC<UmrahPageProps> = ({ navigate }) => {
  const { lang, umrahPackages, openWhatsApp, callNow, openEnquiryModal } = useApp();

  return (
    <div className="space-y-16 py-8">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
              {lang === 'bn' ? 'পবিত্র ওমরাহ হজ্ব সেবা ও প্যাকেজ' : 'Sacred Umrah Pilgrimage Packages'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {lang === 'bn'
                ? 'হারামের সন্নিকটে আরামদায়ক হোটেল ও নিশ্চিত সেবায় ওমরাহ পালন'
                : 'Peaceful Umrah Experience with Authentic Care & Prime Hotels'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস দিচ্ছে সরাসরি ফ্লাইট, মক্কা ও মদিনা শরীফের নিকটবর্তী হোটেল, এসি পরিবহন, ঐতিহাসিক স্থানসমূহ জিয়ারাহ এবং অভিজ্ঞ মোয়াল্লিমের তত্ত্বাবধানে ওমরাহ প্যাকেজ।'
                : 'Direct flight options, hotels in close walking distance to Masjid al-Haram and Masjid an-Nabawi, VIP air-conditioned transfers, and knowledgeable guides.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp(lang === 'bn' ? 'আসসালামু আলাইকুম, আমি সিয়াম এয়ারের ওমরাহ প্যাকেজ সম্পর্কে জানতে আগ্রহী।' : 'Hello, I want to inquire about your Umrah packages.')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'bn' ? 'ওমরাহ ডেস্কে হোয়াটসঅ্যাপ' : 'WhatsApp Umrah Specialist'}</span>
              </button>
              <button
                onClick={callNow}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Umrah Desk'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'bn' ? 'আমাদের ওমরাহ অফারসমূহ' : 'Featured Umrah Packages'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'আপনার বাজেট ও পছন্দ অনুযায়ী প্যাকেজ' : 'Tailored to Your Budget & Schedule'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn' ? 'প্যাকেজে কোনো অস্পষ্টতা নেই। প্রতিটি সেবার বিবরণ পূর্বে থেকেই স্পষ্টভাবে জানানো হয়।' : 'Transparent inclusions with no hidden surcharges.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umrahPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
                    {lang === 'bn' ? pkg.durationBn : pkg.durationEn}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{lang === 'bn' ? pkg.makkahHotelDistBn : pkg.makkahHotelDistEn}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {lang === 'bn' ? pkg.nameBn : pkg.nameEn}
                  </h3>
                  <div className="text-2xl font-black text-blue-700 mt-2">
                    {lang === 'bn' ? pkg.priceNoteBn : pkg.priceNoteEn}
                  </div>
                </div>

                {/* Hotels */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{lang === 'bn' ? `মক্কা হোটেল (${pkg.makkahNights} রাত): ${pkg.makkahHotelDistBn}` : `Makkah Hotel (${pkg.makkahNights} nights): ${pkg.makkahHotelDistEn}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'bn' ? `মদিনা হোটেল (${pkg.madinahNights} রাত): ${pkg.madinahHotelDistBn}` : `Madinah Hotel (${pkg.madinahNights} nights): ${pkg.madinahHotelDistEn}`}</span>
                  </div>
                </div>

                {/* Inclusions list */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {lang === 'bn' ? 'প্যাকেজে যা যা অন্তর্ভুক্ত:' : 'Package Inclusions:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(lang === 'bn' ? pkg.inclusionsBn : pkg.inclusionsEn).map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => openEnquiryModal(pkg.nameEn)}
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'কোটেশন নিন' : 'Book Package'}
                </button>
                <button
                  onClick={() => openWhatsApp(lang === 'bn' ? `আমি ${pkg.nameBn} সম্পর্কে বিস্তারিত জানতে চাই` : `I want to inquire about ${pkg.nameEn}`)}
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

      {/* 3. Umrah Pillars & Preparation Guidance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'ওমরাহ নির্দেশিকা' : 'Essential Pilgrim Guidance'}
            </span>
            <h3 className="text-2xl font-bold">
              {lang === 'bn' ? 'পবিত্র ওমরাহ পালনের প্রাথমিক প্রস্তুতি' : 'Preparation & Support From Our Team'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xl">🕋</span>
              <h4 className="font-bold text-white text-sm">ইহরাম ও নিয়ত</h4>
              <p className="leading-relaxed">
                ফ্লাইটে ওঠার আগে বা মিকাত অতিক্রমের পূর্বে ইহরাম পরিধান ও ওমরাহর নিয়ত নির্দেশিকা আমরা ভ্রমণের পূর্বে প্রতিটি যাত্রীকে বুঝিয়ে দিই।
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xl">📱</span>
              <h4 className="font-bold text-white text-sm">নুসুক (Nusuk) অ্যাপ পারমিট</h4>
              <p className="leading-relaxed">
                পবিত্র রওজা মোবারক জিয়ারত ও ওমরাহর জন্য সৌদি সরকারের বাধ্যতামূলক নুসুক অ্যাপ স্লট বুকিং আমাদের টিম আগে থেকেই কনফার্ম করে দেয়।
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xl">🕌</span>
              <h4 className="font-bold text-white text-sm">ঐতিহাসিক জিয়ারাহ</h4>
              <p className="leading-relaxed">
                মক্কার জাবালে নূর, সাওর, মিনা, আরাফাত এবং মদিনার মসজিদ আল-কুবা, ওহুদ পাহাড় ইত্যাদি বরকতময় স্থানসমূহ অভিজ্ঞ গাইডের সাথে পরিদর্শন।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
