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

interface IndiaVisaPageProps {
  navigate: (path: string) => void;
}

export const IndiaVisaPage: React.FC<IndiaVisaPageProps> = ({ navigate }) => {
  const { lang, openWhatsApp, callNow, addLead, showNotification } = useApp();
  const [visaCategory, setVisaCategory] = useState<'tourist' | 'medical' | 'business'>('tourist');

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Quick Apply Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ivacCenter, setIvacCenter] = useState('IVAC Dhaka (Jamuna Future Park)');
  const [hasPreviousVisa, setHasPreviousVisa] = useState('No');
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

    const lead = addLead({
      customerName: name.trim(),
      phone: phone.trim(),
      whatsapp: phone.trim(),
      service: 'India Visa Assistance',
      destination: 'India',
      preferredContact: 'WhatsApp',
      message: `Category: ${visaCategory.toUpperCase()} | IVAC Center: ${ivacCenter} | Previous Visa: ${hasPreviousVisa}`,
      source: 'India Visa Page'
    });

    setSubmitted(true);
    showNotification(lang === 'bn' ? 'ভারত ভিসা রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'India Visa request submitted!');
  };

  const touristChecklist = [
    { id: 't1', titleBn: 'মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ ও ২টি ফাঁকা পৃষ্ঠা)', titleEn: 'Original Passport (min 6 months validity & 2 blank pages)' },
    { id: 't2', titleBn: 'পূর্ববর্তী সকল পুরোনো পাসপোর্ট (যদি থাকে)', titleEn: 'All Previous Old Passports (if applicable)' },
    { id: 't3', titleBn: '২ x ২ ইঞ্চি ছবি (সাদা ব্যাকগ্রাউন্ড, চশমা ছাড়া, ল্যাব প্রিন্ট)', titleEn: '2x2 inch photo (white background, no glasses, lab print)' },
    { id: 't4', titleBn: 'বর্তমান ঠিকানার ইউটিলিটি বিল (বিদ্যুৎ/গ্যাস/টেলিফোন বিল কপি)', titleEn: 'Utility Bill of current address (Electricity/Gas/Landline)' },
    { id: 't5', titleBn: 'ব্যাংক স্টেটমেন্ট (সর্বনিম্ন ২০,০০০ টাকা) অথবা $150 ডলার এন্ডোর্সমেন্ট', titleEn: 'Bank Statement (min 20,000 BDT) or $150 Dollar Endorsement' },
    { id: 't6', titleBn: 'জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্মনিবন্ধন সনদ', titleEn: 'National ID card (NID) or verified Birth Certificate' },
    { id: 't7', titleBn: 'পেশাগত প্রমাণপত্র: চাকরিজীবীদের NOC/ট্রেড লাইসেন্স/ছাত্র আইডি', titleEn: 'Profession proof: NOC / Trade License / Student ID' }
  ];

  const medicalChecklist = [
    { id: 'm1', titleBn: 'ভারতের স্বনামধন্য হাসপাতালের মেডিকেল আমন্ত্রণপত্র (Medical Invitation Letter)', titleEn: 'Medical Invitation Letter from recognised Indian hospital' },
    { id: 'm2', titleBn: 'বাংলাদেশের ডাক্তারের প্রেসক্রিপশন ও সর্বশেষ টেস্ট রিপোর্ট', titleEn: 'Local doctor prescription & latest medical test reports' },
    { id: 'm3', titleBn: 'রোগী এবং অ্যাটেনডেন্টের মূল পাসপোর্ট ও পুরোনো পাসপোর্ট', titleEn: 'Original Passport of patient & medical attendants' },
    { id: 'm4', titleBn: '২ x ২ ইঞ্চি সাইজ ছবি (রোগী ও অ্যাটেনডেন্ট প্রত্যেকের)', titleEn: '2x2 inch recent photos of patient and attendant' },
    { id: 'm5', titleBn: 'ব্যাংক স্টেটমেন্ট ও আর্থিক সক্ষমতার প্রমাণ (মিনিমাম ব্যালেন্স)', titleEn: 'Bank Statement proving sufficient treatment funds' },
    { id: 'm6', titleBn: 'ইউটিলিটি বিল কপি ও এনআইডি/জন্মনিবন্ধন', titleEn: 'Current Utility Bill & National ID/Birth Certificates' }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🇮🇳</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                {lang === 'bn' ? 'ভারত ভিসা প্রসেসিং ও আইভ্যাক সহায়তা' : 'India Visa Processing & IVAC Assistance'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {lang === 'bn'
                ? 'আইভ্যাক ফর্ম পূরণ, অ্যাপয়েন্টমেন্ট ও নির্ভুল ফাইল প্রসেসিং'
                : 'IVAC Form Filling, Appointment & Certified File Processing'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'ভ্রমণ, জরুরি চিকিৎসা বা ব্যবসায়িক প্রয়োজনে ভারত ভিসা আবেদনের পূর্ণ প্রক্রিয়া আমরা বিশ্বস্ততার সাথে সম্পন্ন করে থাকি।'
                : 'Complete end-to-end guidance for Indian Tourist, Medical, and Business Visas with IVAC appointment support and document validation.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Category Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto border border-slate-200">
          <button
            type="button"
            onClick={() => setVisaCategory('tourist')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              visaCategory === 'tourist'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'ট্যুরিস্ট ভিসা (Tourist)' : 'Tourist Visa'}
          </button>
          <button
            type="button"
            onClick={() => setVisaCategory('medical')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              visaCategory === 'medical'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'মেডিকেল ভিসা (Medical)' : 'Medical Visa'}
          </button>
          <button
            type="button"
            onClick={() => setVisaCategory('business')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              visaCategory === 'business'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? 'বিজনেস ভিসা (Business)' : 'Business Visa'}
          </button>
        </div>
      </section>

      {/* 3. Main Content: Interactive Checklist & Apply Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checklist Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-blue-700" />
                    <span>
                      {visaCategory === 'tourist' && (lang === 'bn' ? 'ট্যুরিস্ট ভিসার প্রয়োজনীয় কাগজপত্র' : 'Tourist Visa Document Checklist')}
                      {visaCategory === 'medical' && (lang === 'bn' ? 'মেডিকেল ভিসার প্রয়োজনীয় কাগজপত্র' : 'Medical Visa Document Checklist')}
                      {visaCategory === 'business' && (lang === 'bn' ? 'বিজনেস ভিসার প্রয়োজনীয় কাগজপত্র' : 'Business Visa Document Checklist')}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'bn'
                      ? 'টিক চিহ্ন দিয়ে যাচাই করুন আপনার কোন কোন কাগজপত্র প্রস্তুত রয়েছে:'
                      : 'Check off the documents you already have prepared:'}
                  </p>
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3">
                {(visaCategory === 'medical' ? medicalChecklist : touristChecklist).map((item) => (
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

              {/* Special warning regarding utility bill */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  {lang === 'bn' ? 'গুরুত্বপূর্ণ সতর্কতা (ইউটিলিটি বিল):' : 'Important Note on Utility Bills:'}
                </span>
                <p>
                  {lang === 'bn'
                    ? 'আইভ্যাক সেন্টারের নিয়ম অনুযায়ী বিদ্যুৎ বা গ্যাস বিলের ঠিকানার সাথে আপনার আবেদনপত্রে উল্লেখিত বর্তমান ঠিকানা হুবহু এক হতে হবে। বিলটি সাম্প্রতিক (গত ৩ মাসের মধ্যকার) হতে হবে।'
                    : 'The current address in the IVAC application must match the utility bill (Electricity/Gas) exactly, and the bill must be from within the last 3 months.'}
                </p>
              </div>
            </div>

            {/* Step-by-step Process */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'ভারত ভিসা প্রসেসিংয়ের ধাপসমূহ' : 'Step-by-Step Processing Journey'}
              </h4>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">১</span>
                  <span><strong>কাগজপত্র যাচাই ও ছবি প্রিন্ট:</strong> আমাদের অফিসে ডকুমেন্টস জমা দিন বা হোয়াটসঅ্যাপে ক্লিয়ার স্ক্যান পাঠান।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">২</span>
                  <span><strong>আইভ্যাক অনলাইন ফর্ম পূরণ:</strong> নির্ভুলভাবে আপনার ভিসা আবেদনপত্র অনলাইনে সাবমিট করা হয়।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">৩</span>
                  <span><strong>আইভ্যাক ফি ও অ্যাপয়েন্টমেন্ট:</strong> সরকারি আইভ্যাক ফি (৮০০-৮৫০ টাকা) প্রদান ও তারিখ নির্ধারণ।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">৪</span>
                  <span><strong>আইভ্যাক সেন্টারে জমা:</strong> নির্দিষ্ট তারিখে সংশ্লিষ্ট আইভ্যাক সেন্টারে ফাইল ও পাসপোর্ট জমা।</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Quick Apply Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 sticky top-24">
              <div>
                <span className="text-[11px] font-bold uppercase text-blue-700 tracking-wider">
                  {lang === 'bn' ? 'সরাসরি প্রসেসিং সহায়তা' : 'Instant Filing Assistance'}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {lang === 'bn' ? 'ভারত ভিসার আবেদন শুরু করুন' : 'Apply for India Visa Assistance'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'আপনার তথ্য দিন, আমরা আইভ্যাক সেন্টারের স্লট ও ফাইল তৈরিতে সহায়তা করব।'
                    : 'Submit your contact details and our visa desk will initiate your file.'}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {lang === 'bn' ? 'আবেদন তথ্য গৃহীত হয়েছে!' : 'Application Details Received!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {lang === 'bn'
                      ? 'আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে। অবিলম্বে প্রসেস শুরু করতে হোয়াটসঅ্যাপে চ্যাট করুন।'
                      : 'Our team will contact you shortly. Continue on WhatsApp for priority booking.'}
                  </p>
                  <button
                    onClick={() => openWhatsApp(lang === 'bn' ? `আসসালামু আলাইকুম, আমি ভারত ${visaCategory} ভিসার আবেদন সম্পন্ন করতে চাই। নাম: ${name}, ফোন: ${phone}` : `Hello, I want to process my India ${visaCategory} visa. Name: ${name}`)}
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
                      {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'bn' ? 'পাসপোর্টের নামের সাথে মিল রেখে' : 'As in Passport'}
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'পছন্দের আইভ্যাক সেন্টার (IVAC Center)' : 'Preferred IVAC Center'}
                    </label>
                    <select
                      value={ivacCenter}
                      onChange={(e) => setIvacCenter(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="IVAC Dhaka (Jamuna Future Park)">IVAC Dhaka (যমুনা ফিউচার পার্ক)</option>
                      <option value="IVAC Cumilla">IVAC Cumilla (কুমিল্লা)</option>
                      <option value="IVAC Brahmanbaria">IVAC Brahmanbaria (ব্রাহ্মণবাড়িয়া)</option>
                      <option value="IVAC Chittagong">IVAC Chittagong (চট্টগ্রাম)</option>
                      <option value="IVAC Sylhet">IVAC Sylhet (সিলেট)</option>
                      <option value="IVAC Rajshahi">IVAC Rajshahi (রাজশাহী)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'পূর্বে কি ভারত ভ্রমণ করেছেন?' : 'Previous India Travel?'}
                    </label>
                    <select
                      value={hasPreviousVisa}
                      onChange={(e) => setHasPreviousVisa(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="No">না, এটি আমার প্রথম আবেদন (First Time)</option>
                      <option value="Yes">হ্যাঁ, পূর্বে ভারত ভিসা ছিল (Had Previous Visa)</option>
                    </select>
                  </div>

                  {/* Fee Summary */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">সরকারি আইভ্যাক ফি:</span>
                      <span className="font-semibold text-slate-800">৳ ৮০০ - ৮৫০ (সরাসরি প্রযোজ্য)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">সিয়াম এয়ার সার্ভিস চার্জ:</span>
                      <span className="font-bold text-blue-700">৳ ৫০০ - ১,০০০</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'ফাইল প্রসেসিং শুরু করুন' : 'Start Application Assistance'}</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>জরুরি জিজ্ঞাসা? সরাসরি কল দিন:</span>
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
