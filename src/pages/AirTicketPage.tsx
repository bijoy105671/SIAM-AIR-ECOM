import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Luggage,
  Sparkles,
  HelpCircle,
  Send
} from 'lucide-react';

interface AirTicketPageProps {
  navigate: (path: string) => void;
}

export const AirTicketPage: React.FC<AirTicketPageProps> = ({ navigate }) => {
  const { lang, businessInfo, openWhatsApp, callNow, addLead, showNotification } = useApp();

  // Flight search form state
  const [tripType, setTripType] = useState<'oneway' | 'round' | 'multicity'>('oneway');
  const [fromAirport, setFromAirport] = useState('Dhaka (DAC) - Hazrat Shahjalal Int.');
  const [toAirport, setToAirport] = useState('Jeddah (JED) - King Abdulaziz Int.');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [preferredAirline, setPreferredAirline] = useState('Best Price (Any)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showNotification(
        lang === 'bn' ? 'দয়া করে নাম এবং মোবাইল নম্বর প্রদান করুন' : 'Please provide your name and phone number',
        'error'
      );
      return;
    }

    const lead = addLead({
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      whatsapp: customerPhone.trim(),
      service: 'Air Ticketing',
      destination: toAirport,
      travelDate: departDate || undefined,
      passengerCount: parseInt(adults, 10) + parseInt(children, 10),
      preferredContact: 'WhatsApp',
      message: `Trip: ${tripType.toUpperCase()} | From: ${fromAirport} | To: ${toAirport} | Depart: ${departDate} | Return: ${returnDate || 'N/A'} | Class: ${cabinClass} | Airline: ${preferredAirline} | Note: ${specialRequest || 'None'}`,
      source: 'Air Ticket Quote Form'
    });

    setSubmittedLeadId(lead.id);
    setFormSubmitted(true);
    showNotification(lang === 'bn' ? 'ফ্লাইট কোটেশন রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'Flight quotation request submitted!');
  };

  const handleContinueWhatsApp = () => {
    const msg = lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস ওয়েবসাইটে এয়ার টিকিট কোটেশন জমা দিয়েছি (Lead ID: ${submittedLeadId})।
নাম: ${customerName}
ফোন: ${customerPhone}
রুট: ${fromAirport} থেকে ${toAirport}
ভ্রমণ ধরন: ${tripType === 'oneway' ? 'ওয়ান-ওয়ে' : tripType === 'round' ? 'রাউন্ড-ট্রিপ' : 'মাল্টি-সিটি'}
তারিখ: ${departDate} ${returnDate ? `(রিটার্ন: ${returnDate})` : ''}
যাত্রী: প্রাপ্তবয়স্ক ${adults} জন, শিশু ${children} জন
ক্লাস: ${cabinClass}
এয়ারলাইন্স পছন্দ: ${preferredAirline}
আজকের সম্ভাব্য সর্বনিম্ন ভাড়া ও শিডিউল জানাবেন প্লিজ।`
      : `Hello Siam Air & Digital, I submitted a flight quotation request on your website (ID: ${submittedLeadId}).
Name: ${customerName}
Phone: ${customerPhone}
Route: ${fromAirport} to ${toAirport}
Type: ${tripType}
Dates: ${departDate} ${returnDate ? `to ${returnDate}` : ''}
Passengers: ${adults} Adults, ${children} Children
Class: ${cabinClass} | Airline: ${preferredAirline}
Please share today's best available fares and flight options.`;

    openWhatsApp(msg);
  };

  const popularRoutes = [
    {
      from: 'Dhaka (DAC)',
      to: 'Jeddah (JED)',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      airlines: 'Biman, Saudia, US-Bangla, Air Arabia',
      baggage: '2 x 23 kg + 7 kg cabin',
      estimatedPrice: 'BDT 55,000 - 75,000'
    },
    {
      from: 'Dhaka (DAC)',
      to: 'Medina (MED)',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      airlines: 'Biman, Saudia, Qatar, Gulf Air',
      baggage: '2 x 23 kg / 30 kg + 7 kg',
      estimatedPrice: 'BDT 58,000 - 78,000'
    },
    {
      from: 'Dhaka (DAC)',
      to: 'Dubai / Sharjah',
      country: 'UAE',
      flag: '🇦🇪',
      airlines: 'Emirates, Biman, US-Bangla, Air Arabia',
      baggage: '30 kg / 40 kg + 7 kg',
      estimatedPrice: 'BDT 42,000 - 58,000'
    },
    {
      from: 'Dhaka (DAC)',
      to: 'Bangkok (BKK)',
      country: 'Thailand',
      flag: '🇹🇭',
      airlines: 'Thai Airways, Biman, US-Bangla',
      baggage: '20 kg / 30 kg + 7 kg',
      estimatedPrice: 'BDT 24,000 - 35,000'
    },
    {
      from: 'Dhaka (DAC)',
      to: 'Kolkata (CCU)',
      country: 'India',
      flag: '🇮🇳',
      airlines: 'Biman, US-Bangla, IndiGo, Novoair',
      baggage: '20 kg / 30 kg + 7 kg',
      estimatedPrice: 'BDT 7,500 - 13,000'
    },
    {
      from: 'Dhaka (DAC)',
      to: 'Kuala Lumpur (KUL)',
      country: 'Malaysia',
      flag: '🇲🇾',
      airlines: 'Malaysia Airlines, Biman, Batik Air, AirAsia',
      baggage: '20 kg / 30 kg + 7 kg',
      estimatedPrice: 'BDT 28,000 - 42,000'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              {lang === 'bn' ? 'এয়ার টিকিটিং ও ফ্লাইট বুকিং সেবা' : 'Air Ticketing & Reservation'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {lang === 'bn'
                ? 'আন্তর্জাতিক ও অভ্যন্তরীণ সকল রুটের সর্বনিম্ন বিমান ভাড়া'
                : 'Best Guaranteed Fares for Domestic & International Flights'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'সরাসরি জিডিএস সিস্টেমের মাধ্যমে নিশ্চিত পিএনআর বুকিং, পর্যাপ্ত ব্যাগেজ সুবিধা এবং দ্রুত তারিখ পরিবর্তনের গ্যারান্টি।'
                : 'Direct verified GDS bookings with full baggage allowance, instant e-ticket issuance, and dedicated date change assistance.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quotation / Search Tool Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Plane className="w-6 h-6 text-blue-700" />
                <span>{lang === 'bn' ? 'ফ্লাইট কোটেশন ও সিট অনুসন্ধান ফর্ম' : 'Request Flight Quotation'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'bn'
                  ? 'আপনার চাহিদা অনুযায়ী আমাদের সিস্টেম তাৎক্ষণিক সেরা ভাড়া ও অপশন যাচাই করে আপনাকে জানাবে।'
                  : 'Submit your flight preferences. We will calculate the optimal route, baggage, and lowest fare.'}
              </p>
            </div>

            {/* Trip Type Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tripType === 'oneway' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-700'
                }`}
              >
                {lang === 'bn' ? 'ওয়ান-ওয়ে' : 'One Way'}
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tripType === 'round' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-700'
                }`}
              >
                {lang === 'bn' ? 'রাউন্ড ট্রিপ' : 'Round Trip'}
              </button>
              <button
                type="button"
                onClick={() => setTripType('multicity')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tripType === 'multicity' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-700'
                }`}
              >
                {lang === 'bn' ? 'মাল্টি সিটি' : 'Multi-City'}
              </button>
            </div>
          </div>

          {formSubmitted ? (
            <div className="text-center py-10 bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'bn' ? 'আপনার ফ্লাইট কোটেশন রিকোয়েস্ট সফলভাবে গ্রহণ করা হয়েছে!' : 'Quotation Request Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                {lang === 'bn'
                  ? `রেফারেন্স আইডি: ${submittedLeadId}। আমাদের এয়ার টিকেটিং টিম অতি শীঘ্রই সেরা ভাড়ার অফার নিয়ে আপনার সাথে যোগাযোগ করবে।`
                  : `Reference ID: ${submittedLeadId}. Our flight ticketing desk is searching today's best deals for you.`}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleContinueWhatsApp}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক উত্তর পান' : 'Continue on WhatsApp for Instant Reply'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
                >
                  {lang === 'bn' ? 'আরেকটি রিকোয়েস্ট করুন' : 'Submit Another Request'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFlightSubmit} className="space-y-6">
              {/* Route Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? '🛫 যাত্রা শুরুর বিমানবন্দর (From)' : '🛫 From Airport'}
                  </label>
                  <select
                    value={fromAirport}
                    onChange={(e) => setFromAirport(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Dhaka (DAC) - Hazrat Shahjalal Int.">Dhaka (DAC) - হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Chittagong (CGP) - Shah Amanat Int.">Chittagong (CGP) - শাহ আমানত আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Sylhet (ZYL) - Osmani Int.">Sylhet (ZYL) - ওসমানী আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Cox's Bazar (CXB)">Cox's Bazar (CXB) - কক্সবাজার বিমানবন্দর</option>
                    <option value="Jeddah (JED) - King Abdulaziz Int.">Jeddah (JED) - কিং আব্দুল আজিজ, সৌদি আরব</option>
                    <option value="Dubai (DXB) - Dubai International">Dubai (DXB) - দুবাই আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Riyadh (RUH) - King Khalid Int.">Riyadh (RUH) - রিয়াদ বিমানবন্দর</option>
                    <option value="Kolkata (CCU) - Netaji Subhash Chandra Bose">Kolkata (CCU) - কলকাতা নেতাজি সুভাষ চন্দ্র বসু</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? '🛬 গন্তব্য বিমানবন্দর (To)' : '🛬 Destination Airport'}
                  </label>
                  <select
                    value={toAirport}
                    onChange={(e) => setToAirport(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Jeddah (JED) - King Abdulaziz Int.">Jeddah (JED) - কিং আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Medina (MED) - Prince Mohammad Bin Abdulaziz">Medina (MED) - মদিনা মনোয়ারা বিমানবন্দর</option>
                    <option value="Riyadh (RUH) - King Khalid Int.">Riyadh (RUH) - রিয়াদ বিমানবন্দর</option>
                    <option value="Dammam (DMM) - King Fahd Int.">Dammam (DMM) - দাম্মাম বিমানবন্দর</option>
                    <option value="Dubai (DXB) - Dubai International">Dubai (DXB) - দুবাই আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Sharjah (SHJ) - Sharjah International">Sharjah (SHJ) - শারজাহ বিমানবন্দর</option>
                    <option value="Abu Dhabi (AUH) - Zayed International">Abu Dhabi (AUH) - আবুধাবি আন্তর্জাতিক বিমানবন্দর</option>
                    <option value="Bangkok (BKK) - Suvarnabhumi Airport">Bangkok (BKK) - ব্যাংকক সুবর্ণভূমি, থাইল্যান্ড</option>
                    <option value="Kolkata (CCU) - Netaji Subhash Chandra Bose">Kolkata (CCU) - কলকাতা, ভারত</option>
                    <option value="Delhi (DEL) - Indira Gandhi Int.">Delhi (DEL) - দিল্লি ইন্দিরা গান্ধী আন্তর্জাতিক</option>
                    <option value="Kuala Lumpur (KUL) - KLIA">Kuala Lumpur (KUL) - কুয়ালালামপুর, মালয়েশিয়া</option>
                    <option value="Singapore (SIN) - Changi Airport">Singapore (SIN) - সিঙ্গাপুর চাঙ্গি বিমানবন্দর</option>
                    <option value="London (LHR / LGW) - London Airports">London (LHR/LGW) - লন্ডন, যুক্তরাজ্য</option>
                    <option value="New York (JFK) - John F. Kennedy">New York (JFK) - নিউ ইয়র্ক, যুক্তরাষ্ট্র</option>
                    <option value="Cox's Bazar (CXB)">Cox's Bazar (CXB) - কক্সবাজার (অভ্যন্তরীণ)</option>
                  </select>
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'যাত্রার তারিখ (Depart)' : 'Depart Date'}
                  </label>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                {tripType !== 'oneway' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'bn' ? 'ফেরার তারিখ (Return)' : 'Return Date'}
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required={tripType === 'round'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'প্রাপ্তবয়স্ক (১২+ বছর)' : 'Adults (12+ yrs)'}
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="1">১ জন</option>
                    <option value="2">২ জন</option>
                    <option value="3">৩ জন</option>
                    <option value="4">৪ জন</option>
                    <option value="5">৫ জন</option>
                    <option value="6+">৬+ জন (গ্রুপ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'শিশু (২-১১ বছর)' : 'Children (2-11 yrs)'}
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="0">০ জন</option>
                    <option value="1">১ জন</option>
                    <option value="2">২ জন</option>
                    <option value="3">৩ জন</option>
                  </select>
                </div>
              </div>

              {/* Class & Preferred Airline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'কেবিন ক্লাস (Class)' : 'Cabin Class'}
                  </label>
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Economy">Economy Class (সাধারণ শ্রেণি)</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business Class (বিজনেস শ্রেণি)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'এয়ারলাইন্স পছন্দ (Airline)' : 'Preferred Airline'}
                  </label>
                  <select
                    value={preferredAirline}
                    onChange={(e) => setPreferredAirline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Best Price (Any)">সর্বনিম্ন মূল্যের যেকোনো নির্ভরযোগ্য এয়ারলাইন্স</option>
                    <option value="Biman Bangladesh Airlines">Biman Bangladesh Airlines (বিমান বাংলাদেশ)</option>
                    <option value="Saudia">Saudia (সৌদিয়া এয়ারলাইন্স)</option>
                    <option value="Emirates">Emirates (এমিরেটস)</option>
                    <option value="Qatar Airways">Qatar Airways (কাতার এয়ারওয়েজ)</option>
                    <option value="US-Bangla Airlines">US-Bangla Airlines (ইউএস-বাংলা)</option>
                    <option value="Air Arabia">Air Arabia (এয়ার অ্যারাবিয়া)</option>
                    <option value="IndiGo">IndiGo (ইন্ডিগো)</option>
                    <option value="Thai Airways">Thai Airways (থাই এয়ারওয়েজ)</option>
                    <option value="Singapore Airlines">Singapore Airlines</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {lang === 'bn' ? 'আপনার যোগাযোগের তথ্য' : 'Your Contact Details'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={lang === 'bn' ? 'নাম লিখুন' : 'Full Name'}
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
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'অতিরিক্ত নির্দেশনা (যদি থাকে)' : 'Special Requests (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder={lang === 'bn' ? 'উদা: ডিরেক্ট ফ্লাইট প্রয়োজন, ২০ কেজি অতিরিক্ত লাগেজ, ইত্যাদি' : 'e.g. direct flight preferred, extra baggage needed'}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'আজকের সর্বনিম্ন বিমান ভাড়া জানুন' : 'Submit & Check Lowest Airfare'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. Popular Flight Routes with Market Fares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'bn' ? 'জনপ্রিয় ফ্লাইট রুটসমূহ' : 'Popular Routes & Standard Fares'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'বাংলাদেশ থেকে বহুল ব্যবহৃত রুটসমূহ' : 'Top Travel Sectors from Bangladesh'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'বিমান ভাড়া সিজন, প্রাপ্যতা ও এয়ারলাইন্স অফারের উপর নির্ভরশীল। তাৎক্ষণিক সঠিক মূল্যের জন্য যোগাযোগ করুন।'
              : 'Fares vary based on seasonality, seat classes, and airline promotions. Contact us for real-time fares.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{route.flag}</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {route.country}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 font-black text-slate-900 text-base">
                  <span>{route.from.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span>{route.to.split(' ')[0]}</span>
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  {route.from} ➔ {route.to}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Luggage className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>লাগেজ: <strong>{route.baggage}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Plane className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{route.airlines}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {lang === 'bn' ? 'আনুমানিক শুরু' : 'Est. From'}
                  </span>
                  <span className="text-xs font-black text-blue-700">{route.estimatedPrice}</span>
                </div>

                <button
                  onClick={() => openWhatsApp(lang === 'bn' ? `আসসালামু আলাইকুম, আমি ${route.from} থেকে ${route.to} রুটের আজকের সেরা ফ্লাইট ভাড়া জানতে চাই।` : `Hello, I want to check today's airfare from ${route.from} to ${route.to}.`)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'bn' ? 'ভাড়া জানুন' : 'Check'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Airline Verification & Reissue Services */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'টিকেটিং সহযোগী সেবা' : 'Ticketing & After-Sales Assistance'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'টিকেট কাটার পরও আমাদের সার্বক্ষণিক সমর্থন' : 'Comprehensive Support for Your Flight'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
                🔄
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'bn' ? 'টিকেট তারিখ পরিবর্তন ও রি-ইস্যু' : 'Ticket Date Change & Reissue'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'জরুরি কারণে ভ্রমণের তারিখ পেছানো বা এগিয়ে নেওয়ার প্রয়োজন হলে আমরা এয়ারলাইন্সের নিয়ম অনুযায়ী দ্রুত রি-ইস্যু করে থাকি।'
                  : 'Change travel dates easily according to airline fare rules with full penalty breakdown.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
                🎫
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'bn' ? 'পিএনআর ও টিকেট সত্যতা যাচাই' : 'PNR & Ticket Authenticity Check'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'যেকোনো এয়ারলাইন্সের ৬ ডিজিটের PNR এবং লাস্ট নেম দিয়ে এয়ারলাইন্স অফিসিয়াল পোর্টালে সরাসরি যাচাই করার নির্দেশনা দিই।'
                  : 'Verify confirmed flight status directly on official airline portals using 6-character PNR.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
                🧳
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'bn' ? 'অতিরিক্ত ব্যাগেজ ও সিট বুকিং' : 'Extra Baggage & Seat Selection'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'অতিরিক্ত লাগেজ কেনার ক্ষেত্রে এয়ারপোর্টের চেয়ে আগে থেকে বুকিং করলে অনেক টাকা সাশ্রয় হয়। আমরা এটি বুক করে দিই।'
                  : 'Save substantial cost by pre-purchasing extra check-in baggage prior to airport departure.'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">
                  {lang === 'bn' ? 'সরাসরি টিকিটিং ডেস্কে কথা বলুন:' : 'Direct Airline Ticketing Desk:'}
                </span>
                <span>{businessInfo.phone} ({businessInfo.hoursBn})</span>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={callNow}
                className="flex-1 sm:flex-initial px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {lang === 'bn' ? 'সরাসরি কল' : 'Call Desk'}
              </button>
              <button
                onClick={() => openWhatsApp('আসসালামু আলাইকুম, আমি এয়ার টিকিট বুকিং ও তারিখ পরিবর্তনের বিষয়ে কথা বলতে চাই।')}
                className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
