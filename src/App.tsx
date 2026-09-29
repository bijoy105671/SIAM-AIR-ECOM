import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileQuickBar } from './components/MobileQuickBar';
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { QrLightboxModal } from './components/QrLightboxModal';
import { NotificationToast } from './components/NotificationToast';

// Pages
import { HomePage } from './pages/HomePage';
import { AirTicketPage } from './pages/AirTicketPage';
import { VisaHubPage } from './pages/VisaHubPage';
import { IndiaVisaPage } from './pages/IndiaVisaPage';
import { ThailandVisaPage } from './pages/ThailandVisaPage';
import { SaudiVisaPage } from './pages/SaudiVisaPage';
import { UmrahPage } from './pages/UmrahPage';
import { OtherServicesPage } from './pages/OtherServicesPage';
import { PaymentPage } from './pages/PaymentPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';
import { CustomerUploadPage } from './pages/CustomerUploadPage';
import { PhotoStudioPage } from './pages/PhotoStudioPage';
import { SignatureToolPage } from './pages/SignatureToolPage';
import { DocumentToolsPage } from './pages/DocumentToolsPage';
import { QrStandsPage } from './pages/QrStandsPage';
import { PrintTemplatesPage } from './pages/PrintTemplatesPage';

const AdminGate: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {\n  const [pin, setPin] = useState('');\n  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('siam_ecom_admin_session') === '1');\n  const configuredPin = (import.meta as any).env?.VITE_ADMIN_PIN || '2580';\n\n  if (authenticated) return <AdminPage navigate={navigate} />;\n\n  const submit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (pin === configuredPin) {\n      localStorage.setItem('siam_ecom_admin_session', '1');\n      setAuthenticated(true);\n      return;\n    }\n    alert('Invalid admin PIN');\n    setPin('');\n  };\n\n  return (\n    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">\n      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">\n        <div className="text-center">\n          <div className="text-3xl mb-2">🔐</div>\n          <h1 className="text-xl font-extrabold text-slate-900">Admin Access</h1>\n          <p className="text-xs text-slate-500 mt-1">Private management area</p>\n        </div>\n        <input autoFocus type="password" inputMode="numeric" value={pin} onChange={e => setPin(e.target.value)} placeholder="Admin PIN" className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />\n        <button type="submit" className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800">Enter Admin</button>\n        <button type="button" onClick={() => navigate('/')} className="w-full py-2 text-sm text-slate-500 hover:text-slate-900">Back to website</button>\n      </form>\n    </div>\n  );\n};\n\nconst AppContent: React.FC = () => {
  // Simple, robust client router that supports browser history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/air-ticket':
        return <AirTicketPage navigate={navigate} />;
      case '/visa':
        return <VisaHubPage navigate={navigate} />;
      case '/visa/india':
        return <IndiaVisaPage navigate={navigate} />;
      case '/visa/thailand':
        return <ThailandVisaPage navigate={navigate} />;
      case '/visa/saudi':
        return <SaudiVisaPage navigate={navigate} />;
      case '/umrah':
        return <UmrahPage navigate={navigate} />;
      case '/services':
        return <OtherServicesPage navigate={navigate} />;
      case '/payment':
        return <PaymentPage navigate={navigate} />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      case '/contact':
        return <ContactPage navigate={navigate} />;
      case '/faq':
        return <FAQPage navigate={navigate} />;
      case '/blog':
        return <BlogPage navigate={navigate} />;
      case '/terms':
        return <LegalPage navigate={navigate} defaultTab="terms" />;
      case '/privacy':
        return <LegalPage navigate={navigate} defaultTab="privacy" />;
      case '/refund':
        return <LegalPage navigate={navigate} defaultTab="refund" />;
      case '/admin':
        return <AdminGate navigate={navigate} />;
      case '/upload':
        return <CustomerUploadPage navigate={navigate} />;
      case '/studio':
        return <PhotoStudioPage navigate={navigate} />;
      case '/tools/signature':
        return <SignatureToolPage navigate={navigate} />;
      case '/tools/document':
        return <DocumentToolsPage navigate={navigate} />;
      case '/tools/qr-stands':
        return <QrStandsPage navigate={navigate} />;
      case '/tools/print-templates':
        return <PrintTemplatesPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased pb-16 lg:pb-0 print:p-0 print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar currentPath={currentPath} navigate={navigate} />
      </div>

      <main className="flex-grow print:p-0">
        {renderPage()}
      </main>

      <div className="print:hidden">
        <Footer navigate={navigate} />
        {/* Floating Conversion CTAs & Modals */}
        <FloatingWhatsApp />
        <MobileQuickBar navigate={navigate} />
        <QuickEnquiryModal />
        <QrLightboxModal />
        <NotificationToast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
