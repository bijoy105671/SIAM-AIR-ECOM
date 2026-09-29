import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Lock,
  Send,
  Building,
  Phone,
  MessageCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface PaymentPageProps {
  navigate: (path: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ navigate }) => {
  const {
    lang,
    paymentConfig,
    openQrLightbox,
    addPaymentSubmission,
    openWhatsApp,
    showNotification
  } = useApp();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceName, setServiceName] = useState('Air Ticket');
  const [paymentMethod, setPaymentMethod] = useState('bKash Personal');
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [notes, setNotes] = useState('');
  const [proofFileName, setProofFileName] = useState('');

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showNotification(lang === 'bn' ? `${text} কপি করা হয়েছে!` : `Copied ${text}!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !transactionId.trim() || !amountPaid) {
      showNotification(
        lang === 'bn' ? 'দয়া করে নাম, ফোন, ট্রানজেকশন আইডি এবং টাকার পরিমাণ লিখুন' : 'Please fill all required payment fields',
        'error'
      );
      return;
    }

    const sub = addPaymentSubmission({
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      service: serviceName,
      paymentMethod,
      transactionId: transactionId.trim(),
      amount: amountPaid,
      paymentDate: new Date().toISOString().split('T')[0],
      notes: notes.trim() || undefined,
      proofUrl: proofFileName || undefined
    });

    setSubmittedId(sub.id);
    showNotification(
      lang === 'bn' ? 'পেমেন্ট তথ্য সফলভাবে জমা হয়েছে!' : 'Payment submission received for verification!'
    );
  };

  const handleContinueWhatsApp = () => {
    const msg = lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসে পেমেন্ট তথ্য জমা দিয়েছি (Verification ID: ${submittedId})।
নাম: ${customerName}
মোবাইল: ${customerPhone}
সেবা: ${serviceName}
মাধ্যম: ${paymentMethod}
টাকার পরিমাণ: ৳${amountPaid}
ট্রানজেকশন আইডি (TrxID): ${transactionId}
প্রেরক নম্বর: ${senderNumber || customerPhone}
অনুগ্রহ করে পেমেন্ট যাচাই করে কনফার্মেশন রিসিট প্রদান করবেন।`
      : `Hello Siam Air & Digital, I submitted payment details on your website (ID: ${submittedId}).
Name: ${customerName}
Phone: ${customerPhone}
Service: ${serviceName}
Method: ${paymentMethod}
Amount: BDT ${amountPaid}
TrxID: ${transactionId}
Sender: ${senderNumber || customerPhone}
Please verify and issue confirmation receipt.`;

    openWhatsApp(msg);
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
            {lang === 'bn' ? 'নিরাপদ পেমেন্ট গেটওয়ে ও ভেরিফিকেশন' : 'Verified Secure Payment Hub'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'bn'
              ? 'বিকাশ, নগদ, রকেট ও ব্যাংক একাউন্টে স্বচ্ছ পেমেন্ট পদ্ধতি'
              : 'Pay Safely via bKash, Nagad, Rocket & Official Bank Accounts'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসের অফিসিয়াল একাউন্টে পেমেন্ট করুন এবং সরাসরি ট্রানজেকশন আইডি দিয়ে অনলাইনে ভেরিফিকেশন নিশ্চিত করুন।'
              : 'Choose your convenient mobile financial service or bank transfer. Submit your TrxID for instant reconciliation and official money receipt.'}
          </p>
        </div>
      </section>

      {/* 2. Security Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-emerald-950">
          <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">
              {lang === 'bn' ? 'নিরাপত্তা সতর্কবার্তা (Zero Fraud Policy):' : 'Zero Fraud & Security Guarantee:'}
            </span>
            <p className="leading-relaxed text-emerald-900/90">
              {lang === 'bn'
                ? 'সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস কখনও আপনার একাউন্টের গোপন পিন (PIN), ওটিপি (OTP) বা ব্যাংক পাসওয়ার্ড চাইবে না। নিচে প্রদর্শিত আমাদের ভেরিফাইড নম্বর ও একাউন্ট ব্যতীত অন্য কোনো ব্যক্তিগত নম্বরে লেনদেন করবেন না।'
                : 'Siam Air & Digital Service will NEVER ask for your confidential PIN, OTP, or password. Only make payments to the verified accounts listed on this official page.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mobile Financial Services (bKash / Nagad / Rocket) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'মোবাইল ব্যাংকিং পেমেন্ট মেথডসমূহ' : 'Mobile Banking Accounts'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'bn'
                ? 'নম্বর কপি করতে বা কিউআর কোড স্ক্যান করতে নিচের বোতাম ব্যবহার করুন'
                : 'Click copy or scan QR code for seamless transfer'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* bKash Card */}
            <div className="bg-white rounded-3xl border border-pink-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#E2136E]">bKash</span>
                  <span className="text-[10px] font-bold bg-pink-50 text-pink-700 px-2 py-0.5 rounded">বিকাশ</span>
                </div>
                <button
                  onClick={() => openQrLightbox({
                    title: 'bKash QR Code',
                    image: paymentConfig.bkash.qrUrl,
                    number: paymentConfig.bkash.number,
                    instructions: lang === 'bn' ? paymentConfig.bkash.instructionsBn : paymentConfig.bkash.instructionsEn
                  })}
                  className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl transition-colors cursor-pointer"
                  title="Scan bKash QR"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-pink-50/50 p-3.5 rounded-2xl border border-pink-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-pink-800 uppercase block">
                      {lang === 'bn' ? paymentConfig.bkash.accountTypeBn : paymentConfig.bkash.accountTypeEn}
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-900">{paymentConfig.bkash.number}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentConfig.bkash.number, 'bkash_per')}
                    className="p-1.5 bg-white hover:bg-pink-100 text-pink-700 rounded-lg border border-pink-200 transition-colors cursor-pointer"
                    title="Copy bKash Number"
                  >
                    {copiedKey === 'bkash_per' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'bn' ? paymentConfig.bkash.instructionsBn : paymentConfig.bkash.instructionsEn}
              </p>
            </div>

            {/* Nagad Card */}
            <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#F7931E]">Nagad</span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">নগদ</span>
                </div>
                <button
                  onClick={() => openQrLightbox({
                    title: 'Nagad QR Code',
                    image: paymentConfig.nagad.qrUrl,
                    number: paymentConfig.nagad.number,
                    instructions: lang === 'bn' ? paymentConfig.nagad.instructionsBn : paymentConfig.nagad.instructionsEn
                  })}
                  className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-colors cursor-pointer"
                  title="Scan Nagad QR"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      {lang === 'bn' ? paymentConfig.nagad.accountTypeBn : paymentConfig.nagad.accountTypeEn}
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-900">{paymentConfig.nagad.number}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentConfig.nagad.number, 'nagad_per')}
                    className="p-1.5 bg-white hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'nagad_per' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'bn' ? paymentConfig.nagad.instructionsBn : paymentConfig.nagad.instructionsEn}
              </p>
            </div>

            {/* Rocket & Cash Card */}
            <div className="bg-white rounded-3xl border border-purple-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#8C3494]">Rocket</span>
                  <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">রকেট</span>
                </div>
                <div className="text-xs font-bold text-slate-500">DBBL</div>
              </div>

              <div className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-800 uppercase block">Rocket Personal</span>
                    <span className="font-mono text-sm font-bold text-slate-900">+8801883400808</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('+8801883400808', 'rocket')}
                    className="p-1.5 bg-white hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'rocket' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">সরাসরি ক্যাশ পেমেন্ট:</span>
                <p>সূত্রধর সুপার মার্কেট, রামকৃষ্ণপুর বাজার, হোমনা অফিসে সরাসরি ক্যাশ পেমেন্ট গ্রহণ করা হয়।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bank Transfer Accounts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'bn' ? 'অফিসিয়াল ব্যাংক একাউন্ট বিবরণ' : 'Official Bank Accounts'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'যেকোনো ব্যাংক শাখা বা অনলাইন অ্যাপ থেকে ফান্ড ট্রান্সফার করা যাবে' : 'Direct BEFTN / NPSB / RTGS transfer from any Bangladeshi bank'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentConfig.bankAccounts.map((bank, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{bank.bankName}</h4>
                    <span className="text-xs text-slate-500">{bank.branch}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bank.accountNumber, `bank_${i}`)}
                    className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedKey === `bank_${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `bank_${i}` ? 'কপি হয়েছে' : 'কপি নম্বর'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Name:</span>
                    <span className="font-bold text-slate-900">{bank.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Number:</span>
                    <span className="font-mono font-bold text-blue-700">{bank.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Routing Number:</span>
                    <span className="font-mono text-slate-700">{bank.routingNo || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Payment Verification Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'পেমেন্ট সাবমিশন ও রিসিট' : 'Submit Payment Verification'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {lang === 'bn' ? 'টাকা পাঠানোর পর নিচের ফর্মটি পূরণ করুন' : 'Confirm Your Sent Payment'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'bn'
                ? 'আপনার ট্রানজেকশন আইডি প্রদান করুন যাতে আমাদের হিসাব বিভাগ অবিলম্বে আপনার টিকিট বা ফাইল কনফার্ম করতে পারে।'
                : 'Submit your TrxID to immediately verify your order and issue your official electronic voucher.'}
            </p>
          </div>

          {submittedId ? (
            <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <FileCheck className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500">Payment Verification ID:</span>
                <div className="text-xl font-mono font-black text-blue-800">{submittedId}</div>
                <h4 className="text-xl font-bold text-slate-900 mt-2">
                  {lang === 'bn' ? 'পেমেন্ট তথ্য সফলভাবে গ্রহণ করা হয়েছে!' : 'Payment Submission Confirmed!'}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  {lang === 'bn'
                    ? 'আমাদের অ্যাডমিন টিম আপনার ট্রানজেকশন যাচাই করছে। দ্রুততম কনফার্মেশনের জন্য হোয়াটসঅ্যাপে চ্যাট করুন।'
                    : 'Our accounts team is verifying this transaction. Click below to confirm via WhatsApp.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleContinueWhatsApp}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে মানি রিসিট চান' : 'Get Money Receipt on WhatsApp'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  {lang === 'bn' ? 'আরেকটি পেমেন্ট সাবমিট' : 'Submit Another Payment'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'গ্রাহকের পূর্ণ নাম *' : 'Customer Name *'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার নাম' : 'Full Name'}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'যে সেবার জন্য পেমেন্ট করেছেন *' : 'Service Paid For *'}
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Air Ticket">এয়ার টিকিট (Air Ticket Booking)</option>
                    <option value="India Visa Assistance">ভারত ভিসা প্রসেসিং (India Visa)</option>
                    <option value="Thailand Visa Assistance">থাইল্যান্ড ভিসা প্রসেসিং (Thai Visa)</option>
                    <option value="Saudi / Umrah Visa">সৌদি / ওমরাহ ভিসা</option>
                    <option value="Umrah Package">ওমরাহ প্যাকেজ বুকিং</option>
                    <option value="Ticket Date Change">টিকেট তারিখ পরিবর্তন / রি-ইস্যু</option>
                    <option value="Hotel Booking">হোটেল বুকিং</option>
                    <option value="Computer & Digital Services">কম্পিউটার ও ডিজিটাল সেবা</option>
                    <option value="Other">অন্যান্য সেবা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'পেমেন্ট মাধ্যম *' : 'Payment Method *'}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="bKash Personal">bKash Personal (বিকাশ পার্সোনাল)</option>
                    <option value="bKash Merchant">bKash Merchant (বিকাশ মার্চেন্ট)</option>
                    <option value="Nagad Personal">Nagad Personal (নগদ পার্সোনাল)</option>
                    <option value="Nagad Merchant">Nagad Merchant (নগদ মার্চেন্ট)</option>
                    <option value="Rocket">Rocket (রকেট)</option>
                    <option value="Bank Transfer (Islami Bank)">Bank Transfer (Islami Bank)</option>
                    <option value="Bank Transfer (Dutch-Bangla)">Bank Transfer (Dutch-Bangla)</option>
                    <option value="Cash at Office">Cash at Office (অফিসে সরাসরি নগদ)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ট্রানজেকশন আইডি (TrxID) *' : 'Transaction ID (TrxID) *'}
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. BL92XK91LM"
                    className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'প্রেরক নম্বর / একাউন্ট' : 'Sender Number / Account'}
                  </label>
                  <input
                    type="text"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="যে নম্বর থেকে টাকা পাঠানো হয়েছে"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'প্রেরিত টাকার পরিমাণ (BDT) *' : 'Amount Paid (BDT) *'}
                  </label>
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    placeholder="৳ টাকার অংক"
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Upload Proof (Mock/Client File Selection) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'পেমেন্ট স্ক্রিনশট বা রসিদ (যদি থাকে)' : 'Payment Screenshot / Slip (Optional)'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProofFileName(e.target.files[0].name);
                      }
                    }}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {proofFileName && (
                    <span className="text-xs text-emerald-600 font-medium truncate max-w-xs">
                      ✓ {proofFileName}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'অতিরিক্ত মন্তব্য (যদি থাকে)' : 'Additional Notes (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="উদা: বিমানের রিটার্ন টিকিটের প্রথম কিস্তি"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'পেমেন্ট ভেরিফিকেশন জমা দিন' : 'Submit Payment for Verification'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
