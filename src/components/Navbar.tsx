import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  Phone,
  MessageCircle,
  Menu,
  X,
  Shield,
  CreditCard,
  Building2,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { lang, setLang, businessInfo, openWhatsApp, callNow } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', labelEn: 'Home', labelBn: 'হোম' },
    { path: '/air-ticket', labelEn: 'Air Ticket', labelBn: 'এয়ার টিকিট' },
    {
      path: '/visa',
      labelEn: 'Visa Services',
      labelBn: 'ভিসা সার্ভিস',
      hasDropdown: true
    },
    { path: '/umrah', labelEn: 'Umrah', labelBn: 'ওমরাহ প্যাকেজ' },
    { path: '/upload', labelEn: 'Photo & Print Upload', labelBn: 'ফটো ও ফাইল আপলোড', highlight: true },
    { path: '/services', labelEn: 'Other Services', labelBn: 'অন্যান্য সেবা' },
    { path: '/payment', labelEn: 'Payment', labelBn: 'পেমেন্ট' },
    { path: '/about', labelEn: 'About Us', labelBn: 'আমাদের সম্পর্কে' },
    { path: '/contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setVisaDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-900 text-blue-200 border border-blue-700">
              {lang === 'bn' ? 'বিশ্বস্ত সেবা' : 'Verified Service'}
            </span>
            <span className="text-slate-300 truncate">
              {lang === 'bn'
                ? 'রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা'
                : 'Ramkrishnapur Bazar, Shutradhar Super Market, Homna, Cumilla'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={callNow}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-white">{businessInfo.phone}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('/tools/qr-stands')}
              className="hidden md:inline-flex text-slate-300 hover:text-white items-center gap-1 transition-colors text-[11px] cursor-pointer"
              title="Desk QR Stand"
            >
              <span>কিউআর স্ট্যান্ড</span>
            </button>
            <span className="hidden md:inline text-slate-700">|</span>
            <button
              onClick={() => handleNavClick('/studio')}
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors text-[11px] cursor-pointer font-bold"
              title="Photo Studio"
            >
              <span>ফটো স্টুডিও</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('/admin')}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
              title="Admin Portal"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>{lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200'
            : 'bg-white py-3 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <div
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
                <Plane className="w-6 h-6 transform -rotate-45" />
              </div>
              <div>
                <div className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
                  <span>Siam Air</span>
                  <span className="text-blue-700">& Digital</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 leading-none">
                  {lang === 'bn' ? 'ট্রাভেল ও ডিজিটাল সার্ভিস • হোমনা, কুমিল্লা' : 'Travel & Digital Service • Bangladesh'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => setVisaDropdownOpen(true)}
                      onMouseLeave={() => setVisaDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleNavClick(link.path)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                          isActive
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                        }`}
                      >
                        {lang === 'bn' ? link.labelBn : link.labelEn}
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      {visaDropdownOpen && (
                        <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <button
                            onClick={() => handleNavClick('/visa')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-blue-50 font-semibold flex items-center justify-between"
                          >
                            <span>{lang === 'bn' ? 'সকল দেশের ভিসা হাব' : 'All Visa Services Hub'}</span>
                            <span className="text-xs text-blue-600">→</span>
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            onClick={() => handleNavClick('/visa/india')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <span>🇮🇳</span>
                            <span>{lang === 'bn' ? 'ভারত ভিসা (India Visa)' : 'India Visa Application'}</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('/visa/thailand')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <span>🇹🇭</span>
                            <span>{lang === 'bn' ? 'থাইল্যান্ড ট্যুরিস্ট ভিসা' : 'Thailand Tourist Visa'}</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('/visa/saudi')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <span>🇸🇦</span>
                            <span>{lang === 'bn' ? 'সৌদি / ওমরাহ ভিসা' : 'Saudi / Umrah Visa'}</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('/visa/other')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <span>🌍</span>
                            <span>{lang === 'bn' ? 'অন্যান্য দেশসমূহ' : 'Other Countries'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'text-blue-700 bg-blue-50 font-bold'
                        : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {lang === 'bn' ? link.labelBn : link.labelEn}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Language Switcher & Quick CTAs */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    lang === 'en'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Call Now CTA */}
              <button
                onClick={callNow}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>{lang === 'bn' ? 'কল করুন' : 'Call Now'}</span>
              </button>

              {/* WhatsApp CTA */}
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Mobile Hamburger Button + Mobile Lang */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setLang('bn')}
                  className={`px-2 py-1 rounded ${lang === 'bn' ? 'bg-blue-700 text-white' : 'text-slate-700'}`}
                >
                  বাং
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-700 text-white' : 'text-slate-700'}`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                onClick={callNow}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 text-slate-900 font-bold rounded-lg text-xs"
              >
                <Phone className="w-4 h-4 text-blue-700" />
                <span>{lang === 'bn' ? 'কল করুন' : 'Call Now'}</span>
              </button>
              <button
                onClick={() => {
                  openWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 text-white font-bold rounded-lg text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    currentPath === link.path
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-amber-50 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন পোর্টাল ও সেটিংস' : 'Admin Portal & Settings'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
