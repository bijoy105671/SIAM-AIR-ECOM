import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building,
  Navigation
} from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { lang, businessInfo, openWhatsApp, callNow, addLead, showNotification } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Air Ticket');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showNotification(
        lang === 'bn' ? 'দয়া করে নাম এবং মোবাইল নম্বর দিন' : 'Please provide name and phone number',
        'error'
      );
      return;
    }

    addLead({
      customerName: name.trim(),
      phone: phone.trim(),
      whatsapp: phone.trim(),
      service,
      preferredContact: 'WhatsApp',
      message: message.trim() || 'Direct message from Contact page',
      source: 'Contact Page Form'
    });

    setSubmitted(true);
    showNotification(lang === 'bn' ? 'আপনার বার্তা সফলভাবে পৌঁছেছে!' : 'Message sent successfully!');
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'যোগাযোগ ও অফিস ঠিকানা' : 'Contact & Office Address'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn' ? 'যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch with Our Dedicated Team'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'এয়ার টিকিট বুকিং, ভিসা কোটেশন বা যেকোনো পরামর্শের জন্য আমাদের সরাসরি কল দিন, হোয়াটসঅ্যাপে মেসেজ পাঠান অথবা সরাসরি আমাদের অফিসে আসুন।'
              : 'Feel free to reach us via phone call, instant WhatsApp messaging, or visit our physical office in Ramkrishnapur Bazar.'}
          </p>
        </div>
      </section>

      {/* 2. Contact Information Grid & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'bn' ? 'যোগাযোগের মাধ্যমসমূহ' : 'Contact Channels'}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'অফিসের ঠিকানা:' : 'Office Address:'}
                    </span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {lang === 'bn' ? businessInfo.addressBn : businessInfo.addressEn}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {lang === 'bn' ? 'ল্যান্ডমার্ক: সূত্রধর সুপার মার্কেট' : 'Landmark: Shutradhar Super Market'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'হটলাইন / ফোন:' : 'Phone Hotline:'}
                    </span>
                    <a href={`tel:${businessInfo.phone}`} className="text-blue-700 font-bold hover:underline">
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'অফিসিয়াল হোয়াটসঅ্যাপ:' : 'WhatsApp Support:'}
                    </span>
                    <span className="text-emerald-700 font-bold font-mono">
                      {businessInfo.whatsapp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'ইমেইল ঠিকানা:' : 'Email Address:'}
                    </span>
                    <a href={`mailto:${businessInfo.email}`} className="text-slate-700 font-medium hover:underline">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'অফিস খোলা থাকে:' : 'Working Hours:'}
                    </span>
                    <span className="text-slate-600">
                      {lang === 'bn' ? businessInfo.hoursBn : businessInfo.hoursEn}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={callNow}
                  className="py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সরাসরি কল' : 'Call Office'}</span>
                </button>
                <button
                  onClick={() => openWhatsApp()}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  {lang === 'bn' ? 'দ্রুত মেসেজ পাঠান' : 'Send an Instant Message'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {lang === 'bn' ? 'আপনার যেকোনো জিজ্ঞাসা লিখে পাঠান' : 'Leave Us a Message'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'আমাদের টিম সর্বোচ্চ ১৫-২০ মিনিটের মধ্যে আপনার সাথে যোগাযোগ করবে।'
                    : 'We respond to all online inquiries within a few minutes during business hours.'}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {lang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {lang === 'bn'
                      ? 'ধন্যবাদ! আমাদের এক্সিকিউটিভ অতি শীঘ্রই আপনার মোবাইল বা হোয়াটসঅ্যাপে যোগাযোগ করবেন।'
                      : 'Thank you. Our travel consultant will reach out to you shortly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'সেবা বিভাগ' : 'Service Category'}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Air Ticket">এয়ার টিকিট (Air Ticket)</option>
                      <option value="India Visa Assistance">ভারত ভিসা (India Visa)</option>
                      <option value="Thailand Visa Assistance">থাইল্যান্ড ভিসা (Thailand Visa)</option>
                      <option value="Saudi / Umrah Visa">সৌদি / ওমরাহ ভিসা</option>
                      <option value="Umrah Package">ওমরাহ প্যাকেজ (Umrah Package)</option>
                      <option value="Computer & Digital Services">কম্পিউটার ও অনলাইন সেবা</option>
                      <option value="Other Inquiry">অন্যান্য জিজ্ঞাসা</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'bn' ? 'আপনার বিস্তারিত বার্তা' : 'Your Detailed Message'}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={lang === 'bn' ? 'আপনার যাত্রা, তারিখ বা নির্দিষ্ট প্রয়োজনীয়তা লিখুন...' : 'Write your requirements or questions...'}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'বার্তা পাঠিয়ে দিন' : 'Send Message'}</span>
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
