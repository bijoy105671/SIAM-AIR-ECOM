import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Award,
  Users,
  Building,
  HeartHandshake
} from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { lang, businessInfo, openWhatsApp, callNow } = useApp();

  return (
    <div className="space-y-16 py-8">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {lang === 'bn' ? 'আমাদের পরিচিতি' : 'About Our Agency'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস – সততা ও পেশাদারিত্বের অঙ্গীকার'
              : 'Siam Air & Digital Service – Committed to Trust & Excellence'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'হোমনা, কুমিল্লা থেকে শুরু করে দেশ ও বিদেশের সম্মানিত প্রবাসী ও যাত্রীদের জন্য নির্ভরযোগ্য এয়ার টিকিটিং, ভিসা প্রসেসিং এবং আইটি সেবা প্রদান করে আসছি।'
              : 'Founded with a clear vision to provide honest, transparent air ticketing, visa file preparation, and digital services to expatriates, travelers, and local communities.'}
          </p>
        </div>
      </section>

      {/* 2. Mission & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'শতভাগ স্বচ্ছতা ও সততা' : '100% Transparency'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আমরা কোনো ভুয়া ভিসা গ্যারান্টি বা গোপন হিডেন চার্জ ছাড়া কাজ করি। প্রতিটি টিকেটের এয়ারলাইন্স অফিশিয়াল পিএনআর ও ফেয়ার রুলস গ্রাহককে পরিষ্কারভাবে জানানো হয়।'
                : 'No false promises or hidden costs. We provide genuine airline PNRs and upfront embassy regulations for every traveler.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'গ্রাহক সন্তুষ্টি ও দীর্ঘমেয়াদী আস্থা' : 'Customer-First Relationship'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'শুধু একবার টিকেট বিক্রি করা আমাদের উদ্দেশ্য নয়। ভ্রমণ চলাকালীন ও পরবর্তী যেকোনো সহযোগিতায় গ্রাহকের পাশে থাকি।'
                : 'We prioritize lasting relationships. From initial inquiry through airport boarding and return, we are just a call away.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'আধুনিক ডিজিটাল প্রযুক্তি' : 'Modern Digital Capabilities'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'অনলাইন ই-ভিসা, জিডিএস সিট রিজার্ভেশন, দ্রুততম ডিজিটাল প্রিন্টিং এবং রিয়েল-টাইম হোয়াটসঅ্যাপ ট্র্যাকিং।'
                : 'Leveraging modern global distribution systems, fast e-visa platforms, and instant WhatsApp support.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Physical Office Details & Founder Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'আমাদের অবস্থান ও অফিসিয়াল তথ্য' : 'Our Physical Presence'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'bn'
                ? 'রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেটে সরাসরি ভিজিট করুন'
                : 'Visit Us in Ramkrishnapur Bazar, Homna, Cumilla'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'হোমনা উপজেলা ও পার্শ্ববর্তী অঞ্চলের সকল প্রবাসী ভাই ও সম্মানিত নাগরিকদের ট্রাভেল সংক্রান্ত সকল কাজের সুবিধার্থে আমাদের সার্বক্ষণিক অফিস প্রস্তুত রয়েছে। সরাসরি অফিসে এসে চা খেতে খেতে আলোচনা করতে পারেন।'
                : 'We welcome you to visit our office in person for visa file discussions, flight bookings, and passport verification in a comfortable environment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase block mb-1">Office Location</span>
              <span className="text-slate-900 font-semibold">{businessInfo.addressBn}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase block mb-1">Direct Hotline</span>
              <a href={`tel:${businessInfo.phone}`} className="text-blue-700 font-bold hover:underline block">
                {businessInfo.phone}
              </a>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase block mb-1">WhatsApp Desk</span>
              <span className="text-emerald-700 font-bold block">{businessInfo.whatsapp}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase block mb-1">Hours</span>
              <span className="text-slate-800 font-semibold block">{businessInfo.hoursBn}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
