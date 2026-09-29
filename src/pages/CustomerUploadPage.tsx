import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  CheckCircle2,
  Clock,
  MessageCircle,
  Copy,
  AlertCircle,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Phone,
  Search,
  ArrowRight,
  ShieldCheck,
  Printer,
  ChevronRight,
  X
} from 'lucide-react';
import { StudioOrderFile, StudioOrder } from '../types';

interface CustomerUploadPageProps {
  navigate: (path: string) => void;
}

export const CustomerUploadPage: React.FC<CustomerUploadPageProps> = ({ navigate }) => {
  const { lang, businessInfo, addStudioOrder, studioOrders, showNotification } = useApp();

  // Mode: 'upload' | 'track'
  const [activeTab, setActiveTab] = useState<'upload' | 'track'>('upload');

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('পাসপোর্ট সাইজ ছবি (Passport Photo)');
  const [requiredSize, setRequiredSize] = useState('35x45 mm (BD Passport)');
  const [customSize, setCustomSize] = useState('');
  const [copies, setCopies] = useState<number>(4);
  const [urgent, setUrgent] = useState(false);
  const [deliveryPref, setDeliveryPref] = useState<'counter_pickup' | 'digital_download' | 'home_delivery'>('counter_pickup');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<StudioOrderFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<StudioOrder | null>(null);

  // Tracking Search
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedOrders, setTrackedOrders] = useState<StudioOrder[] | null>(null);

  // File upload handler (compresses large image files to prevent memory/storage quota issues)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > 25 * 1024 * 1024) {
        showNotification(
          lang === 'bn' ? 'ফাইল সাইজ ২৫ মেগাবাইটের বেশি হতে পারবে না' : 'File size must be under 25MB',
          'error'
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const rawDataUrl = event.target?.result as string;
        
        // If image file, scale down high-res phone camera shots (e.g. 4000px down to max 1800px)
        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.onload = () => {
            const maxDim = 1800;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
              if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
              } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
              const approxKb = Math.round((optimizedDataUrl.length * 3) / 4 / 1024);
              const newFileItem: StudioOrderFile = {
                id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                fileName: file.name,
                fileType: 'image/jpeg',
                fileSizeKb: approxKb,
                dataUrl: optimizedDataUrl
              };
              setFiles((prev) => [...prev, newFileItem]);
              return;
            }

            const fallbackItem: StudioOrderFile = {
              id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              fileName: file.name,
              fileType: file.type,
              fileSizeKb: Math.round(file.size / 1024),
              dataUrl: rawDataUrl
            };
            setFiles((prev) => [...prev, fallbackItem]);
          };
          img.onerror = () => {
            const fallbackItem: StudioOrderFile = {
              id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              fileName: file.name,
              fileType: file.type,
              fileSizeKb: Math.round(file.size / 1024),
              dataUrl: rawDataUrl
            };
            setFiles((prev) => [...prev, fallbackItem]);
          };
          img.src = rawDataUrl;
        } else {
          // Document / PDF file
          const newFileItem: StudioOrderFile = {
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            fileName: file.name,
            fileType: file.type,
            fileSizeKb: Math.round(file.size / 1024),
            dataUrl: rawDataUrl
          };
          setFiles((prev) => [...prev, newFileItem]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      showNotification(lang === 'bn' ? 'দয়া করে আপনার নাম লিখুন' : 'Please enter your name', 'error');
      return;
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 11) {
      showNotification(lang === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Please enter a valid 11-digit mobile number', 'error');
      return;
    }
    if (files.length === 0) {
      showNotification(lang === 'bn' ? 'দয়া করে কমপক্ষে একটি ছবি বা ফাইল আপলোড করুন' : 'Please upload at least one image or document', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalSize = requiredSize === 'custom' ? customSize || 'Custom Size' : requiredSize;
      const order = addStudioOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        serviceType,
        requiredSize: finalSize,
        copies: Number(copies) || 1,
        notes: notes.trim(),
        urgent,
        deliveryPref,
        files
      });

      setSubmittedOrder(order);
      // Reset form
      setCustomerName('');
      setPhone('');
      setNotes('');
      setFiles([]);
    } catch (err) {
      console.error(err);
      showNotification('অর্ডার জমা দিতে সমস্যা হয়েছে, আবার চেষ্টা করুন', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setTrackedOrders(null);
      return;
    }

    const matches = studioOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(query) ||
        o.phone.includes(query) ||
        o.customerName.toLowerCase().includes(query)
    );
    setTrackedOrders(matches);
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    showNotification(lang === 'bn' ? 'অর্ডার আইডি কপি হয়েছে!' : 'Order ID copied!');
  };

  const openWhatsAppOrderConfirmation = (order: StudioOrder) => {
    const cleanPhone = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `আসসালামু আলাইকুম সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস,\nআমি মাত্র কাউন্টার কিউআর স্ক্যান করে একটি অর্ডার সাবমিট করেছি।\n\n📌 অর্ডার আইডি: ${order.id}\n👤 নাম: ${order.customerName}\n📱 মোবাইল: ${order.phone}\n🛠️ সেবা: ${order.serviceType}\n📐 সাইজ: ${order.requiredSize} (${order.copies} কপি)\n${order.urgent ? '⚡ জরুরি ডেলিভারি প্রয়োজন\n' : ''}\nদয়া করে আমার অর্ডারটি চেক করবেন। ধন্যবাদ!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Branding Card */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস + প্রজাপতি প্রিন্ট মিডিয়া</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {lang === 'bn' ? 'কাউন্টার ডিজিটাল সেবা ও ফটো আপলোড' : 'Digital Service & Photo Upload'}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                {lang === 'bn'
                  ? 'কোনো অ্যাকাউন্ট বা লগইন ছাড়াই সরাসরি আপনার ছবি ও ডকুমেন্ট আপলোড করুন। দোকানের কম্পিউটারে তা মুহূর্তেই পৌঁছে যাবে।'
                  : 'Scan, upload photos & documents without any registration. Shop computer receives your order instantly.'}
              </p>
            </div>
          </div>

          {/* Quick Tabs: Upload vs Track */}
          <div className="mt-6 flex bg-white/10 backdrop-blur-md p-1 rounded-2xl max-w-sm">
            <button
              onClick={() => {
                setActiveTab('upload');
                setSubmittedOrder(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'upload' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-200 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'নতুন কাজ আপলোড' : 'New Upload'}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'track' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-200 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'অর্ডার স্ট্যাটাস দেখুন' : 'Track Order'}
            </button>
          </div>
        </div>

        {/* TAB 1: ORDER SUBMITTED SUCCESS SCREEN */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-100 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Order Successfully Submitted
            </span>

            <h2 className="text-2xl font-black text-slate-900 mt-3">
              {lang === 'bn' ? 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!' : 'Your Order is Received!'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
              দোকানের কাউন্টার কম্পিউটারে আপনার ফাইল পৌঁছে গেছে। আমাদের দক্ষ অপারেটর দ্রুত কাজ সম্পন্ন করবেন।
            </p>

            {/* Order Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-500">অর্ডার নম্বর (Order ID):</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-mono font-black text-blue-700">{submittedOrder.id}</span>
                  <button
                    onClick={() => copyOrderId(submittedOrder.id)}
                    className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                    title="Copy Order ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">গ্রাহকের নাম:</span>
                  <span className="font-bold text-slate-800">{submittedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">মোবাইল:</span>
                  <span className="font-bold text-slate-800">{submittedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">সার্ভিস:</span>
                  <span className="font-semibold text-slate-800">{submittedOrder.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">সাইজ ও কপি:</span>
                  <span className="font-bold text-blue-700">{submittedOrder.requiredSize} ({submittedOrder.copies} কপি)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">বর্তমান অবস্থা:</span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-[11px]">
                  {submittedOrder.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => openWhatsAppOrderConfirmation(submittedOrder)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>কাউন্টারে হোয়াটসঅ্যাপে নিশ্চিত করুন</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSubmittedOrder(null);
                    setActiveTab('upload');
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  অন্য ফাইল আপলোড করুন
                </button>
                <button
                  onClick={() => {
                    setSearchQuery(submittedOrder.id);
                    setActiveTab('track');
                    setSubmittedOrder(null);
                  }}
                  className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  স্ট্যাটাস ট্র্যাক করুন
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'upload' ? (
          /* TAB 2: UPLOAD FORM */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'গ্রাহকের তথ্য ও কাজের বিবরণ' : 'Customer & Order Information'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'bn' ? 'আপনার তথ্য দিন যাতে কাজ শেষ হলে আমরা যোগাযোগ করতে পারি।' : 'Enter your details so we can process and deliver your order.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Customer Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোহাম্মদ রফিক"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (WhatsApp) *' : 'Mobile Number (WhatsApp) *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="018XXXXXXXX"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'সার্ভিস ক্যাটাগরি' : 'Service Type'}
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  <option value="পাসপোর্ট সাইজ ছবি (Passport Photo)">পাসপোর্ট সাইজ ছবি (Passport Photo)</option>
                  <option value="ভিসা সাইজ ছবি (Visa Photo 2x2)">ভিসা সাইজ ছবি (Visa Photo 2x2 inch)</option>
                  <option value="চাকরির আবেদন ছবি ও স্বাক্ষর (Job Photo & Sign)">চাকরির আবেদন ছবি ও স্বাক্ষর (Job Photo & Sign)</option>
                  <option value="ডকুমেন্ট ও সার্টিফিকেট কালার প্রিন্ট">ডকুমেন্ট ও সার্টিফিকেট কালার প্রিন্ট</option>
                  <option value="ফটোকপি ও লেমিনেটিং">ফটোকপি ও লেমিনেটিং</option>
                  <option value="প্রজাপতি প্রিন্ট মিডিয়া ব্যানার/পোস্টার">প্রজাপতি প্রিন্ট মিডিয়া ব্যানার/পোস্টার</option>
                  <option value="ভিজিটিং কার্ড ও মেমো ডিজাইন">ভিজিটিং কার্ড ও মেমো ডিজাইন</option>
                  <option value="অনলাইন ভর্তি ও সরকারি আবেদন">অনলাইন ভর্তি ও সরকারি আবেদন</option>
                  <option value="এয়ার টিকিট / ওমরাহ ডকুমেন্ট">এয়ার টিকিট / ওমরাহ ডকুমেন্ট</option>
                  <option value="অন্যান্য কাজ">অন্যান্য কাজ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'প্রয়োজনীয় সাইজ' : 'Required Size'}
                </label>
                <select
                  value={requiredSize}
                  onChange={(e) => setRequiredSize(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  <option value="35x45 mm (BD Passport)">35×45 mm (বাংলাদেশ পাসপোর্ট ও এনআইডি)</option>
                  <option value="2x2 inch (50x50 mm) Visa">2×2 inch (আমেরিকা, সৌদি ও ভারতীয় ভিসা)</option>
                  <option value="300x300 px (Job Photo)">300×300 px (সরকারি চাকরি / টেলিটক)</option>
                  <option value="300x100 px (Signature)">300×100 px (অনলাইন স্বাক্ষর)</option>
                  <option value="A4 Size Paper">A4 Size Paper (ডকুমেন্ট প্রিন্ট)</option>
                  <option value="4R Photo Paper (4x6 inch)">4R Photo Paper (৪×৬ ইঞ্চি প্রিন্ট)</option>
                  <option value="Stamp Size (20x25 mm)">স্ট্যাম্প সাইজ (20×25 mm)</option>
                  <option value="custom">অন্য কোনো সাইজ (নিচে লিখুন)</option>
                </select>
              </div>
            </div>

            {requiredSize === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'কাস্টম সাইজ লিখুন' : 'Specify Custom Size'}
                </label>
                <input
                  type="text"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder="যেমন: ৩ ফুট × ২ ফুট ব্যানার অথবা নির্দিষ্ট পিক্সেল"
                  className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'কপি সংখ্যা (Number of Copies)' : 'Copies Needed'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 4, 6, 8, 12, 16].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCopies(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        copies === num
                          ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ডেলিভারি মাধ্যম' : 'Delivery Method'}
                </label>
                <select
                  value={deliveryPref}
                  onChange={(e) => setDeliveryPref(e.target.value as any)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  <option value="counter_pickup">কাউন্টার থেকে প্রিন্ট কপি সংগ্রহ (Store Pickup)</option>
                  <option value="digital_download">অনলাইনে সফট কপি / ডাউনলোড (Digital File)</option>
                  <option value="home_delivery">হোম ডেলিভারি (জরুরি ক্ষেত্রে)</option>
                </select>
              </div>
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'ছবি বা ফাইল আপলোড করুন *' : 'Upload Photos or Documents *'}
              </label>

              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-6 text-center transition-all cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 pointer-events-none">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 pointer-events-none">
                  {lang === 'bn' ? 'ফাইল সিলেক্ট করতে এখানে চাপুন বা টেনে আনুন' : 'Click to select or drag & drop files here'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 pointer-events-none">
                  JPG, PNG, PDF সাপোর্টেড (সর্বোচ্চ ২৫ মেগাবাইট)
                </p>
              </div>

              {/* Uploaded Files Previews */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  <span className="text-xs font-bold text-slate-600">সংযুক্ত ফাইল ({files.length}):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {file.fileType.startsWith('image/') ? (
                            <img
                              src={file.dataUrl}
                              alt="thumb"
                              className="w-9 h-9 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                          <div className="truncate">
                            <span className="font-semibold text-slate-800 block truncate">{file.fileName}</span>
                            <span className="text-[10px] text-slate-400">{file.fileSizeKb} KB</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-slate-200 text-slate-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'বিশেষ নির্দেশনা বা বিবরণ (ঐচ্ছিক)' : 'Special Instructions (Optional)'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="যেমন: ব্যাকগ্রাউন্ড নীল কালার করে দিন, অথবা স্বাক্ষরটি স্পষ্ট ও ঝকঝকে করুন..."
                className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Urgent checkbox */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-xs text-amber-900 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span>⚡ এটি অত্যন্ত জরুরি (Urgent Processing Needed)</span>
              </label>
              <span className="text-[10px] text-amber-700 font-semibold">কাউন্টারে অগ্রাধিকার</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20 transition-all cursor-pointer text-sm disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              <span>{isSubmitting ? 'আপলোড হচ্ছে...' : 'অর্ডার জমা দিন (Submit Order)'}</span>
            </button>
          </form>
        ) : (
          /* TAB 3: TRACK ORDER STATUS */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'অর্ডার অনুসন্ধান ও লাইভ অবস্থা' : 'Track Order Status'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'bn'
                  ? 'আপনার অর্ডার আইডি (SA-2026-XXXXXX) অথবা মোবাইল নম্বর দিয়ে বর্তমান অবস্থা জানুন।'
                  : 'Enter your Order ID or phone number to see current progress.'}
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="অর্ডার আইডি (SA-2026-...) বা ফোন নম্বর"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                খুঁজুন
              </button>
            </form>

            {/* Results List */}
            {trackedOrders !== null && (
              <div className="space-y-3 pt-2">
                {trackedOrders.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold">কোনো অর্ডার পাওয়া যায়নি।</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">দয়া করে সঠিক অর্ডার আইডি বা ১১ ডিজিটের ফোন নম্বর দিন।</p>
                  </div>
                ) : (
                  trackedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-slate-50 hover:bg-blue-50/40 rounded-2xl border border-slate-200 transition-colors space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-blue-700">{order.id}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            order.status === 'Ready' || order.status === 'Completed' || order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'Processing'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block">নাম ও সেবা:</span>
                          <span className="font-bold">{order.customerName}</span> — {order.serviceType}
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">কপি ও সাইজ:</span>
                          <span className="font-semibold">{order.requiredSize} ({order.copies} কপি)</span>
                        </div>
                      </div>

                      {order.staffNotes && (
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600">
                          <span className="font-bold text-slate-800">অফিস আপডেট:</span> {order.staffNotes}
                        </div>
                      )}

                      <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-200">
                        <span>তারিখ: {new Date(order.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => openWhatsAppOrderConfirmation(order)}
                          className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp আপডেট</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Counter Help Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-700" />
            <span>দোকানের হটলাইন: <strong className="text-slate-900">{businessInfo.phone}</strong></span>
          </div>
          <div className="text-slate-500 text-center sm:text-right">
            <span>রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা</span>
          </div>
        </div>
      </div>
    </div>
  );
};
