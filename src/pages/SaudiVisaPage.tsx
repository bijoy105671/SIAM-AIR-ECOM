import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  CheckCircle,
  Clock,
  ShieldAlert,
  Phone,
  MessageCircle,
  AlertCircle,
  Send,
  Building,
  ArrowRight
} from 'lucide-react';

interface SaudiVisaPageProps {
  navigate: (path: string) => void;
}

export const SaudiVisaPage: React.FC<SaudiVisaPageProps> = ({ navigate }) => {
  const { lang, openWhatsApp, callNow, addLead, showNotification } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visaType, setVisaType] = useState('Umrah E-Visa (90 Days)');
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showNotification(
        lang === 'bn' ? 'দয়া করে আপনার নাম ও মোবাইল নম্বর দিন' : 'Please provide name and phone number',
        'error'
      );
      return;
    }

    addLead({
      customerName: name.trim(),
      phone: phone.trim(),
      whatsapp: phone.trim(),
      service: 'Saudi / Umrah Visa',
      destination: 'Saudi Arabia',
      preferredContact: 'WhatsApp',
      message: `Selected: ${visaType} | Direct Inquiry from Saudi Visa Page`,
      source: 'Saudi Visa Page'
    });

    setSubmitted(true);
    showNotification(lang === 'bn' ? 'সৌদি ভিসা রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'Saudi visa request received!');
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇸🇦</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
              {lang === 'bn' ? 'সৌদি আরব ভিসা ও ওমরাহ ই-ভিসা' : 'Saudi Arabia Visa & Umrah E-Visa'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'সৌদি ওমরাহ ই-ভিসা, ট্যুরিস্ট ভিসা ও ট্রানজিট ভিসা সেবা'
              : 'Saudi Umrah E-Visa, Tourist E-Visa & Transit Visa Assistance'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'পবিত্র ওমরাহ পালন বা সৌদিতে পারিবারিক ভ্রমণের জন্য দ্রুততম সময়ে অনুমোদিত ওমরাহ ই-ভিসা ও নুসুক (Nusuk) অ্যাপ সহায়তা প্রদান করি।'
              : 'Fast-track electronic visa issuance for pilgrimage and tourism with mandatory medical insurance, Nusuk registration, and hotel/flight sync.'}
          </p>
        </div>
      </section>

      {/* 2. Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {/* Visa Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-2xl">🕋</span>
                <h3 className="font-bold text-slate-900 text-base">ওমরাহ ই-ভিসা (Umrah Visa)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  মক্কা ও মদিনা সহ সৌদি আরবের যেকোনো শহরে ভ্রমণের সুবিধা। ৯০ দিন মেয়াদী সিঙ্গেল/মাল্টিপল ওমরাহ ভিসা।
                </p>
                <div className="text-[11px] text-emerald-700 font-bold">প্রসেসিং সময়: ২৪ থেকে ৭২ ঘণ্টা</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-2xl">🌍</span>
                <h3 className="font-bold text-slate-900 text-base">ট্যুরিস্ট ই-ভিসা (Tourist Visa)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  যাঁরা ওমরাহ পালনসহ সৌদি আরবের বিভিন্ন পর্যটন শহর যেমন রিয়াদ, জেদ্দা, তায়েফ ভ্রমণ করতে চান।
                </p>
                <div className="text-[11px] text-blue-700 font-bold">প্রসেসিং সময়: ২৪ থেকে ৪৮ ঘণ্টা</div>
              </div>
            </div>

            {/* Simple Requirements */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'bn' ? 'সৌদি ওমরাহ ই-ভিসার জন্য যা যা প্রয়োজন:' : 'Required Documents for Umrah Visa:'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>পাসপোর্টের স্পষ্ট স্ক্যান কপি (কমপক্ষে ৬ মাস মেয়াদ থাকতে হবে)।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>সাদা ব্যাকগ্রাউন্ডে তোলা ডিজিটাল পাসপোর্ট সাইজ ছবি।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্মনিবন্ধন সনদ।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>পবিত্র ওমরাহ পারমিট ও নুসুক অ্যাপ প্রোফাইল প্রস্তুতিতে পূর্ণ সহায়তা।</span>
                </li>
              </ul>
            </div>

            {/* Umrah Package Link Box */}
            <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base">সম্পূর্ণ ওমরাহ প্যাকেজ খুঁজছেন?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  ফ্লাইট টিকেট, ভিসা, মক্কা-মদিনা হোটেল এবং যাতায়াত পরিবহন সহ পূর্ণাঙ্গ প্যাকেজ।
                </p>
              </div>
              <button
                onClick={() => navigate('/umrah')}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shrink-0 cursor-pointer"
              >
                প্যাকেজ দেখুন →
              </button>
            </div>
          </div>

          {/* Right: Apply */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 sticky top-24">
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                  {lang === 'bn' ? 'অনলাইন ই-ভিসা ডেস্ক' : 'Online Saudi E-Visa Desk'}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {lang === 'bn' ? 'সৌদি ভিসার তথ্য ও আবেদন' : 'Request Saudi / Umrah Visa'}
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {lang === 'bn' ? 'তথ্য সফলভাবে গৃহীত হয়েছে!' : 'Request Received!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    আমাদের ওমরাহ ও ভিসা স্পেশালিস্ট কিছুক্ষণের মধ্যেই যোগাযোগ করবেন।
                  </p>
                  <button
                    onClick={() => openWhatsApp(lang === 'bn' ? `আসসালামু আলাইকুম, আমি সৌদি ওমরাহ ই-ভিসা করতে চাই। নাম: ${name}` : `Hello, I want to apply for Saudi Umrah visa. Name: ${name}`)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp চ্যাটে যোগাযোগ</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'bn' ? 'পাসপোর্ট অনুযায়ী নাম' : 'Name as in passport'}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'ভিসার ধরন' : 'Visa Type'}
                    </label>
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Umrah E-Visa (90 Days)">ওমরাহ ই-ভিসা (Umrah E-Visa)</option>
                      <option value="Saudi Tourist E-Visa">সৌদি ট্যুরিস্ট ই-ভিসা (Tourist E-Visa)</option>
                      <option value="Saudi Family Visit Visa">পারিবারিক ভিজিট ভিসা (Family Visit Visa)</option>
                      <option value="Stopover / Transit Visa">ট্রানজিট / স্টপওভার ভিসা (Transit Visa)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'সৌদি ভিসা রিকোয়েস্ট পাঠান' : 'Submit Saudi Visa Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
