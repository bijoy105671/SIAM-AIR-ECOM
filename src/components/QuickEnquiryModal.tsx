import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, MessageCircle, Send, PhoneCall } from 'lucide-react';

export const QuickEnquiryModal: React.FC = () => {
  const { lang, modalState, closeModal, addLead, openWhatsApp, showNotification } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [service, setService] = useState('Air Ticket');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('1');
  const [passportStatus, setPassportStatus] = useState('Valid Passport');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Any'>('WhatsApp');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  useEffect(() => {
    if (modalState.serviceName) {
      setService(modalState.serviceName);
    }
  }, [modalState.serviceName]);

  if (!modalState.isOpen || modalState.type !== 'enquiry') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      showNotification(
        lang === 'bn' ? 'দয়া করে নাম এবং মোবাইল নম্বর প্রদান করুন' : 'Please provide your name and phone number',
        'error'
      );
      return;
    }

    const effectiveWhatsApp = sameAsPhone ? phone : (whatsapp || phone);

    const created = addLead({
      customerName: fullName.trim(),
      phone: phone.trim(),
      whatsapp: effectiveWhatsApp.trim(),
      service,
      destination: destination.trim() || undefined,
      travelDate: travelDate || undefined,
      passengerCount: parseInt(passengerCount, 10) || 1,
      passportStatus,
      message: message.trim(),
      preferredContact,
      source: 'Website Enquiry Modal'
    });

    setSubmittedLeadId(created.id);
    setIsSubmitted(true);
    showNotification(
      lang === 'bn' ? 'আপনার রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'Your enquiry has been received!'
    );
  };

  const handleContinueWhatsApp = () => {
    const summary = lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস ওয়েবসাইটে একটি কোটেশন রিকোয়েস্ট জমা দিয়েছি (Lead ID: ${submittedLeadId})।
নাম: ${fullName}
মোবাইল: ${phone}
সার্ভিস: ${service}
গন্তব্য: ${destination || 'N/A'}
ভ্রমণ তারিখ: ${travelDate || 'N/A'}
যাত্রী সংখ্যা: ${passengerCount}
মেসেজ: ${message || 'শীঘ্রই তথ্য ও কোটেশন প্রত্যাশা করছি।'}`
      : `Hello Siam Air & Digital Service, I submitted an enquiry on your website (Lead ID: ${submittedLeadId}).
Name: ${fullName}
Phone: ${phone}
Service: ${service}
Destination: ${destination || 'N/A'}
Travel Date: ${travelDate || 'N/A'}
Travelers: ${passengerCount}
Details: ${message || 'Looking forward to receiving your quotation.'}`;

    openWhatsApp(summary);
    closeModal();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setWhatsapp('');
    setMessage('');
    setDestination('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
              {lang === 'bn' ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস' : 'Siam Air & Digital Service'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              {lang === 'bn' ? 'কোটেশন ও সেবা সংক্রান্ত অনুসন্ধান' : 'Request a Quote / Service Enquiry'}
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  Enquiry ID: <span className="text-blue-700 font-mono">{submittedLeadId}</span>
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {lang === 'bn' ? 'ধন্যবাদ! আপনার তথ্য গ্রহণ করা হয়েছে' : 'Thank You! Your Enquiry Was Received'}
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  {lang === 'bn'
                    ? 'আমাদের অভিজ্ঞ টিম অতি শীঘ্রই আপনার সাথে যোগাযোগ করবে। দ্রুততম সাপোর্টের জন্য সরাসরি হোয়াটসঅ্যাপে চালিয়ে যান।'
                    : 'Our team will contact you shortly. For immediate response, feel free to continue directly on WhatsApp.'}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleContinueWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Continue on WhatsApp'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    closeModal();
                  }}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'কাঙ্ক্ষিত সেবা *' : 'Desired Service *'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  >
                    <option value="Air Ticketing">{lang === 'bn' ? '✈️ এয়ার টিকিট (Air Ticket)' : '✈️ Air Ticketing'}</option>
                    <option value="India Visa Assistance">{lang === 'bn' ? '🇮🇳 ভারত ভিসা (India Visa)' : '🇮🇳 India Visa Assistance'}</option>
                    <option value="Thailand Visa Assistance">{lang === 'bn' ? '🇹🇭 থাইল্যান্ড ভিসা (Thailand Visa)' : '🇹🇭 Thailand Visa Assistance'}</option>
                    <option value="Saudi / Umrah Visa">{lang === 'bn' ? '🇸🇦 সৌদি / ওমরাহ ভিসা' : '🇸🇦 Saudi / Umrah Visa'}</option>
                    <option value="Umrah Package">{lang === 'bn' ? '🕋 ওমরাহ প্যাকেজ (Umrah Package)' : '🕋 Umrah Package'}</option>
                    <option value="Ticket Verification">{lang === 'bn' ? '🎫 টিকিট ও ভিসা যাচাই' : '🎫 Ticket & Visa Verification'}</option>
                    <option value="Ticket Date Change">{lang === 'bn' ? '🔄 তারিখ পরিবর্তন / রি-ইস্যু' : '🔄 Ticket Date Change / Reissue'}</option>
                    <option value="Passport Assistance">{lang === 'bn' ? '🛃 পাসপোর্টের কাজ' : '🛃 Passport Services'}</option>
                    <option value="Hotel Booking">{lang === 'bn' ? '🏨 হোটেল বুকিং' : '🏨 Hotel Booking'}</option>
                    <option value="Airport Transfer">{lang === 'bn' ? '🚐 এয়ারপোর্ট ট্রান্সফার' : '🚐 Airport Transfer'}</option>
                    <option value="Computer & Online Services">{lang === 'bn' ? '💻 কম্পিউটার ও অনলাইন সেবা' : '💻 Computer & Online Services'}</option>
                    <option value="Other Services">{lang === 'bn' ? '🌐 অন্যান্য সেবা' : '🌐 Other Services'}</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'গন্তব্য / দেশ (যদি থাকে)' : 'Destination / Country'}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={lang === 'bn' ? 'উদা: জেদ্দা, কলকাতা, ব্যাংকক' : 'e.g., Jeddah, Kolkata, Bangkok'}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
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
              </div>

              {/* WhatsApp Option */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-700">
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপ নম্বর' : 'WhatsApp Number'}
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={sameAsPhone}
                      onChange={(e) => setSameAsPhone(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span>{lang === 'bn' ? 'মোবাইল নম্বরের অনুরূপ' : 'Same as phone'}</span>
                  </label>
                </div>
                {!sameAsPhone && (
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp 01XXXXXXXXX"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                )}
              </div>

              {/* Travel Date & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ভ্রমণ তারিখ' : 'Travel Date'}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'যাত্রী / সদস্য সংখ্যা' : 'Passengers / People'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'পাসপোর্ট স্ট্যাটাস' : 'Passport Status'}
                  </label>
                  <select
                    value={passportStatus}
                    onChange={(e) => setPassportStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Valid Passport">{lang === 'bn' ? 'বৈধ পাসপোর্ট আছে' : 'Valid Passport'}</option>
                    <option value="Passport Expired">{lang === 'bn' ? 'পাসপোর্ট মেয়াদোত্তীর্ণ' : 'Passport Expired'}</option>
                    <option value="Applying New Passport">{lang === 'bn' ? 'নতুন পাসপোর্ট আবেদন করব' : 'Applying New Passport'}</option>
                    <option value="Domestic / No Passport">{lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ / প্রয়োজন নেই' : 'No Passport Needed'}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'আপনার নির্দিষ্ট চাহিদা বা মেসেজ' : 'Your Requirements / Message'}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'উদা: ডিরেক্ট ফ্লাইট পছন্দ, মক্কার কাছে ৩ তারকা হোটেল, ইত্যাদি।'
                      : 'e.g., direct flight preferred, 3-star hotel near Haram, etc.'
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="flex items-center gap-4 text-xs font-medium text-slate-700 pt-1">
                <span className="font-bold">{lang === 'bn' ? 'পছন্দের যোগাযোগ মাধ্যম:' : 'Preferred Contact:'}</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="WhatsApp"
                    checked={preferredContact === 'WhatsApp'}
                    onChange={() => setPreferredContact('WhatsApp')}
                    className="text-blue-600"
                  />
                  <span>WhatsApp</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="Phone Call"
                    checked={preferredContact === 'Phone Call'}
                    onChange={() => setPreferredContact('Phone Call')}
                    className="text-blue-600"
                  />
                  <span>{lang === 'bn' ? 'সরাসরি কল' : 'Phone Call'}</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-700/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'রিকোয়েস্ট সাবমিট করুন' : 'Submit Enquiry'}</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  {lang === 'bn'
                    ? '🔒 আপনার তথ্য নিরাপদ রাখা হয় এবং তৃতীয় পক্ষের কাছে শেয়ার করা হয় না।'
                    : '🔒 Your details are secure and will never be shared with third parties.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
