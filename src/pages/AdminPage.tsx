import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CreditCard,
  Settings,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageCircle,
  Search,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  LogOut,
  Save,
  Bell,
  Camera,
  Printer,
  QrCode,
  FileCheck,
  Palette,
  ExternalLink,
  Eye,
  FileText,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { LeadStatus, StudioOrderStatus } from '../types';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const {
    lang,
    leads,
    updateLeadStatus,
    deleteLead,
    paymentSubmissions,
    updatePaymentSubmissionStatus,
    studioOrders,
    updateStudioOrderStatus,
    deleteStudioOrder,
    setActiveStudioImage,
    businessInfo,
    updateBusinessInfo,
    paymentConfig,
    updatePaymentConfig,
    showNotification,
    openWhatsApp
  } = useApp();

  // Simple Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [adminPin, setAdminPin] = useState('');
  const [userRole, setUserRole] = useState<'Admin' | 'Agent'>('Admin');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'studio' | 'leads' | 'payments' | 'tools' | 'config' | 'announcements'>('studio');

  // Studio Order Filters
  const [studioStatusFilter, setStudioStatusFilter] = useState<string>('All');
  const [searchStudio, setSearchStudio] = useState<string>('');

  // Lead Filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchLead, setSearchLead] = useState<string>('');

  // Editable config state
  const [phone, setPhone] = useState(businessInfo.phone);
  const [whatsapp, setWhatsapp] = useState(businessInfo.whatsapp);
  const [email, setEmail] = useState(businessInfo.email);
  const [noticeBn, setNoticeBn] = useState(businessInfo.noticeBn || '');
  const [noticeEn, setNoticeEn] = useState(businessInfo.noticeEn || '');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'siam123' || adminPin === '1234') {
      setIsAuthenticated(true);
      showNotification('লগইন সফল হয়েছে!', 'success');
    } else {
      showNotification('ভুল পিন নম্বর! (Try: siam123)', 'error');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo({
      phone,
      whatsapp,
      email,
      noticeBn,
      noticeEn
    });
    showNotification('অফিস তথ্য সফলভাবে হালনাগাদ হয়েছে!', 'success');
  };

  const exportLeadsCSV = () => {
    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Service', 'Destination', 'Status', 'Message'];
    const rows = leads.map(l => [
      l.id,
      l.date || new Date().toLocaleDateString(),
      `"${l.customerName}"`,
      `"${l.phone}"`,
      `"${l.service}"`,
      `"${l.destination || ''}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `siam_air_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Leads CSV exported successfully!');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const query = searchLead.toLowerCase().trim();
    const matchesSearch =
      !query ||
      lead.customerName.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      lead.service.toLowerCase().includes(query) ||
      (lead.destination && lead.destination.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const filteredStudioOrders = studioOrders.filter(order => {
    const matchesStatus = studioStatusFilter === 'All' || order.status === studioStatusFilter;
    const query = searchStudio.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.phone.toLowerCase().includes(query) ||
      order.serviceType.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-sm w-full space-y-5">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">অ্যাডমিন প্রবেশদ্বার</h2>
            <p className="text-xs text-slate-500">
              সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস অ্যাডমিন ও সেলস টিম লগইন
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                পিন / পাসওয়ার্ড (Default: siam123)
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="siam123"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Role: {userRole}
            </span>
            <span className="text-xs text-slate-400">| CRM & Lead Hub</span>
          </div>
          <h1 className="text-2xl font-black mt-1">সিয়াম এয়ার কন্ট্রোল প্যানেল</h1>
          <p className="text-xs text-slate-400">
            সকল লিড, পেমেন্ট সাবমিশন ও ওয়েবসাইট রিয়েল-টাইম কনফিগারেশন পরিচালনা করুন
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setUserRole(userRole === 'Admin' ? 'Agent' : 'Admin')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer"
            title="Switch Role"
          >
            সুইচ রোল ({userRole})
          </button>
          <button
            onClick={exportLeadsCSV}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 rounded-xl text-xs cursor-pointer"
            title="লগআউট"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'studio' ? 'bg-blue-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>কাউন্টার ফটো ও ডিজিটাল কিউ ({studioOrders.length})</span>
          {studioOrders.filter(o => o.status === 'New').length > 0 && (
            <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-black">
              {studioOrders.filter(o => o.status === 'New').length} New
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'tools' ? 'bg-blue-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>ডিজিটাল সেবা ও প্রিন্ট টুলস</span>
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'leads' ? 'bg-blue-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>গ্রাহক লিড ও কোয়ারি ({leads.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'payments' ? 'bg-blue-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>পেমেন্ট সাবমিশন ({paymentSubmissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'config' ? 'bg-blue-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>অফিস তথ্য ও ব্যানার সেটিংস</span>
        </button>
      </div>

      {/* TAB: STUDIO ORDERS QUEUE */}
      {activeTab === 'studio' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 mr-1">স্ট্যাটাস:</span>
              {(['All', 'New', 'Processing', 'Ready', 'Completed', 'Delivered'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStudioStatusFilter(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    studioStatusFilter === s
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchStudio}
                  onChange={(e) => setSearchStudio(e.target.value)}
                  placeholder="অর্ডার আইডি, নাম বা ফোন..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                onClick={() => navigate('/upload')}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                <span>+ নতুন অর্ডার নিন</span>
              </button>
            </div>
          </div>

          {/* Orders List */}
          {filteredStudioOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Camera className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">কোনো ফটো বা ডিজিটাল সেবা অর্ডার পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStudioOrders.map((order) => {
                const firstImg = order.files.find((f) => f.fileType.startsWith('image/'))?.dataUrl;
                return (
                  <div
                    key={order.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {order.id}
                        </span>
                        {order.urgent && (
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-extrabold text-[10px] rounded-full flex items-center gap-1">
                            ⚡ জরুরি অর্ডার
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">স্ট্যাটাস পরিবর্তন:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateStudioOrderStatus(order.id, e.target.value as StudioOrderStatus)}
                          className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 cursor-pointer focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="New">New (নতুন)</option>
                          <option value="Processing">Processing (চলমান)</option>
                          <option value="Ready">Ready (প্রিন্ট রেডি)</option>
                          <option value="Completed">Completed (সম্পন্ন)</option>
                          <option value="Delivered">Delivered (ডেলিভারি সম্পন্ন)</option>
                          <option value="Cancelled">Cancelled (বাতিল)</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Service Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">গ্রাহকের নাম ও ফোন:</span>
                        <span className="font-bold text-slate-900">{order.customerName}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a href={`tel:${order.phone}`} className="text-blue-700 hover:underline font-mono">
                            {order.phone}
                          </a>
                          <button
                            onClick={() => {
                              const cleanPhone = order.phone.replace(/[^0-9]/g, '');
                              const msg = encodeURIComponent(
                                `আসসালামু আলাইকুম ${order.customerName},\nসিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস ও প্রজাপতি প্রিন্ট মিডিয়া থেকে জানানো যাচ্ছে আপনার অর্ডার #${order.id} এর বর্তমান স্ট্যাটাস: '${order.status}'। ধন্যবাদ!`
                              );
                              window.open(`https://wa.me/880${cleanPhone.slice(-10)}?text=${msg}`, '_blank');
                            }}
                            className="text-emerald-600 hover:text-emerald-700 p-0.5"
                            title="WhatsApp Client"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">সেবা ও সাইজ:</span>
                        <span className="font-bold text-slate-800">{order.serviceType}</span>
                        <span className="text-blue-700 font-semibold block">{order.requiredSize}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">কপি ও ডেলিভারি:</span>
                        <span className="font-bold text-slate-800">{order.copies} কপি</span>
                        <span className="text-slate-500 block">
                          {order.deliveryPref === 'counter_pickup'
                            ? 'কাউন্টার সংগ্রহ'
                            : order.deliveryPref === 'digital_download'
                            ? 'সফট কপি ডাউনলোড'
                            : 'হোম ডেলিভারি'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">সংযুক্ত ফাইল ({order.files.length}):</span>
                        <div className="flex gap-2 mt-1">
                          {order.files.map((file) => (
                            <div key={file.id} className="relative group">
                              {file.fileType.startsWith('image/') ? (
                                <img
                                  src={file.dataUrl}
                                  alt="file"
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center text-[10px] font-bold">
                                  PDF
                                </div>
                              )}
                              <a
                                href={file.dataUrl}
                                download={file.fileName}
                                className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                title="Download"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                        <span className="font-bold">গ্রাহকের নোট:</span> {order.notes}
                      </div>
                    )}

                    {/* Action Footer */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {firstImg && (
                          <button
                            onClick={() => {
                              setActiveStudioImage(firstImg);
                              navigate('/studio');
                            }}
                            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>ফটো স্টুডিও এডিটরে খুলুন</span>
                          </button>
                        )}

                        {firstImg && (
                          <button
                            onClick={() => {
                              setActiveStudioImage(firstImg);
                              navigate('/tools/document');
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ডকুমেন্ট স্ক্যানার</span>
                          </button>
                        )}
                        {firstImg && (
                          <button
                            onClick={() => {
                              setActiveStudioImage(firstImg);
                              navigate('/tools/signature');
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>স্বাক্ষর ক্রপ</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি অর্ডার #${order.id} মুছে ফেলতে চান?`)) {
                            deleteStudioOrder(order.id);
                          }
                        }}
                        className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>অর্ডার মুছুন</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: TOOLS LAUNCHER HUB */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {lang === 'bn' ? 'দোকানের ডিজিটাল সার্ভিস ও প্রিন্ট মিডিয়া টুলস' : 'Digital Service & Print Media Tools'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              প্রতিদিনের ফটো সাইজিং, টেলিটক চাকরি স্বাক্ষর, ডকুমেন্ট স্ক্যান এবং দোকানের ডিসপ্লে কিউআর স্ট্যান্ড তৈরি করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tool 1 */}
            <div
              onClick={() => navigate('/studio')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">পাসপোর্ট ফটো স্টুডিও</h3>
                <p className="text-xs text-slate-500 mt-1">
                  পাসপোর্ট, ভিসা (2×2), এনআইডি সাইজ ক্রপ এবং 4R পেপারে ৪/৮/১৬ কপি শীট সরাসরি লোকাল প্রিন্ট।
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                <span>স্টুডিও ওপেন করুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tool 2 */}
            <div
              onClick={() => navigate('/tools/signature')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">স্বাক্ষর রিসাইজার (টেলিটক)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  কাগজের হলুদ ভাব মুছে সাদা ব্যাকগ্রাউন্ডে ৩০০×১০০ পিক্সেল ও ৬০ KB সাইজে সরকারি চাকরির স্বাক্ষর তৈরি।
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                <span>টুল ওপেন করুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tool 3 */}
            <div
              onClick={() => navigate('/tools/document')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">ডকুমেন্ট স্ক্যানার ও কালার ক্লিনআপ</h3>
                <p className="text-xs text-slate-500 mt-1">
                  ক্যামেরায় তোলা সার্টিফিকেট ও দলিলের ছায়া দূর করে ফ্ল্যাটবেড স্ক্যানারের মতো ঝকঝকে A4 প্রিন্ট।
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <span>টুল ওপেন করুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tool 4 */}
            <div
              onClick={() => navigate('/tools/qr-stands')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">কাউন্টার কিউআর কোড স্ট্যান্ডস</h3>
                <p className="text-xs text-slate-500 mt-1">
                  দোকানের ডেস্কে রাখার জন্য এক্রাইলিক স্ট্যান্ড প্রিন্ট করুন। কাস্টমার সরাসরি কিউআর স্ক্যান করে ফাইল পাঠাবে।
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                <span>স্ট্যান্ড প্রিন্ট করুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tool 5 */}
            <div
              onClick={() => navigate('/tools/print-templates')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">প্রজাপতি প্রিন্ট মিডিয়া টেমপ্লেটস</h3>
                <p className="text-xs text-slate-500 mt-1">
                  দোকানের ব্যানার, ভিজিটিং কার্ড, মেমো ও পোস্টার দ্রুত কাস্টমাইজ ও হাই-কোয়ালিটি প্রিন্ট।
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                <span>টেমপ্লেট ব্রাউজ করুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Tool 6 */}
            <div
              onClick={() => navigate('/upload')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">গ্রাহক আপলোড পেজ ভিউ</h3>
                <p className="text-xs text-slate-500 mt-1">
                  কিউআর স্ক্যান করলে কাস্টমারদের মোবাইলে যেমন দেখায়, সেই ইন্টারফেস সরাসরি চেক করুন।
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>কাস্টমার ভিউ খুলুন</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 1: LEADS HUB */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500">স্ট্যাটাস ফিল্টার:</span>
              {(['All', 'New', 'Contacted', 'In Progress', 'Closed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchLead}
                onChange={(e) => setSearchLead(e.target.value)}
                placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">তারিখ ও উৎস</th>
                    <th className="p-3.5">গ্রাহকের নাম ও ফোন</th>
                    <th className="p-3.5">সেবা ও রুট</th>
                    <th className="p-3.5">বার্তা / রিকোয়েস্ট</th>
                    <th className="p-3.5">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">
                          {lead.date}
                        </span>
                        <span className="text-[10px] text-slate-400">{lead.source}</span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{lead.customerName}</div>
                        <a href={`tel:${lead.phone}`} className="text-blue-700 hover:underline">
                          {lead.phone}
                        </a>
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 block">{lead.service}</span>
                        {lead.destination && (
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {lead.destination}
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <p className="line-clamp-2 text-slate-600">{lead.message || '—'}</p>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${
                            lead.status === 'New'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : lead.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : lead.status === 'Booked' || lead.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-50 text-slate-800 border-slate-200'
                          }`}
                        >
                          <option value="New">New (নতুন)</option>
                          <option value="Contacted">Contacted (যোগাযোগকৃত)</option>
                          <option value="Quotation Sent">Quotation Sent (কোটেশন প্রেরিত)</option>
                          <option value="Follow-up">Follow-up (ফলো-আপ)</option>
                          <option value="Booked">Booked (বুকিংকৃত)</option>
                          <option value="Completed">Completed (সম্পন্ন)</option>
                          <option value="Lost">Lost (বাতিল)</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => openWhatsApp(`আসসালামু আলাইকুম ${lead.customerName} সাহেব, সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস থেকে আপনার ${lead.service} রিকোয়েস্টের বিষয়ে যোগাযোগ করছি।`)}
                          className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                          title="WhatsApp Reply"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </button>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Call"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        {userRole === 'Admin' && (
                          <button
                            onClick={() => {
                              if (confirm('এই লিডটি কি মুছে ফেলতে চান?')) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        কোনো লিড তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: PAYMENTS HUB */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">তারিখ ও সময়</th>
                    <th className="p-3.5">গ্রাহকের নাম ও ফোন</th>
                    <th className="p-3.5">মাধ্যম ও TrxID</th>
                    <th className="p-3.5">টাকার পরিমাণ</th>
                    <th className="p-3.5">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paymentSubmissions.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">
                          {new Date(pay.submittedAt).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-slate-400">{pay.id}</span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{pay.customerName}</div>
                        <div className="text-blue-700">{pay.phone}</div>
                        <span className="text-[10px] text-slate-500">{pay.service}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-slate-800 block">{pay.paymentMethod}</span>
                        <span className="font-mono text-blue-700 font-bold">{pay.transactionId}</span>
                        {pay.notes && <div className="text-[10px] text-slate-400">Note: {pay.notes}</div>}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="text-sm font-black text-emerald-700">
                          ৳ {pay.amount}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            pay.status === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : pay.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        {pay.status === 'Pending Verification' && (
                          <>
                            <button
                              onClick={() => {
                                updatePaymentSubmissionStatus(pay.id, 'Verified');
                                showNotification('পেমেন্ট সফলভাবে ভেরিফাইড চিহ্নিত হয়েছে!');
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                updatePaymentSubmissionStatus(pay.id, 'Rejected');
                                showNotification('পেমেন্ট বাতিল করা হয়েছে!', 'error');
                              }}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => openWhatsApp(`আসসালামু আলাইকুম ${pay.customerName} সাহেব, সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস থেকে আপনার ৳${pay.amount} পেমেন্ট (TrxID: ${pay.transactionId}) যাচাই সংক্রান্ত আপডেট:`)}
                          className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {paymentSubmissions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        কোনো পেমেন্ট সাবমিশন পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: CONFIG & NOTICES */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              ব্যবসায়িক তথ্য ও লাইভ ঘোষণা সেটিংস
            </h3>
            <p className="text-xs text-slate-500">
              এখানে পরিবর্তন করলে সম্পূর্ণ ওয়েবসাইটের হেডার, ফুটার ও নোটিশ বারে তাৎক্ষণিক প্রতিফলিত হবে।
            </p>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">হটলাইন ফোন নম্বর</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল হোয়াটসঅ্যাপ</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            {/* Top Bar Announcement */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-blue-700" />
                  <span>ওয়েবসাইটের শীর্ষ লাইভ নোটিশ বার (Notice Banner)</span>
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">বাংলা নোটিশ:</label>
                <input
                  type="text"
                  value={noticeBn}
                  onChange={(e) => setNoticeBn(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  placeholder="জরুরী কোনো ঘোষণা থাকলে এখানে লিখুন..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">English Notice:</label>
                <input
                  type="text"
                  value={noticeEn}
                  onChange={(e) => setNoticeEn(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  placeholder="Enter notice in English..."
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('আপনি কি টেস্ট ও ডেমো ডেটা রিসেট করতে চান? এটি লোকাল স্টোরেজ পরিষ্কার করে পেজ রিলোড করবে।')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="text-xs text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>রিসেট ডিফল্ট ডেটা</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
