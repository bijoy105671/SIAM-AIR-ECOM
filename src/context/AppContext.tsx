import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  BusinessInfo,
  ServiceItem,
  VisaService,
  UmrahPackage,
  PaymentConfig,
  Lead,
  LeadStatus,
  PaymentSubmission,
  PaymentVerificationStatus,
  AdminUser,
  SpecialOffer,
  AuditLog,
  StudioOrder,
  StudioOrderStatus
} from '../types';
import {
  INITIAL_BUSINESS_INFO,
  INITIAL_SERVICES,
  INITIAL_VISA_SERVICES,
  INITIAL_UMRAH_PACKAGES,
  INITIAL_PAYMENT_CONFIG,
  INITIAL_LEADS,
  INITIAL_PAYMENT_SUBMISSIONS,
  INITIAL_ADMIN_USERS,
  INITIAL_SPECIAL_OFFERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_STUDIO_ORDERS
} from '../config/initialData';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  services: ServiceItem[];
  addService: (s: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, s: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  visaServices: VisaService[];
  updateVisaService: (id: string, v: Partial<VisaService>) => void;
  umrahPackages: UmrahPackage[];
  addUmrahPackage: (p: Omit<UmrahPackage, 'id'>) => void;
  updateUmrahPackage: (id: string, p: Partial<UmrahPackage>) => void;
  paymentConfig: PaymentConfig;
  updatePaymentConfig: (cfg: Partial<PaymentConfig>) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus, notes?: string) => void;
  deleteLead: (id: string) => void;
  paymentSubmissions: PaymentSubmission[];
  addPaymentSubmission: (sub: Omit<PaymentSubmission, 'id' | 'status' | 'submittedAt'>) => PaymentSubmission;
  updatePaymentSubmissionStatus: (id: string, status: PaymentVerificationStatus, notes?: string) => void;
  studioOrders: StudioOrder[];
  addStudioOrder: (order: Omit<StudioOrder, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => StudioOrder;
  updateStudioOrderStatus: (id: string, status: StudioOrderStatus, staffNotes?: string) => void;
  deleteStudioOrder: (id: string) => void;
  activeStudioImage: string | null;
  setActiveStudioImage: (url: string | null) => void;
  specialOffers: SpecialOffer[];
  auditLogs: AuditLog[];
  currentAdminUser: AdminUser;
  setCurrentAdminUser: (u: AdminUser) => void;
  openWhatsApp: (customMessage?: string) => void;
  callNow: () => void;
  modalState: {
    isOpen: boolean;
    type: 'enquiry' | 'qr_lightbox' | null;
    serviceName?: string;
    qrData?: { title: string; image: string; number: string; instructions: string };
  };
  openEnquiryModal: (serviceName?: string) => void;
  openQrLightbox: (qrData: { title: string; image: string; number: string; instructions: string }) => void;
  closeModal: () => void;
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'siam_air_';
const ACCOUNTING_API_URL = String((import.meta as any).env?.VITE_ACCOUNTING_API_URL || 'https://siam-air-digital-service.onrender.com').replace(/\/$/, '');


function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
    // Quota safety: if studio_orders or payment submissions exceeded storage quota, gracefully slim older records
    if (key === 'studio_orders' && Array.isArray(value)) {
      try {
        const slimmed = value.slice(0, 15).map((order: any, idx: number) => {
          if (idx > 4 && order.files) {
            return {
              ...order,
              files: order.files.map((f: any) => ({ ...f, dataUrl: '' }))
            };
          }
          return order;
        });
        localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(slimmed));
      } catch (_) {}
    }
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => loadFromStorage<Language>('lang', 'bn'));
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => loadFromStorage('business_info', INITIAL_BUSINESS_INFO));
  const [services, setServices] = useState<ServiceItem[]>(() => loadFromStorage('services', INITIAL_SERVICES));
  const [visaServices, setVisaServices] = useState<VisaService[]>(() => loadFromStorage('visa_services', INITIAL_VISA_SERVICES));
  const [umrahPackages, setUmrahPackages] = useState<UmrahPackage[]>(() => loadFromStorage('umrah_packages', INITIAL_UMRAH_PACKAGES));
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => loadFromStorage('payment_config', INITIAL_PAYMENT_CONFIG));
  const [leads, setLeads] = useState<Lead[]>(() => loadFromStorage('leads', INITIAL_LEADS));
  const [paymentSubmissions, setPaymentSubmissions] = useState<PaymentSubmission[]>(() => loadFromStorage('payment_subs', INITIAL_PAYMENT_SUBMISSIONS));
  const [studioOrders, setStudioOrders] = useState<StudioOrder[]>(() => loadFromStorage('studio_orders', INITIAL_STUDIO_ORDERS));
  const [activeStudioImage, setActiveStudioImage] = useState<string | null>(null);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => loadFromStorage('offers', INITIAL_SPECIAL_OFFERS));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadFromStorage('audit_logs', INITIAL_AUDIT_LOGS));
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser>(INITIAL_ADMIN_USERS[0]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'enquiry' | 'qr_lightbox' | null;
    serviceName?: string;
    qrData?: { title: string; image: string; number: string; instructions: string };
  }>({
    isOpen: false,
    type: null
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  // Accounting website is the master source for public business identity and service catalog.
  useEffect(() => {
    let cancelled = false;
    const syncFromAccounting = async () => {
      try {
        const response = await fetch(ACCOUNTING_API_URL + '/api/storefront', { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Accounting storefront API returned ' + response.status);
        const payload = await response.json();
        if (cancelled) return;
        if (payload?.settings) {
          const s = payload.settings;
          setBusinessInfo(prev => ({
            ...prev,
            name: s.name || prev.name,
            addressEn: s.address || prev.addressEn,
            addressBn: s.address || prev.addressBn,
            phone: s.mobile || prev.phone,
            whatsapp: s.whatsapp || prev.whatsapp,
            email: s.email || prev.email,
            facebookUrl: prev.facebookUrl,
            whatsappUrl: s.whatsapp ? 'https://wa.me/' + String(s.whatsapp).replace(/[^0-9]/g, '') : prev.whatsappUrl,
          }));
        }
        if (Array.isArray(payload?.services) && payload.services.length) {
          const remote = payload.services;
          setServices(prev => {
            const byName = new Map(prev.map((item: ServiceItem) => [item.nameEn.toLowerCase(), item]));
            return remote.map((item: any, index: number) => {
              const existing = byName.get(String(item.name || '').toLowerCase());
              const category = String(item.category || '').toLowerCase().includes('visa') ? 'travel_visa'
                : String(item.category || '').toLowerCase().includes('umrah') ? 'umrah'
                : 'computer_online';
              return existing
                ? { ...existing, nameEn: String(item.name || existing.nameEn), category, active: item.enabled !== false, order: Number(item.sort_order ?? existing.order ?? index + 1) }
                : {
                    id: String(item.id || 'accounting-' + index),
                    slug: String(item.name || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    nameEn: String(item.name || 'Service'),
                    nameBn: String(item.name || 'Service'),
                    descEn: 'Service available from SIAM AIR & DIGITAL SERVICE.',
                    descBn: 'সিয়াম এয়ার এন্ড ডিজিটাল সার্ভিসের সেবা।',
                    category,
                    iconName: 'Compass',
                    priceTextEn: 'Contact us',
                    priceTextBn: 'যোগাযোগ করুন',
                    whatsappMsgEn: String(item.name || 'Service'),
                    whatsappMsgBn: String(item.name || 'সেবা'),
                    detailsEn: [],
                    detailsBn: [],
                    active: item.enabled !== false,
                    order: Number(item.sort_order ?? index + 1),
                  } as ServiceItem;
            });
          });
        }
      } catch (error) {
        console.warn('Accounting storefront sync unavailable; keeping local website data.', error);
      }
    };
    void syncFromAccounting();
    const timer = window.setInterval(syncFromAccounting, 60 * 1000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, []);


  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveToStorage('lang', newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now()}`,
      adminName: currentAdminUser.name,
      role: currentAdminUser.role,
      action,
      timestamp: new Date().toLocaleString(),
      details
    };
    setAuditLogs(prev => {
      const updated = [newLog, ...prev].slice(0, 100);
      saveToStorage('audit_logs', updated);
      return updated;
    });
  };

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setBusinessInfo(prev => {
      const updated = { ...prev, ...info };
      saveToStorage('business_info', updated);
      logAction('Update Business Info', 'Updated business profile and contact information.');
      return updated;
    });
    showNotification(lang === 'bn' ? 'ব্যবসার তথ্য সফলভাবে আপডেট হয়েছে' : 'Business information updated successfully');
  };

  const addService = (s: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...s,
      id: `srv-${Date.now()}`
    };
    setServices(prev => {
      const updated = [...prev, newService];
      saveToStorage('services', updated);
      logAction('Add Service', `Added service: ${newService.nameEn}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'নতুন সেবা সফলভাবে যুক্ত হয়েছে' : 'New service added successfully');
  };

  const updateService = (id: string, s: Partial<ServiceItem>) => {
    setServices(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...s } : item);
      saveToStorage('services', updated);
      logAction('Update Service', `Modified service ID: ${id}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'সেবা সফলভাবে আপডেট হয়েছে' : 'Service updated successfully');
  };

  const deleteService = (id: string) => {
    setServices(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveToStorage('services', updated);
      logAction('Delete Service', `Removed service ID: ${id}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'সেবা মুছে ফেলা হয়েছে' : 'Service deleted successfully', 'info');
  };

  const updateVisaService = (id: string, v: Partial<VisaService>) => {
    setVisaServices(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...v } : item);
      saveToStorage('visa_services', updated);
      logAction('Update Visa Service', `Updated visa info for: ${id}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'ভিসা তথ্য আপডেট হয়েছে' : 'Visa information updated');
  };

  const addUmrahPackage = (p: Omit<UmrahPackage, 'id'>) => {
    const newPkg: UmrahPackage = {
      ...p,
      id: `umrah-${Date.now()}`
    };
    setUmrahPackages(prev => {
      const updated = [...prev, newPkg];
      saveToStorage('umrah_packages', updated);
      logAction('Add Umrah Package', `Created package: ${newPkg.nameEn}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'ওমরাহ প্যাকেজ যুক্ত হয়েছে' : 'Umrah package created');
  };

  const updateUmrahPackage = (id: string, p: Partial<UmrahPackage>) => {
    setUmrahPackages(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...p } : item);
      saveToStorage('umrah_packages', updated);
      logAction('Update Umrah Package', `Modified package ID: ${id}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'ওমরাহ প্যাকেজ আপডেট হয়েছে' : 'Umrah package updated');
  };

  const updatePaymentConfig = (cfg: Partial<PaymentConfig>) => {
    setPaymentConfig(prev => {
      const updated = { ...prev, ...cfg };
      saveToStorage('payment_config', updated);
      logAction('Update Payment Methods', 'Modified payment account numbers or QR configurations');
      return updated;
    });
    showNotification(lang === 'bn' ? 'পেমেন্ট মেথড আপডেট হয়েছে' : 'Payment configurations updated');
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'date' | 'status'>): Lead => {
    void fetch(ACCOUNTING_API_URL + '/api/storefront/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: leadData.customerName,
        phone: leadData.phone,
        email: null,
        service: leadData.service,
        amount: 0,
        note: leadData.message,
      }),
    }).catch(error => console.warn('Accounting order sync failed:', error));

    const newLead: Lead = {
      ...leadData,
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setLeads(prev => {
      const updated = [newLead, ...prev];
      saveToStorage('leads', updated);
      return updated;
    });
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus, notes?: string) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, status, notes: notes ?? l.notes } : l);
      saveToStorage('leads', updated);
      logAction('Update Lead Status', `Lead ${id} changed to ${status}`);
      return updated;
    });
    showNotification(lang === 'bn' ? `লিড স্ট্যাটাস '${status}' করা হয়েছে` : `Lead status updated to '${status}'`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => {
      const updated = prev.filter(l => l.id !== id);
      saveToStorage('leads', updated);
      logAction('Archive Lead', `Archived lead ID: ${id}`);
      return updated;
    });
    showNotification(lang === 'bn' ? 'লিড রেকর্ড আর্কাইভ করা হয়েছে' : 'Lead record archived');
  };

  const addPaymentSubmission = (sub: Omit<PaymentSubmission, 'id' | 'status' | 'submittedAt'>): PaymentSubmission => {
    const newSub: PaymentSubmission = {
      ...sub,
      id: `PAY-${Date.now().toString().slice(-4)}`,
      status: 'Pending Verification',
      submittedAt: new Date().toLocaleString()
    };
    setPaymentSubmissions(prev => {
      const updated = [newSub, ...prev];
      saveToStorage('payment_subs', updated);
      return updated;
    });
    return newSub;
  };

  const updatePaymentSubmissionStatus = (id: string, status: PaymentVerificationStatus, notes?: string) => {
    setPaymentSubmissions(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, status, notes: notes ?? p.notes } : p);
      saveToStorage('payment_subs', updated);
      logAction('Payment Verification', `Payment ${id} set to ${status}. Notes: ${notes || 'None'}`);
      return updated;
    });
    showNotification(lang === 'bn' ? `পেমেন্ট স্ট্যাটাস '${status}' করা হয়েছে` : `Payment status updated to '${status}'`);
  };

  const addStudioOrder = (orderData: Omit<StudioOrder, 'id' | 'createdAt' | 'updatedAt' | 'status'>): StudioOrder => {
    const year = new Date().getFullYear();
    const seq = Math.floor(100000 + Math.random() * 900000);
    const newOrder: StudioOrder = {
      ...orderData,
      id: `SA-${year}-${seq}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setStudioOrders(prev => {
      const updated = [newOrder, ...prev];
      saveToStorage('studio_orders', updated);
      return updated;
    });
    logAction('New Studio Order', `Received order ${newOrder.id} from ${newOrder.customerName} (${newOrder.phone})`);
    showNotification(
      lang === 'bn'
        ? `অর্ডার সফলভাবে জমা হয়েছে! আইডি: ${newOrder.id}`
        : `Order submitted successfully! ID: ${newOrder.id}`
    );
    return newOrder;
  };

  const updateStudioOrderStatus = (id: string, status: StudioOrderStatus, staffNotes?: string) => {
    setStudioOrders(prev => {
      const updated = prev.map(o => o.id === id ? {
        ...o,
        status,
        staffNotes: staffNotes !== undefined ? staffNotes : o.staffNotes,
        updatedAt: new Date().toISOString()
      } : o);
      saveToStorage('studio_orders', updated);
      return updated;
    });
    logAction('Update Studio Order', `Order ${id} status set to ${status}`);
    showNotification(
      lang === 'bn'
        ? `অর্ডার #${id} স্ট্যাটাস '${status}' করা হয়েছে`
        : `Order #${id} status updated to '${status}'`
    );
  };

  const deleteStudioOrder = (id: string) => {
    setStudioOrders(prev => {
      const updated = prev.filter(o => o.id !== id);
      saveToStorage('studio_orders', updated);
      return updated;
    });
    logAction('Delete Studio Order', `Deleted order ${id}`);
    showNotification(lang === 'bn' ? 'অর্ডার মুছে ফেলা হয়েছে' : 'Order deleted');
  };

  const openWhatsApp = (customMessage?: string) => {
    const cleanNumber = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    const defaultMsg = lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসের সেবা সম্পর্কে জানতে চাই।`
      : `Hello Siam Air & Digital Service, I would like to inquire about your travel services.`;
    const message = encodeURIComponent(customMessage || defaultMsg);
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const callNow = () => {
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const openEnquiryModal = (serviceName?: string) => {
    setModalState({
      isOpen: true,
      type: 'enquiry',
      serviceName
    });
  };

  const openQrLightbox = (qrData: { title: string; image: string; number: string; instructions: string }) => {
    setModalState({
      isOpen: true,
      type: 'qr_lightbox',
      qrData
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null
    });
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        businessInfo,
        updateBusinessInfo,
        services,
        addService,
        updateService,
        deleteService,
        visaServices,
        updateVisaService,
        umrahPackages,
        addUmrahPackage,
        updateUmrahPackage,
        paymentConfig,
        updatePaymentConfig,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        paymentSubmissions,
        addPaymentSubmission,
        updatePaymentSubmissionStatus,
        studioOrders,
        addStudioOrder,
        updateStudioOrderStatus,
        deleteStudioOrder,
        activeStudioImage,
        setActiveStudioImage,
        specialOffers,
        auditLogs,
        currentAdminUser,
        setCurrentAdminUser,
        openWhatsApp,
        callNow,
        modalState,
        openEnquiryModal,
        openQrLightbox,
        closeModal,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
