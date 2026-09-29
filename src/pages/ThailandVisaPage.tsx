import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  CheckCircle,
  Clock,
  ShieldAlert,
  HelpCircle,
  Phone,
  MessageCircle,
  FileText,
  AlertCircle,
  Send,
  ArrowRight
} from 'lucide-react';

interface ThailandVisaPageProps {
  navigate: (path: string) => void;
}

export const ThailandVisaPage: React.FC<ThailandVisaPageProps> = ({ navigate }) => {
  const { lang, openWhatsApp, callNow, addLead, showNotification } = useApp();

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelMonth, setTravelMonth] = useState('');
  const [travelers, setTravelers] = useState('1');
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
      service: 'Thailand Visa Assistance',
      destination: 'Thailand',
      passengerCount: parseInt(travelers, 10) || 1,
      preferredContact: 'WhatsApp',
      message: `Travel Month: ${travelMonth || 'Flexible'} | Travelers: ${travelers} | Thai Tourist Visa`,
      source: 'Thailand Visa Page'
    });

    setSubmitted(true);
    showNotification(lang === 'bn' ? 'থাইল্যান্ড ভিসা রিকোয়েস্ট জমা হয়েছে!' : 'Thailand visa request submitted!');
  };

  const thaiChecklist = [
    { id: 'th1', titleBn: 'মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ ও ২টি খালি ভিসা পৃষ্ঠা)', titleEn: 'Original Passport (min 6 months validity & 2 blank pages)' },
    { id: 'th2', titleBn: '২ কপি ছবি: ৩.৫ x ৪.৫ সেমি, ম্যাট পেপার, সাদা ব্যাকগ্রাউন্ড, কান ও মুখ স্পষ্ট', titleEn: '2 photos: 3.5 x 4.5 cm, matte paper, white background' },
    { id: 'th3', titleBn: 'বিগত ৬ মাসের অরিজিনাল ব্যাংক স্টেটমেন্ট (মিনিমাম ৬০,০০০ টাকা ব্যালেন্স)', titleEn: 'Original 6 months Bank Statement (min BDT 60,000 balance)' },
    { id: 'th4', titleBn: 'ব্যাংক সলভেন্সি সার্টিফিকেট (সংশ্লিষ্ট ব্যাংক থেকে সিল ও স্বাক্ষরসহ)', titleEn: 'Bank Solvency Certificate from issuing bank' },
    { id: 'th5', titleBn: 'কনফার্মড রিটার্ন এয়ার টিকিট বুকিং (আমরা ফাইল প্রস্তুত করে দিই)', titleEn: 'Confirmed Return Flight Reservation (Provided by us)' },
    { id: 'th6', titleBn: 'কনফার্মড হোটেল বুকিং ভাউচার (আমরা প্রস্তুত করে দিই)', titleEn: 'Confirmed Hotel Booking Voucher (Provided by us)' },
    { id: 'th7', titleBn: 'পেশাগত প্রমাণপত্র: চাকরিজীবীদের নো অবজেকশন সার্টিফিকেট (NOC) ও ভিজিটিং কার্ড', titleEn: 'Profession proof: NOC & visiting card / Trade license' }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇹🇭</span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              {lang === 'bn' ? 'থাইল্যান্ড ট্যুরিস্ট ভিসা প্রসেসিং' : 'Thailand Tourist Visa Processing'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'থাইল্যান্ড ভ্রমণ ভিসা ফাইল প্রস্তুতি ও সম্পূর্ণ সহায়তা'
              : 'Thailand Tourist Visa File Preparation & Guidance'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'ব্যাংক স্টেটমেন্ট ও সলভেন্সি নিয়মাবলী, এয়ার টিকিট ও হোটেল বুকিং ভাউচার প্রস্তুত সহ রয়্যাল থাই দূতাবাসের সকল শর্ত মেনে নির্ভুল ফাইল তৈরি সেবা।'
              : 'End-to-end guidance complying with Royal Thai Embassy specifications: bank solvency verification, photo standards, air ticket itineraries, and verified hotel vouchers.'}
          </p>
        </div>
      </section>

      {/* 2. Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Requirements & Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-700" />
                  <span>{lang === 'bn' ? 'থাইল্যান্ড ভিসার আবশ্যিক চেকলিস্ট' : 'Mandatory Document Checklist'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'আবেদনের পূর্বে নিচের ডকুমেন্টসগুলো প্রস্তুত রয়েছে কিনা টিক দিয়ে দেখুন:'
                    : 'Verify that you have all the required paperwork ready:'}
                </p>
              </div>

              <div className="space-y-3">
                {thaiChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      checkedItems[item.id]
                        ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedItems[item.id]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-blue-700 focus:ring-0 mt-0.5"
                    />
                    <span className="text-xs font-semibold leading-relaxed">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bank Statement Rule Notice */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-1">
                <span className="font-bold block flex items-center gap-1.5 text-blue-900">
                  <AlertCircle className="w-4 h-4 text-blue-700" />
                  {lang === 'bn' ? 'ব্যাংক ব্যালেন্স সংক্রান্ত জরুরি নির্দেশনা:' : 'Bank Balance Requirements:'}
                </span>
                <p className="leading-relaxed">
                  {lang === 'bn'
                    ? 'একক আবেদনকারীর ক্ষেত্রে ব্যাংক একাউন্টে সমাপনী ব্যালেন্স কমপক্ষে ৬০,০০০ টাকা এবং পরিবারের ক্ষেত্রে কমপক্ষে ১,২০,০০০ টাকা থাকতে হবে। স্টেটমেন্ট অবশ্যই বিগত ৬ মাসের নিয়মিত লেনদেনযুক্ত হতে হবে।'
                    : 'Single applicant requires minimum closing balance of BDT 60,000; family applications require min BDT 120,000 with steady transactions across past 6 months.'}
                </p>
              </div>
            </div>

            {/* Inclusions by Siam Air */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস যেসকল সেবা অন্তর্ভুক্ত করে:' : 'Included in Siam Air Processing:'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>থাই দূতাবাস নির্ধারিত অফিসিয়াল ভিসা অ্যাপ্লিকেশন ফর্ম নির্ভুলভাবে পূরণ।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>কনফার্মড এয়ার টিকিট বুকিং ও পিএনআর সম্বলিত রিটার্ন ফ্লাইট আইটিনারারি।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ব্যাংকক / পাতায়া হোটেলের অফিসিয়াল কনফার্মড বুকিং ভাউচার।</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>প্রফেশনাল কাভারিং লেটার / ফরোয়ার্ডিং লেটার ড্রাফট ও প্রিন্ট।</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Quick Apply */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 sticky top-24">
              <div>
                <span className="text-[11px] font-bold uppercase text-blue-700 tracking-wider">
                  {lang === 'bn' ? 'দ্রুত ফাইল প্রসেসিং' : 'Hassle-Free Processing'}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {lang === 'bn' ? 'থাইল্যান্ড ভিসার জন্য যোগাযোগ' : 'Apply for Thailand Visa'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'আপনার তথ্য প্রদান করুন, আমাদের ভিসা স্পেশালিস্ট অতি দ্রুত যোগাযোগ করবেন।'
                    : 'Submit your contact info to get full guidance on appointment & submission.'}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {lang === 'bn' ? 'রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'Request Received!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {lang === 'bn'
                      ? 'আমরা আপনার ফাইল চেক করে অবিলম্বে কল বা হোয়াটসঅ্যাপে জানাচ্ছি।'
                      : 'We will review your application requirements and contact you immediately.'}
                  </p>
                  <button
                    onClick={() => openWhatsApp(lang === 'bn' ? `আসসালামু আলাইকুম, আমি থাইল্যান্ড ভিসা প্রসেসিং শুরু করতে চাই। নাম: ${name}` : `Hello, I want to process my Thailand tourist visa. Name: ${name}`)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp চ্যাটে চালিয়ে যান</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'bn' ? 'পাসপোর্ট অনুযায়ী নাম' : 'Name as in passport'}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'bn' ? 'ভ্রমণের মাস' : 'Travel Month'}
                      </label>
                      <input
                        type="month"
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'bn' ? 'আবেদনকারী সংখ্যা' : 'Travelers'}
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="1">১ জন (Single)</option>
                        <option value="2">২ জন (Couple)</option>
                        <option value="3">৩-৪ জন (Family)</option>
                        <option value="5+">৫+ জন (Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing info */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">দূতাবাস ফি (Embassy):</span>
                      <span className="font-semibold text-slate-800">৳ ৪,০০০ - ৫,০০০ (নিয়মানুযায়ী)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">প্রসেসিং চার্জ (হোটেল ও টিকিটসহ):</span>
                      <span className="font-bold text-blue-700">৳ ১,৫০০ - ২,৫০০</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'থাই ভিসা প্রসেসিং রিকোয়েস্ট পাঠান' : 'Submit Thai Visa Request'}</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>জরুরি যোগাযোগ:</span>
                <button onClick={callNow} className="font-bold text-blue-700 hover:underline cursor-pointer">
                  +8801883400808
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
