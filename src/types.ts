export type Language = 'bn' | 'en';

export type ServiceCategory = 'travel_visa' | 'umrah' | 'computer_online' | 'other';

export interface ServiceItem {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  descEn: string;
  descBn: string;
  category: ServiceCategory;
  iconName: string;
  priceTextEn: string;
  priceTextBn: string;
  whatsappMsgEn: string;
  whatsappMsgBn: string;
  detailsEn: string[];
  detailsBn: string[];
  requirementsEn?: string[];
  requirementsBn?: string[];
  notesEn?: string;
  notesBn?: string;
  active: boolean;
  order: number;
}

export interface VisaService {
  id: string;
  slug: string;
  countryEn: string;
  countryBn: string;
  flag: string;
  visaTypeEn: string;
  visaTypeBn: string;
  basicReqsEn: string[];
  basicReqsBn: string[];
  processingInfoEn: string;
  processingInfoBn: string;
  notesEn: string;
  notesBn: string;
  popular: boolean;
  active: boolean;
}

export interface UmrahPackage {
  id: string;
  nameEn: string;
  nameBn: string;
  tier: 'economy' | 'standard' | 'premium' | 'family';
  durationEn: string;
  durationBn: string;
  makkahNights: number;
  madinahNights: number;
  hotelCategoryEn: string;
  hotelCategoryBn: string;
  makkahHotelDistEn: string;
  makkahHotelDistBn: string;
  madinahHotelDistEn: string;
  madinahHotelDistBn: string;
  transportEn: string;
  transportBn: string;
  inclusionsEn: string[];
  inclusionsBn: string[];
  exclusionsEn: string[];
  exclusionsBn: string[];
  priceNoteEn: string;
  priceNoteBn: string;
  active: boolean;
  order: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  routingNo?: string;
  accountTypeEn: string;
  accountTypeBn: string;
  instructionsEn: string;
  instructionsBn: string;
  active: boolean;
}

export interface MobileWallet {
  provider: 'bkash' | 'nagad';
  number: string;
  accountTypeEn: string;
  accountTypeBn: string;
  qrUrl: string;
  instructionsEn: string;
  instructionsBn: string;
  active: boolean;
}

export interface CustomQr {
  id: string;
  provider: string;
  accountNo: string;
  qrImage: string;
  instructionsEn: string;
  instructionsBn: string;
  active: boolean;
}

export interface PaymentConfig {
  bankAccounts: BankAccount[];
  bkash: MobileWallet;
  nagad: MobileWallet;
  customQrs: CustomQr[];
}

export type LeadStatus = 'New' | 'Contacted' | 'Quotation Sent' | 'Follow-up' | 'Booked' | 'Completed' | 'Lost';

export interface Lead {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  service: string;
  destination?: string;
  travelDate?: string;
  passengerCount?: number;
  passportStatus?: string;
  message: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Any';
  source: string;
  status: LeadStatus;
  notes?: string;
  assignedTo?: string;
}

export type PaymentVerificationStatus = 'Pending Verification' | 'Verified' | 'Rejected';

export interface PaymentSubmission {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  paymentMethod: string;
  amount: string;
  transactionId: string;
  paymentDate: string;
  proofUrl?: string;
  status: PaymentVerificationStatus;
  notes?: string;
  submittedAt: string;
}

export interface BusinessInfo {
  name: string;
  addressEn: string;
  addressBn: string;
  locationAreaEn: string;
  locationAreaBn: string;
  phone: string;
  whatsapp: string;
  email: string;
  hoursEn: string;
  hoursBn: string;
  facebookUrl: string;
  whatsappUrl: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  noticeEn?: string;
  noticeBn?: string;
}

export type AdminRole = 'owner' | 'manager' | 'sales' | 'accounts' | 'content' | 'staff';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: {
    dashboard: boolean;
    leads: boolean;
    customers: boolean;
    services: boolean;
    visa: boolean;
    umrah: boolean;
    payments: boolean;
    bankAccounts: boolean;
    mobileWallets: boolean;
    qrCodes: boolean;
    paymentVerification: boolean;
    blog: boolean;
    faq: boolean;
    offers: boolean;
    websiteSettings: boolean;
    adminUsers: boolean;
    deleteData: boolean;
  };
  active: boolean;
}

export interface SpecialOffer {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  badgeEn: string;
  badgeBn: string;
  validUntil: string;
  whatsappMsg: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  date: string;
  readTimeEn: string;
  readTimeBn: string;
  image: string;
  summaryEn: string;
  summaryBn: string;
  contentEn: string;
  contentBn: string;
}

export interface FaqItem {
  id: string;
  category: 'air_ticket' | 'visa' | 'umrah' | 'general';
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  role: string;
  action: string;
  timestamp: string;
  details: string;
}

export type StudioOrderStatus =
  | 'New'
  | 'Accepted'
  | 'Processing'
  | 'Waiting for Customer'
  | 'Ready'
  | 'Printed'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface StudioOrderFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSizeKb: number;
  dataUrl: string;
  previewUrl?: string;
}

export interface StudioOrder {
  id: string; // SA-2026-XXXXXX
  customerName: string;
  phone: string;
  serviceType: string;
  requiredSize: string;
  copies: number;
  notes?: string;
  urgent?: boolean;
  deliveryPref: 'counter_pickup' | 'digital_download' | 'home_delivery';
  files: StudioOrderFile[];
  status: StudioOrderStatus;
  createdAt: string;
  updatedAt: string;
  price?: number;
  paymentStatus?: 'Unpaid' | 'Paid';
  staffNotes?: string;
}

export interface PhotoPreset {
  id: string;
  nameEn: string;
  nameBn: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  aspectRatio: number; // width / height
  category: 'passport' | 'visa' | 'job' | 'nid' | 'custom';
  descriptionEn: string;
  descriptionBn: string;
}

export interface PrintTemplateItem {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'visiting_card' | 'banner' | 'poster' | 'id_card' | 'memo' | 'invitation';
  dimensions: string;
  descriptionEn: string;
  descriptionBn: string;
  fields: {
    key: string;
    labelEn: string;
    labelBn: string;
    defaultValue: string;
  }[];
  previewBg: string;
}

