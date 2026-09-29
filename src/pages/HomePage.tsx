import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  ShieldCheck,
  Clock,
  CheckCircle,
  HelpCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Compass,
  FileCheck,
  Star,
  ChevronDown,
  ChevronUp,
  Building,
  CreditCard,
  QrCode
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const {
    lang,
    businessInfo,
    services,
    visaServices,
    umrahPackages,
    specialOffers,
    openWhatsApp,
    callNow,
    openEnquiryModal
  } = useApp();

  // Search Widget State
  const [activeTab, setActiveTab] = useState<'flight' | 'visa' | 'umrah' | 'service'>('flight');
  const [flightTripType, setFlightTripType] = useState<'oneway' | 'round'>('oneway');
  const [fromCity, setFromCity] = useState('Dhaka (DAC)');
  const [toCity, setToCity] = useState('Jeddah (JED)');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'flight') {
      const query = lang === 'bn'
        ? `আসসালামু আলাইকুম, আমি এয়ার টিকিট বুকিং ও ভাড়ার তথ্য জানতে চাই।
রুট: ${fromCity} থেকে ${toCity}
ভ্রমণ ধরন: ${flightTripType === 'oneway' ? 'ওয়ান-ওয়ে' : 'রাউন্ড-ট্রিপ'}
ভ্রমণ তারিখ: ${travelDate || 'অপেক্ষমান'}
যাত্রী: ${passengers} জন`
        : `Hello Siam Air & Digital, I want to check flight fares.
Route: ${fromCity} to ${toCity}
Type: ${flightTripType === 'oneway' ? 'One Way' : 'Round Trip'}
Date: ${travelDate || 'Flexible'}
Passengers: ${passengers}`;
      openWhatsApp(query);
    } else if (activeTab === 'visa') {
      navigate('/visa');
    } else if (activeTab === 'umrah') {
      navigate('/umrah');
    } else {
      openEnquiryModal();
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {lang === 'bn'
                    ? 'হোমনা, কুমিল্লায় অনুমোদিত ও বিশ্বস্ত ট্রাভেল সেবা'
                    : 'Trusted Travel & Digital Agency in Homna, Cumilla'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {lang === 'bn' ? (
                  <>
                    স্বল্প খরচে নির্ভুল <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">এয়ার টিকিট</span> ও দ্রুত{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100">ভিসা প্রসেসিং</span>
                  </>
                ) : (
                  <>
                    Fast Air Ticketing, Reliable{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">Visa Processing</span> &{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100">Umrah Packages</span>
                  </>
                )}
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস দিচ্ছে সকল এয়ারলাইন্সের টিকিট, ভারত, থাইল্যান্ড, সৌদি আরব ও অন্যান্য দেশের ভিসা ফাইল প্রসেসিং এবং প্রিমিয়াম ওমরাহ সেবা।'
                  : 'Siam Air & Digital Service provides genuine flight booking assistance, hassle-free visa processing for India, Thailand, Saudi Arabia, and peaceful Umrah packages with full transparency.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে দ্রুত কোটেশন' : 'Instant WhatsApp Quote'}</span>
                </button>

                <button
                  onClick={callNow}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all cursor-pointer text-sm"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'bn' ? 'সরাসরি কল: ' + businessInfo.phone : 'Call: ' + businessInfo.phone}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800 text-left">
                <div className="space-y-1">
                  <div className="text-lg font-black text-white">১০০% নির্ভুল</div>
                  <div className="text-xs text-slate-400">ডকুমেন্ট ও ফাইল প্রস্তুতি</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-white">২৪/৭ সাপোর্ট</div>
                  <div className="text-xs text-slate-400">জরুরি হোয়াটসঅ্যাপ সেবা</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-white">জিরো হিডেন ফি</div>
                  <div className="text-xs text-slate-400">স্বচ্ছ ও নিরাপদ পেমেন্ট</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Quick Fare / Service Finder Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-5 sm:p-6 border border-slate-100">
                {/* Tab Selector */}
                <div className="flex border-b border-slate-200 pb-3 mb-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('flight')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'flight'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'এয়ার টিকিট' : 'Flight'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('visa')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'visa'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ভিসা' : 'Visa'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('umrah')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'umrah'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ওমরাহ' : 'Umrah'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('service')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'service'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'অন্যান্য' : 'Services'}</span>
                  </button>
                </div>

                {/* Form Body */}
                {activeTab === 'flight' && (
                  <form onSubmit={handleSearchSubmit} className="space-y-3.5">
                    {/* One-way vs Round-trip */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="tripType"
                          checked={flightTripType === 'oneway'}
                          onChange={() => setFlightTripType('oneway')}
                          className="text-blue-700"
                        />
                        <span>{lang === 'bn' ? 'ওয়ান-ওয়ে (One-Way)' : 'One-Way'}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="tripType"
                          checked={flightTripType === 'round'}
                          onChange={() => setFlightTripType('round')}
                          className="text-blue-700"
                        />
                        <span>{lang === 'bn' ? 'রাউন্ড-ট্রিপ (Round-Trip)' : 'Round-Trip'}</span>
                      </label>
                    </div>

                    {/* From & To City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {lang === 'bn' ? 'যাত্রা শুরুর স্থান (From)' : 'From'}
                        </label>
                        <select
                          value={fromCity}
                          onChange={(e) => setFromCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        >
                          <option value="Dhaka (DAC)">Dhaka (DAC) - হজরত শাহজালাল</option>
                          <option value="Chittagong (CGP)">Chittagong (CGP) - শাহ আমানত</option>
                          <option value="Sylhet (ZYL)">Sylhet (ZYL) - ওসমানী</option>
                          <option value="Cox's Bazar (CXB)">Cox's Bazar (CXB)</option>
                          <option value="Jeddah (JED)">Jeddah (JED)</option>
                          <option value="Riyadh (RUH)">Riyadh (RUH)</option>
                          <option value="Dubai (DXB)">Dubai (DXB)</option>
                          <option value="Kolkata (CCU)">Kolkata (CCU)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {lang === 'bn' ? 'গন্তব্য (To)' : 'To'}
                        </label>
                        <select
                          value={toCity}
                          onChange={(e) => setToCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        >
                          <option value="Jeddah (JED)">Jeddah (JED) - সৌদি আরব</option>
                          <option value="Medina (MED)">Medina (MED) - মদিনা</option>
                          <option value="Riyadh (RUH)">Riyadh (RUH) - রিয়াদ</option>
                          <option value="Dubai (DXB)">Dubai (DXB) - ইউএই</option>
                          <option value="Bangkok (BKK)">Bangkok (BKK) - থাইল্যান্ড</option>
                          <option value="Kolkata (CCU)">Kolkata (CCU) - ভারত</option>
                          <option value="Delhi (DEL)">Delhi (DEL) - ভারত</option>
                          <option value="Kuala Lumpur (KUL)">Kuala Lumpur (KUL) - মালয়েশিয়া</option>
                          <option value="Singapore (SIN)">Singapore (SIN)</option>
                          <option value="London (LHR)">London (LHR) - ইউকে</option>
                          <option value="Cox's Bazar (CXB)">Cox's Bazar (CXB) - অভ্যন্তরীণ</option>
                        </select>
                      </div>
                    </div>

                    {/* Travel Date & Passengers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {lang === 'bn' ? 'ভ্রমণ তারিখ (Date)' : 'Travel Date'}
                        </label>
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {lang === 'bn' ? 'যাত্রী সংখ্যা (Pax)' : 'Passengers'}
                        </label>
                        <select
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                        >
                          <option value="1">১ জন প্রাপ্তবয়স্ক (1 Adult)</option>
                          <option value="2">২ জন (2 Passengers)</option>
                          <option value="3">৩ জন (3 Passengers)</option>
                          <option value="4+">৪+ পরিবার বা গ্রুপ (4+ Group)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
                    >
                      <Plane className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'আজকের সর্বনিম্ন ভাড়া জানুন' : 'Check Today’s Best Fare'}</span>
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">
                      {lang === 'bn'
                        ? 'সরাসরি এয়ারলাইন্স জিডিএস থেকে সেরা মূল্যে টিকেট বুকিং নিশ্চিত করুন।'
                        : 'Real-time GDS quotation with genuine airline baggage allowance.'}
                    </p>
                  </form>
                )}

                {activeTab === 'visa' && (
                  <div className="space-y-4 py-2">
                    <p className="text-xs text-slate-600">
                      {lang === 'bn'
                        ? 'কোন দেশের ভিসা আবেদন করতে চান? বিস্তারিত প্রয়োজনীয় কাগজপত্র ও প্রসেসিং খরচ জানতে নিচে নির্বাচন করুন:'
                        : 'Select your target country for checklist, embassy fees, and timeline:'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate('/visa/india')}
                        className="p-3 text-left border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="text-xl">🇮🇳</div>
                        <div className="font-bold text-xs text-slate-900 mt-1">ভারত ভিসা (India)</div>
                        <div className="text-[11px] text-slate-500">ট্যুরিস্ট, মেডিকেল, বিজনেস</div>
                      </button>

                      <button
                        onClick={() => navigate('/visa/thailand')}
                        className="p-3 text-left border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="text-xl">🇹🇭</div>
                        <div className="font-bold text-xs text-slate-900 mt-1">থাইল্যান্ড ভিসা (Thai)</div>
                        <div className="text-[11px] text-slate-500">ট্যুরিস্ট স্টিকার ভিসা</div>
                      </button>

                      <button
                        onClick={() => navigate('/visa/saudi')}
                        className="p-3 text-left border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="text-xl">🇸🇦</div>
                        <div className="font-bold text-xs text-slate-900 mt-1">সৌদি আরব / ওমরাহ</div>
                        <div className="text-[11px] text-slate-500">ই-ভিসা ও ট্রানজিট ভিসা</div>
                      </button>

                      <button
                        onClick={() => navigate('/visa')}
                        className="p-3 text-left border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="text-xl">🌍</div>
                        <div className="font-bold text-xs text-slate-900 mt-1">অন্যান্য দেশসমূহ</div>
                        <div className="text-[11px] text-slate-500">দুবাই, মালয়েশিয়া, ইত্যাদি</div>
                      </button>
                    </div>

                    <button
                      onClick={() => navigate('/visa')}
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'bn' ? 'সকল ভিসা ফি ও রিকোয়ারমেন্ট দেখুন' : 'View Full Visa Catalog'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {activeTab === 'umrah' && (
                  <div className="space-y-4 py-2">
                    <p className="text-xs text-slate-600">
                      {lang === 'bn'
                        ? 'পবিত্র ওমরাহ পালনের জন্য সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস দিচ্ছে পূর্ণাঙ্গ প্যাকেজ ও ফ্লাইট সুবিধা।'
                        : 'Full-service peaceful Umrah packages with hotels near Haram and transport:'}
                    </p>
                    <div className="space-y-2">
                      {umrahPackages.slice(0, 2).map((pkg) => (
                        <div key={pkg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-xs text-slate-900">{lang === 'bn' ? pkg.nameBn : pkg.nameEn}</div>
                            <div className="text-[11px] text-slate-500">
                              {lang === 'bn' ? pkg.durationBn : pkg.durationEn} • {lang === 'bn' ? pkg.makkahHotelDistBn : pkg.makkahHotelDistEn}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-xs text-blue-700">{lang === 'bn' ? pkg.priceNoteBn : pkg.priceNoteEn}</div>
                            <button
                              onClick={() => navigate('/umrah')}
                              className="text-[10px] text-blue-600 font-bold hover:underline"
                            >
                              {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate('/umrah')}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'bn' ? 'সকল ওমরাহ প্যাকেজ দেখুন' : 'Explore All Umrah Packages'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {activeTab === 'service' && (
                  <div className="space-y-4 py-2 text-center">
                    <p className="text-xs text-slate-600">
                      {lang === 'bn'
                        ? 'পাসপোর্ট সংশোধন, পুলিশ ক্লিয়ারেন্স, জন্মনিবন্ধন, ছবির কাজ বা ট্রাভেল কনসালটেশন প্রয়োজন?'
                        : 'Need passport support, police clearance, online government forms, or IT services?'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800 block">🛃 পাসপোর্ট আবেদন</span>
                        <span className="text-[10px] text-slate-500">অনলাইন ফি ও ফর্ম পূরণ</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800 block">🔄 টিকেট তারিখ পরিবর্তন</span>
                        <span className="text-[10px] text-slate-500">রি-ইস্যু ও ক্যান্সেল সেবা</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800 block">📸 ভিসা সাইজ ছবি</span>
                        <span className="text-[10px] text-slate-500">সাদা ব্যাকগ্রাউন্ড প্রিন্ট</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800 block">🏨 হোটেল ও ট্রান্সফার</span>
                        <span className="text-[10px] text-slate-500">বিশ্বস্ত ভাউচার বুকিং</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openEnquiryModal()}
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      {lang === 'bn' ? 'কাস্টম কোটেশন রিকোয়েস্ট করুন' : 'Request Custom Service'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIAL OFFERS & NOTICE BANNER */}
      {specialOffers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-sm mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {lang === 'bn' ? 'চলমান বিশেষ অফার ও আপডেট' : 'Current Special Offers & Notice'}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    {lang === 'bn' ? specialOffers[0].titleBn : specialOffers[0].titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                    {lang === 'bn' ? specialOffers[0].descBn : specialOffers[0].descEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300">
                  {lang === 'bn' ? specialOffers[0].badgeBn : specialOffers[0].badgeEn}
                </span>
                <button
                  onClick={() => openWhatsApp(lang === 'bn' ? `আমি ${specialOffers[0].titleBn} অফারটি সম্পর্কে জানতে চাই` : `I want to inquire about ${specialOffers[0].titleEn}`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'অফারটি লুফে নিন' : 'Claim Offer'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CORE SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {lang === 'bn' ? 'আমাদের প্রধান সেবাসমূহ' : 'Our Comprehensive Services'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {lang === 'bn'
              ? 'আপনার সকল ট্রাভেল ও ডিজিটাল প্রয়োজনীয়তার পূর্ণ সমাধান'
              : 'Complete Solutions for Travel, Visa & Digital Demands'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {lang === 'bn'
              ? 'আন্তর্জাতিক ও অভ্যন্তরীণ বিমান টিকিট থেকে শুরু করে ভিসা ফাইল তৈরি, ওমরাহ এবং দৈনন্দিন কম্পিউটার সেবা – এক ছাদের নিচে।'
              : 'From international and domestic flight ticketing to visa file processing, Umrah packages, and online services.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {item.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {lang === 'bn' ? item.nameBn : item.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {lang === 'bn' ? item.descBn : item.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'bn' ? 'প্রধান সুবিধাসমূহ' : 'Key Features'}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {(lang === 'bn' ? item.detailsBn : item.detailsEn).slice(0, 3).map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-blue-700">
                  {lang === 'bn' ? item.priceTextBn : item.priceTextEn}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEnquiryModal(item.nameEn)}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'কোটেশন' : 'Quote'}
                  </button>
                  <button
                    onClick={() => openWhatsApp(lang === 'bn' ? `আমি ${item.nameBn} সেবাটি সম্পর্কে জানতে চাই` : `Inquiry regarding ${item.nameEn}`)}
                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VISA PROCESSING HUB PREVIEW */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full">
                {lang === 'bn' ? 'ভিসা প্রসেসিং হাব' : 'Visa Processing Hub'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
                {lang === 'bn'
                  ? 'জনপ্রিয় দেশসমূহের ভিসা আবেদন ও গাইডলাইন'
                  : 'Popular Destinations & Visa Guidance'}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {lang === 'bn'
                  ? 'আমরা নিশ্চিত করি নির্ভুল আবেদনপত্র, প্রফেশনাল ডকুমেন্ট চেকলিস্ট এবং দূতাবাস নির্দেশিত সঠিক প্রক্রিয়া।'
                  : 'We assist with precise form filling, appointment scheduling, and thorough document organization.'}
              </p>
            </div>

            <button
              onClick={() => navigate('/visa')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 cursor-pointer self-start md:self-auto"
            >
              <span>{lang === 'bn' ? 'সকল দেশের ভিসা দেখুন' : 'Explore All Visa Categories'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visaServices.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{v.flag}</span>
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {lang === 'bn' ? v.processingInfoBn : v.processingInfoEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {lang === 'bn' ? v.countryBn : v.countryEn}
                    </h3>
                    <div className="text-xs font-semibold text-blue-700 mt-0.5">
                      {lang === 'bn' ? v.visaTypeBn : v.visaTypeEn}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                    <p className="line-clamp-2">{lang === 'bn' ? v.notesBn : v.notesEn}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                      {lang === 'bn' ? 'প্রয়োজনীয় প্রধান ডকুমেন্টস:' : 'Key Requirements:'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(lang === 'bn' ? v.basicReqsBn : v.basicReqsEn).slice(0, 4).map((req: string, i: number) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (v.id.includes('india')) navigate('/visa/india');
                      else if (v.id.includes('thai')) navigate('/visa/thailand');
                      else if (v.id.includes('saudi')) navigate('/visa/saudi');
                      else navigate('/visa');
                    }}
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
                  >
                    {lang === 'bn' ? 'বিস্তারিত ও আবেদন' : 'Details & Apply'}
                  </button>
                  <button
                    onClick={() => openWhatsApp(lang === 'bn' ? `আমি ${v.countryBn} ভিসা প্রসেসিং সম্পর্কে জানতে চাই` : `I want to inquire about ${v.countryEn} visa`)}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'আইনি ঘোষণা: ভিসা প্রদান বা প্রত্যাখ্যান সম্পূর্ণ দূতাবাসের এখতিয়ার। আমরা সঠিক ফাইল প্রস্তুতকরণ ও নির্দেশিকা প্রদান করি।'
                  : 'Notice: Visa issuance is at the sole discretion of the embassy. We assist with accurate paperwork and compliance.'}
              </span>
            </div>
            <button
              onClick={() => openEnquiryModal('Visa Consultation')}
              className="font-bold text-blue-700 hover:underline cursor-pointer"
            >
              {lang === 'bn' ? 'ফ্রি পরামর্শ নিন →' : 'Get Free Consultation →'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. UMRAH PACKAGES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'পবিত্র ওমরাহ হজ্ব সেবা' : 'Sacred Umrah Pilgrimage'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {lang === 'bn'
                ? 'নির্ঝঞ্ঝাট ও আত্মতৃপ্তিদায়ক ওমরাহ প্যাকেজ'
                : 'Peace of Mind Umrah Packages with Complete Care'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'হারাম শরীফের সন্নিকটে আরামদায়ক হোটেল, সরাসরি ফ্লাইট, ভিসা প্রসেসিং, ট্রান্সফার এবং অভিজ্ঞ মোয়াল্লিম গাইড সহ পরিবার ও গ্রুপ প্যাকেজ।'
                : 'Direct flights, close hotels in Makkah and Madinah, comfortable transfers, and guided ziyarah for individuals and families.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/umrah')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg transition-all cursor-pointer text-sm"
              >
                {lang === 'bn' ? 'সকল ওমরাহ প্যাকেজ দেখুন' : 'Explore All Umrah Packages'}
              </button>
              <button
                onClick={() => openWhatsApp(lang === 'bn' ? 'আসসালামু আলাইকুম, আমি সিয়াম এয়ারের ওমরাহ প্যাকেজ সম্পর্কে জানতে আগ্রহী।' : 'Hello, I would like to inquire about your Umrah packages.')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'bn' ? 'ওমরাহ প্রতিনিধি হোয়াটসঅ্যাপ' : 'WhatsApp Umrah Specialist'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4 TRANSPARENT STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'bn' ? 'আমাদের সহজ কর্মপদ্ধতি' : 'How We Work'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? '৪টি সহজ ধাপে সেবা গ্রহণ করুন' : 'Simple, 4-Step Process'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn'
              ? 'কোনো জটিলতা নেই। স্বচ্ছ ও সরাসরি যোগাযোগের মাধ্যমে আপনার কাজ সম্পন্ন হবে।'
              : 'Zero complications. Direct, responsive coordination from start to finish.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 relative text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-extrabold rounded-2xl flex items-center justify-center mx-auto text-lg">
              ১
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'সেবা ও রুট নির্বাচন' : '1. Choose Service'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার টিকিট, ভিসা বা ডিজিটাল সেবার চাহিদা আমাদের জানান হোয়াটসঅ্যাপ বা কলে।'
                : 'Tell us your route, visa country, or online service need via WhatsApp or call.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 relative text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-extrabold rounded-2xl flex items-center justify-center mx-auto text-lg">
              ২
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'কোটেশন ও কাগজপত্র' : '2. Quotation & Docs'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আমরা সেরা ভাড়া ও ভিসা ডকুমেন্টস চেকলিস্ট প্রদান করি। কাগজ আমাদের পাঠান।'
                : 'We provide fair quotation and checklist. Submit your documents safely.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 relative text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 font-extrabold rounded-2xl flex items-center justify-center mx-auto text-lg">
              ৩
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'নিরাপদ পেমেন্ট ও প্রসেসিং' : '3. Secure Payment'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বিকাশ, নগদ বা ব্যাংক একাউন্টে স্বচ্ছ পেমেন্ট করুন এবং প্রমাণপত্র জমা দিন।'
                : 'Pay securely via verified bKash, Nagad, or Bank with official invoice.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 relative text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-extrabold rounded-2xl flex items-center justify-center mx-auto text-lg">
              ৪
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'টিকেট ও ভিসা ডেলিভারি' : '4. Delivery & Verification'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'এয়ারলাইন্স অরিজিনাল ই-টিকেট ও ভিসা ডেলিভারি নিন এবং অনলাইনে সরাসরি যাচাই করুন।'
                : 'Receive authentic e-tickets/visas with direct airline PNR verification support.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SIAM AIR & DIGITAL (AUTHENTICITY & LOCATION) */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1 rounded-full">
                {lang === 'bn' ? 'কেন আমরা গ্রাহকের প্রথম পছন্দ' : 'Why Customers Trust Us'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {lang === 'bn'
                  ? 'হোমনা ও আশেপাশের এলাকার সবচেয়ে নির্ভরযোগ্য ট্রাভেল অফিস'
                  : 'The Most Reliable Travel Agency Serving Homna & Nationwide'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'আমরা কোনো কাল্পনিক প্রতিশ্রুতি দিই না। বাস্তব অভিজ্ঞতা, সঠিক নিয়মানুবর্তিতা এবং গ্রাহকের সাথে সততাই আমাদের মূল চালিকাশক্তি।'
                  : 'We operate with 100% honesty. No inflated claims, no artificial promises—just professional diligence, proper booking systems, and customer satisfaction.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-600/30 text-blue-400 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'সরাসরি ফিজিক্যাল অফিস উপস্থিতি' : 'Physical Office in Ramkrishnapur Bazar'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === 'bn'
                        ? 'সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা। সরাসরি অফিসে এসে কথা বলে সেবা গ্রহণ করার পূর্ণ সুবিধা।'
                        : 'Shutradhar Super Market, Homna, Cumilla. Feel free to visit our office in person anytime.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-600/30 text-emerald-400 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'সরাসরি এয়ারলাইন্স পিএনআর যাচাই' : 'Genuine Airline PNR Verification'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === 'bn'
                        ? 'আমাদের ইস্যুকৃত প্রতিটি টিকেট এয়ারলাইন্সের অফিসিয়াল ওয়েবসাইটে তাৎক্ষণিক যাচাইযোগ্য।'
                        : 'Every issued ticket can be verified directly on the official airline website using your PNR.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-600/30 text-amber-400 rounded-lg shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'দ্রুত রেসপন্স ও সহায়তা' : 'Fast WhatsApp & Call Assistance'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === 'bn'
                        ? 'ভ্রমণের আগে ও পরে যেকোনো টিকিট পরিবর্তন, ব্যাগেজ সংক্রান্ত প্রশ্ন বা রি-ইস্যু সহযোগিতায় সার্বক্ষণিক পাশে।'
                        : 'We stand by you before, during, and after your trip for baggage queries, dates changes, and assistance.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Landmark & Map Info Box */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold">Physical Location</span>
                  <h3 className="text-lg font-bold text-white">Siam Air & Digital Service</h3>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold">
                  Open 8:30 AM - 10:30 PM
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">
                      {lang === 'bn' ? 'অফিসের পূর্ণ ঠিকানা:' : 'Full Address:'}
                    </span>
                    <span className="text-xs text-slate-300">
                      {lang === 'bn' ? businessInfo.addressBn : businessInfo.addressEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">{businessInfo.phone}</span>
                    <span className="text-xs text-slate-400 block">Phone & WhatsApp Support</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <span className="font-bold text-slate-300 block">
                  {lang === 'bn' ? 'লোকেশন ল্যান্ডমার্ক (Landmark):' : 'Landmark:'}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {lang === 'bn'
                    ? 'হোমনা উপজেলা, রামকৃষ্ণপুর বাজারের সূত্রধর সুপার মার্কেটে অবস্থিত। বাজার সংলগ্ন যে কাউকে সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসের কথা জিজ্ঞেস করলেই সহজেই খুঁজে পাবেন।'
                    : 'Located inside Shutradhar Super Market, Ramkrishnapur Bazar, Homna, Cumilla. Ask anyone in the bazar for Siam Air & Digital Service.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={callNow}
                  className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'ফোন করুন' : 'Call Office'}</span>
                </button>
                <button
                  onClick={() => openWhatsApp(lang === 'bn' ? 'আমি আপনাদের অফিসে আসতে চাই, সঠিক লোকেশন গাইড করবেন প্লিজ।' : 'Hello, I want to visit your office in Ramkrishnapur.')}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'bn' ? 'লোকেশন চ্যাট' : 'Location Chat'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'bn' ? 'সাধারণ প্রশ্ন ও উত্তর' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'গ্রাহকদের সচরাচর জিজ্ঞাসা' : 'Common Questions & Clear Answers'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn' ? 'আপনার মনে থাকা প্রশ্নের স্পষ্ট ও সৎ উত্তর' : 'Honest, factual answers about tickets, visas and payments'}
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              qBn: 'আমি কীভাবে নিশ্চিত হব আমার টিকেটটি আসল এবং কনফার্মড?',
              qEn: 'How can I be sure that my ticket is genuine and confirmed?',
              aBn: 'আমরা টিকেট বুকিং ও ইস্যুর পর এয়ারলাইন্সের অফিসিয়াল ৬ ডিজিটের পিএনআর (PNR) এবং ই-টিকেট নম্বর প্রদান করি। আপনি সংশ্লিষ্ট এয়ারলাইন্সের অফিসিয়াল ওয়েবসাইট বা অ্যাপে "Manage Booking"-এ গিয়ে আপনার লাস্ট নেম ও PNR দিয়ে তাৎক্ষণিক টিকেট স্ট্যাটাস ভেরিফাই করতে পারবেন।',
              aEn: 'Upon issuance, we provide the official 6-character airline PNR and 13-digit e-ticket number. You can verify your booking immediately on the official airline website or mobile app under "Manage Booking".'
            },
            {
              qBn: 'আপনারা কি ভিসা গ্যারান্টি দেন?',
              qEn: 'Do you guarantee visa approval?',
              aBn: 'না। কোনো সৎ ও দায়িত্বশীল ট্রাভেল এজেন্সি কখনোই "ভিসা গ্যারান্টি" দিতে পারে না। ভিসা অনুমোদন বা বাতিল করার একক এখতিয়ার সংশ্লিষ্ট দেশের দূতাবাস ও কনস্যুলার অফিসারের। আমরা দূতাবাসের নিয়ম অনুযায়ী শতভাগ নির্ভুল ফাইল, চেকলিস্ট ও আবেদন নিশ্চিত করি যা ভিসা পাওয়ার সম্ভাবনাকে সর্বোচ্চ রাখে।',
              aEn: 'No. No honest agency can legally guarantee a visa. The approval or refusal is the sole authority of the embassy/consulate. We guarantee 100% accurate file compilation, certified documentation, and proper submission according to official embassy rules.'
            },
            {
              qBn: 'বিকাশ বা নগদে টাকা পাঠানোর পর কীভাবে নিশ্চিত হব?',
              qEn: 'How is payment confirmed when sending via bKash or Nagad?',
              aBn: 'আমাদের ওয়েবসাইটের "পেমেন্ট" পেজে প্রদর্শিত অফিশিয়াল নম্বরে টাকা পাঠানোর পর আপনার ট্রানজেকশন আইডি (TrxID) ও প্রেরক নম্বর দিয়ে সাবমিট করবেন অথবা সরাসরি হোয়াটসঅ্যাপে স্ক্রিনশট পাঠাবেন। আমাদের সিস্টেম তাৎক্ষণিক ভেরিফাই করে আপনাকে অফিসিয়াল পেমেন্ট রিসিট প্রদান করবে।',
              aEn: 'After sending payment to our official numbers listed on our Payment page, submit your TrxID on the site or send the screenshot directly to our WhatsApp. You will receive an official payment confirmation and invoice.'
            },
            {
              qBn: 'জরুরি প্রয়োজনে টিকেটের তারিখ পরিবর্তন বা রি-ইস্যু কীভাবে করব?',
              qEn: 'How can I change my flight date or reissue my ticket in an emergency?',
              aBn: 'সরাসরি আমাদের ফোন (+8801883400808) বা হোয়াটসঅ্যাপে যোগাযোগ করুন। এয়ারলাইন্সের ফেয়ার রুলস ও সিট প্রাপ্যতা যাচাই করে ন্যূনতম সার্ভিস চার্জে আপনার টিকেট রি-ইস্যু করে দেওয়া হবে।',
              aEn: 'Contact our phone (+8801883400808) or WhatsApp immediately. Based on the airline fare rules and seat availability, we will reissue your ticket with minimal handling fees.'
            },
            {
              qBn: 'ভারত বা থাইল্যান্ড ভিসার জন্য কি সরাসরি অফিসে আসতে হবে?',
              qEn: 'Do I need to visit your office in person for India or Thailand visa?',
              aBn: 'আপনি হোমনা বা আশেপাশের এলাকায় থাকলে আমাদের রামকৃষ্ণপুর বাজার অফিসে আসতে পারেন। দূরবর্তী এলাকা বা প্রবাসীদের ক্ষেত্রে হোয়াটসঅ্যাপ বা ইমেইলের মাধ্যমে ডকুমেন্টের সফটকপি পাঠিয়েও সম্পূর্ণ প্রক্রিয়া সম্পন্ন করা সম্ভব।',
              aEn: 'If you are nearby in Homna, you can visit our Ramkrishnapur Bazar office. Customers from other districts or expatriates can also send clear document scans via WhatsApp or email to complete the full process remotely.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-700 cursor-pointer"
              >
                <span>{lang === 'bn' ? item.qBn : item.qEn}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {openFaqIndex === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {lang === 'bn' ? item.aBn : item.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. CONVERSION LEAD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn'
                ? 'ভ্রমণ বা ভিসার প্রস্তুতি নিচ্ছেন? এখনই কথা বলুন।'
                : 'Planning Your Travel or Need Visa Support? Talk to Us.'}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {lang === 'bn'
                ? 'সঠিক পরামর্শ ও স্বচ্ছ মূল্যে যেকোনো টিকিট ও ভিসা কোটেশন পেতে আমাদের সাথে হোয়াটসঅ্যাপে চ্যাট করুন অথবা সরাসরি কল দিন।'
                : 'Get genuine consultation, transparent airfares, and reliable visa assistance. Available every day.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </button>
            <button
              onClick={callNow}
              className="px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>{businessInfo.phone}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
