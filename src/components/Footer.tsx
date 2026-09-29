import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Lock,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { lang, businessInfo, openWhatsApp, callNow } = useApp();

  const handleLink = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">Siam Air & Digital</span>
                <p className="text-xs text-slate-400">
                  {lang === 'bn' ? 'বিশ্বস্ত ট্রাভেল পার্টনার' : 'Trusted Travel Partner'}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস – হোমনা, কুমিল্লা ও সারা দেশের গ্রাহকদের জন্য এয়ার টিকিট, ভিসা প্রসেসিং, ওমরাহ প্যাকেজ এবং প্রফেশনাল ডিজিটাল সেবায় বিশ্বস্ত প্রতিষ্ঠান।'
                : 'Siam Air & Digital Service is your trusted provider for air ticketing, visa processing, Umrah packages, and professional digital services based in Homna, Cumilla, Bangladesh.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={callNow}
                className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'bn' ? 'কল করুন' : 'Call Now'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{lang === 'bn' ? 'জরুরি লিংক' : 'Quick Links'}</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLink('/')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'হোম পেজ' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/air-ticket')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'এয়ার টিকিটিং' : 'Air Ticketing'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/visa')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'ভিসা প্রসেসিং সেবা' : 'Visa Processing'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/umrah')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'ওমরাহ প্যাকেজ' : 'Umrah Packages'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'কম্পিউটার ও ডিজিটাল সেবা' : 'Digital & Online Services'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/payment')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'পেমেন্ট মেথড ও ভেরিফিকেশন' : 'Make a Payment'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/blog')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'ভ্রমণ ব্লগ ও গাইড' : 'Travel Blog & Guides'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/faq')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:translate-x-0.5 transform"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'FAQ'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{lang === 'bn' ? 'প্রধান সেবাসমূহ' : 'Key Services'}</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">✈</span>
                <span>{lang === 'bn' ? 'অভ্যন্তরীণ ও আন্তর্জাতিক ফ্লাইট' : 'Domestic & International Flights'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">🇮🇳</span>
                <button onClick={() => handleLink('/visa/india')} className="hover:text-white text-left">
                  {lang === 'bn' ? 'ভারত ভিসা প্রসেসিং' : 'India Visa Application'}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">🇹🇭</span>
                <button onClick={() => handleLink('/visa/thailand')} className="hover:text-white text-left">
                  {lang === 'bn' ? 'থাইল্যান্ড ট্যুরিস্ট ভিসা' : 'Thailand Tourist Visa'}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">🕋</span>
                <span>{lang === 'bn' ? 'ওমরাহ ই-ভিসা ও হোটেল' : 'Umrah Visa & Hotel'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">🔄</span>
                <span>{lang === 'bn' ? 'টিকেট তারিখ পরিবর্তন ও রি-ইস্যু' : 'Ticket Date Change & Reissue'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">📸</span>
                <span>{lang === 'bn' ? 'ভিসা ছবি ও কম্পিউটার কম্পোজ' : 'Photo & Computer Composition'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">🏛</span>
                <span>{lang === 'bn' ? 'পাসপোর্ট, এনআইডি ও জন্মনিবন্ধন' : 'Passport, NID & Birth Registration'}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{lang === 'bn' ? 'অফিস ও যোগাযোগ' : 'Office & Contact'}</span>
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
                <span className="text-xs leading-relaxed">
                  {lang === 'bn' ? businessInfo.addressBn : businessInfo.addressEn}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-white text-xs font-semibold">
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-400">
                  WhatsApp: {businessInfo.whatsapp}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white text-xs truncate">
                  {businessInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? businessInfo.hoursBn : businessInfo.hoursEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Alert & Legal Disclaimers (Strict Compliance) */}
        <div className="my-8 p-5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-1">
                {lang === 'bn' ? 'গুরুত্বপূর্ণ আইনি ও ভিসা সংক্রান্ত ঘোষণা (Disclaimer):' : 'Legal & Visa Disclaimer:'}
              </span>
              <p className="leading-relaxed text-slate-300">
                {lang === 'bn'
                  ? 'ভিসা অনুমোদন, ভিসা প্রদানের সময়সীমা, ফ্লাইট শিডিউল, বিমান ভাড়া এবং ইমিগ্রেশন সংক্রান্ত সিদ্ধান্তসমূহ সম্পূর্ণভাবে সংশ্লিষ্ট এয়ারলাইন্স, দূতাবাস, কনস্যুলেট বা সংশ্লিষ্ট দেশের ইমিগ্রেশন কর্তৃপক্ষের এখতিয়ারাধীন। সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস আবেদনকারীদের তথ্য নির্ভুলভাবে প্রস্তুতকরণ ও প্রক্রিয়াগত সহায়তা প্রদান করে এবং কোনো প্রকার "ভিসা গ্যারান্টি" প্রদান করে না। টিকেট রিফান্ড, বাতিল, পুনঃইস্যু এবং তারিখ পরিবর্তন সংশ্লিষ্ট এয়ারলাইন্সের ফেয়ার রুলস ও নীতিমালা সাপেক্ষে কার্যকর হবে।'
                  : 'Visa approval, processing duration, flight schedules, airfares, and immigration entry decisions are strictly at the discretion of the respective airline, embassy, consulate, or governmental immigration authorities. Siam Air & Digital Service provides professional application preparation and guidance and DOES NOT guarantee visa approval. Air ticket refunds, cancellations, date changes, and reissues are subject to the fare rules and policies of the respective operating airlines.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-emerald-400/90 font-medium">
              {lang === 'bn'
                ? 'নিরাপত্তা সতর্কবার্তা: Siam Air & Digital Service কখনও আপনার বিকাশ, নগদ বা ব্যাংক একাউন্টের পিন (PIN), ওটিপি (OTP) বা পাসওয়ার্ড জানতে চাইবে না। কোনো অবস্থাতেই কাউকে আপনার গোপন নিরাপত্তা তথ্য দিবেন না।'
                : 'Security Warning: Siam Air & Digital Service will NEVER ask for your bKash/Nagad PIN, Bank Password, or OTP. Never share your confidential authentication credentials with anyone.'}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Policy Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4">
          <p>© {new Date().getFullYear()} Siam Air & Digital Service. All rights reserved.</p>

          <div className="flex flex-wrap gap-4 text-xs">
            <button onClick={() => handleLink('/privacy-policy')} className="hover:text-slate-300 transition-colors">
              {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleLink('/terms')} className="hover:text-slate-300 transition-colors">
              {lang === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions'}
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleLink('/refund-policy')} className="hover:text-slate-300 transition-colors">
              {lang === 'bn' ? 'রিফান্ড পলিসি' : 'Refund Policy'}
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleLink('/admin')} className="text-slate-400 hover:text-amber-400 font-semibold">
              {lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
