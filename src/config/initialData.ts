import {
  BusinessInfo,
  ServiceItem,
  VisaService,
  UmrahPackage,
  PaymentConfig,
  Lead,
  PaymentSubmission,
  AdminUser,
  SpecialOffer,
  BlogPost,
  FaqItem,
  AuditLog,
  StudioOrder,
  PhotoPreset,
  PrintTemplateItem
} from '../types';

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
  name: "Siam Air & Digital Service",
  addressEn: "Ramkrishnapur Bazar, Shutradhar Super Market, Homna, Cumilla, Bangladesh",
  addressBn: "রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা, বাংলাদেশ",
  locationAreaEn: "Homna, Cumilla & across Bangladesh",
  locationAreaBn: "হোমনা, কুমিল্লা ও সমগ্র বাংলাদেশ",
  phone: "+8801883400808",
  whatsapp: "+8801883400808",
  email: "bijoy105671@gmail.com",
  hoursEn: "Saturday – Thursday: 9:00 AM – 9:00 PM | Friday: 3:00 PM – 9:00 PM",
  hoursBn: "শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ৯:০০ | শুক্রবার: বিকাল ৩:০০ – রাত ৯:০০",
  facebookUrl: "https://facebook.com",
  whatsappUrl: "https://wa.me/8801883400808",
  noticeEn: "Professional Assistance Subject to Embassy & Airline Rules. We do not guarantee visa approvals.",
  noticeBn: "দূতাবাস ও এয়ারলাইন্স নীতিমালা সাপেক্ষে পেশাদার সহায়তা। আমরা কোনো ধরণের ভিসা গ্যারান্টি প্রদান করি না।"
};

export const INITIAL_SERVICES: ServiceItem[] = [
  // Travel & Visa
  {
    id: "srv-air-ticket",
    slug: "air-ticket",
    nameEn: "Air Ticketing",
    nameBn: "এয়ার টিকিট",
    descEn: "Domestic and international flight booking assistance with competitive fares.",
    descBn: "সুলভ ও প্রতিযোগিতামূলক মূল্যে অভ্যন্তরীণ ও আন্তর্জাতিক সকল রুটের এয়ার টিকিট বুকিং সহায়তা।",
    category: "travel_visa",
    iconName: "Plane",
    priceTextEn: "Request Flight Fare",
    priceTextBn: "টিকিটের মূল্য জানুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need air ticket booking assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি এয়ার টিকিট বুকিং সংক্রান্ত তথ্য ও মূল্য জানতে চাই।",
    detailsEn: [
      "Domestic Flights across Bangladesh (Dhaka, Chittagong, Cox's Bazar, Sylhet, Saidpur, Rajshahi)",
      "International Flights to Middle East, Asia, Europe, Americas, Australia",
      "One-way, Round-trip, Multi-city flight options",
      "Family & Group flight booking with flexible options",
      "Student & Labor travel fare assistance"
    ],
    detailsBn: [
      "বাংলাদেশ অভ্যন্তরীণ সকল রুটের ফ্লাইট (ঢাকা, চট্টগ্রাম, কক্সবাজার, সিলেট, সৈয়দপুর)",
      "মধ্যপ্রাচ্য, এশিয়া, ইউরোপ, আমেরিকা ও অন্যান্য দেশের আন্তর্জাতিক ফ্লাইট",
      "ওয়ান-ওয়ে, রাউন্ড-ট্রিপ ও মাল্টি-সিটি অপশন",
      "ফ্যামিলি ও গ্রুপ টিকিটিংয়ে বিশেষ যত্নশীল সেবা",
      "ছাত্র ও প্রবাসী ভাইদের জন্য সুলভ টিকিটের তথ্য"
    ],
    requirementsEn: ["Valid Passport for international flights", "NID / Birth Certificate for domestic flights", "Preferred travel dates"],
    requirementsBn: ["আন্তর্জাতিক রুটের জন্য ন্যূনতম ৬ মাস মেয়াদী পাসপোর্ট", "অভ্যন্তরীণ রুটের জন্য এনআইডি বা জন্মসনদ", "পছন্দের ভ্রমণ তারিখ"],
    notesEn: "Fares depend on seat availability and real-time airline fare rules.",
    notesBn: "টিকিটের মূল্য আসন প্রাপ্যতা ও এয়ারলাইন্সের রুলস অনুযায়ী পরিবর্তিত হতে পারে।",
    active: true,
    order: 1
  },
  {
    id: "srv-ticket-verification",
    slug: "ticket-verification",
    nameEn: "Ticket & Visa Verification",
    nameBn: "টিকিট ও ভিসা যাচাই",
    descEn: "Assistance with verifying flight PNR status, airline e-tickets, and visa authenticity.",
    descBn: "এয়ার টিকিট পিএনআর (PNR) স্ট্যাটাস এবং ইস্যুকৃত ভিসা যাচাইয়ে অভিজ্ঞ সহায়তা।",
    category: "travel_visa",
    iconName: "FileCheck",
    priceTextEn: "Free Consultation",
    priceTextBn: "পরামর্শ নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I want to verify my ticket/visa.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি আমার টিকিট/ভিসা যাচাই করতে চাই।",
    detailsEn: [
      "Online PNR status check directly on respective airline portal",
      "E-ticket validity and passenger name verification",
      "Official government visa portal status check assistance",
      "Guidance to avoid fake or fraudulent tickets"
    ],
    detailsBn: [
      "সংশ্লিষ্ট এয়ারলাইন্সের অফিসিয়াল পোর্টালে পিএনআর স্ট্যাটাস চেক",
      "ই-টিকিটের কার্যকারিতা ও যাত্রীর নাম মিলকরণ",
      "বিভিন্ন দেশের অফিসিয়াল পোর্টালে ভিসা ভেরিফিকেশন সহায়তা",
      "ভুয়া টিকিট ও প্রতারণা এড়াতে সতর্কতামূলক পরামর্শ"
    ],
    notesEn: "We assist via official public airline/government systems; we do not claim to be a government or airline authority.",
    notesBn: "আমরা কেবল অফিসিয়াল উন্মুক্ত পোর্টালের মাধ্যমে যাচাইয়ে সহায়তা করি।",
    active: true,
    order: 2
  },
  {
    id: "srv-visa-processing",
    slug: "visa-processing",
    nameEn: "Visa Processing Assistance",
    nameBn: "ভিসা প্রসেসিং সেবা",
    descEn: "Professional guidance and document preparation for international tourist, business, and visit visas.",
    descBn: "বিশ্বের বিভিন্ন দেশের ট্যুরিস্ট, বিজনেস ও ভিজিট ভিসার ফাইল প্রস্তুত ও প্রসেসিং সহায়তা।",
    category: "travel_visa",
    iconName: "Passport",
    priceTextEn: "Check Requirements",
    priceTextBn: "ভিসার তথ্য নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need visa processing assistance. Please provide the requirements.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি ভিসা প্রসেসিং সেবা নিতে চাই। বিস্তারিত প্রয়োজনীয় কাগজপত্র জানাবেন।",
    detailsEn: [
      "File preparation and document checklist review",
      "Online visa application form fill-up",
      "Embassy appointment booking guidance where applicable",
      "Cover letter, itinerary, and hotel dummy booking support"
    ],
    detailsBn: [
      "ভিসা ফাইলিং ও প্রয়োজনীয় ডকুমেন্টস নিখুঁতভাবে সাজানো",
      "অনলাইন ভিসা আবেদন ফর্ম নির্ভুলভাবে পূরণ",
      "প্রযোজ্য ক্ষেত্রে এম্বাসি অ্যাপয়েন্টমেন্ট শিডিউলিং সহায়তা",
      "কভার লেটার, ট্রাভেল আইটিনারি ও হোটেল বুকিং সমন্বয়"
    ],
    notesEn: "Visa approval is strictly the discretion of the respective embassy or immigration authority. We do not promise 100% guarantee.",
    notesBn: "ভিসা প্রদান সম্পূর্ণভাবে সংশ্লিষ্ট দেশের দূতাবাস বা ইমিগ্রেশনের এখতিয়ারাধীন।",
    active: true,
    order: 3
  },
  {
    id: "srv-manpower-fingerprint",
    slug: "manpower-fingerprint",
    nameEn: "Manpower & Fingerprint Assistance",
    nameBn: "ম্যানপাওয়ার ও ফিঙ্গারপ্রিন্ট সহায়তা",
    descEn: "Assistance with BMET registration, smart card application, and fingerprint appointment coordination.",
    descBn: "বিএমইটি (BMET) রেজিস্ট্রেশন, ফিঙ্গারপ্রিন্ট শিডিউল ও স্মার্ট কার্ড আবেদন সংক্রান্ত সার্বিক সহায়তা।",
    category: "travel_visa",
    iconName: "Fingerprint",
    priceTextEn: "Consult Assistance",
    priceTextBn: "পরামর্শ নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need assistance with Manpower/Fingerprint procedures.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি বিএমইটি ম্যানপাওয়ার ও ফিঙ্গার সংক্রান্ত সহায়তা চাই।",
    detailsEn: [
      "Ami Probashi app registration assistance",
      "BMET database enrollment and fingerprint appointment booking",
      "Pre-departure briefing registration guidance",
      "Manpower clearance application document review"
    ],
    detailsBn: [
      "আমি প্রবাসী অ্যাপের মাধ্যমে অনলাইন রেজিস্ট্রেশন সহায়তা",
      "বিএমইটি ডাটাবেজ এন্ট্রি ও ফিঙ্গারপ্রিন্ট শিডিউল গ্রহণ",
      "প্রশিক্ষণ ও ব্রিফিং সার্টিফিকেট সংক্রান্ত গাইডলাইন",
      "ম্যানপাওয়ার ক্লিয়ারেন্স ফাইলের কাগজপত্র যাচাই"
    ],
    notesEn: "We provide facilitation and administrative support according to official Bangladesh government procedures.",
    notesBn: "সরকারি নিয়মাবলী অনুসারে প্রয়োজনীয় অনলাইন প্রক্রিয়ায় সহায়তা করা হয়।",
    active: true,
    order: 4
  },
  {
    id: "srv-passport-service",
    slug: "passport-services",
    nameEn: "Passport Services Assistance",
    nameBn: "পাসপোর্টের কাজ",
    descEn: "Assistance with online e-Passport application, renewal, fee payment guidance, and appointment booking.",
    descBn: "নতুন ই-পাসপোর্ট আবেদন, নবায়ন (রিনিউ), ফি জমা সংক্রান্ত তথ্য ও অ্যাপয়েন্টমেন্ট সহায়তা।",
    category: "travel_visa",
    iconName: "BookOpen",
    priceTextEn: "Request Assistance",
    priceTextBn: "আবেদন সহায়তা নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need passport-related service assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি ই-পাসপোর্ট আবেদন ও তথ্য সংশোধন সংক্রান্ত সহায়তা চাই।",
    detailsEn: [
      "E-Passport online application form submission",
      "Bank fee voucher generation and payment guidance",
      "Appointment date selection at respective regional passport office",
      "Document checklist verification to prevent rejection"
    ],
    detailsBn: [
      "ই-পাসপোর্টের অনলাইন ফরম নিখুঁতভাবে পূরণ ও সাবমিট",
      "সরকারি ফি পরিশোধের চালান/ভাউচার সংক্রান্ত দিকনির্দেশনা",
      "আঞ্চলিক পাসপোর্ট অফিসের সুবিধাজনক অ্যাপয়েন্টমেন্ট নির্ধারণ",
      "কাগজপত্র যাচাই যাতে আবেদনটি আটকে না যায়"
    ],
    notesEn: "We assist with the electronic application process. Biometrics and passport issuance are carried out exclusively by the Department of Immigration and Passports.",
    notesBn: "আমরা অনলাইন আবেদন সহায়তা প্রদান করি। সরাসরি বায়োমেট্রিক ও পাসপোর্ট বিতরণ সরকারি অফিসেই সম্পন্ন হয়।",
    active: true,
    order: 5
  },
  {
    id: "srv-translation",
    slug: "translation",
    nameEn: "Visa & Document Translation",
    nameBn: "অনুবাদ ও নোটারি সহায়তা",
    descEn: "Bangla to English translation of certificates, Nikahnama, NID, and other visa documents.",
    descBn: "নিকাহনামা, জন্মসনদ, এনআইডি ও শিক্ষাগত সনদের নির্ভুল ইংরেজি অনুবাদ সহায়তা।",
    category: "travel_visa",
    iconName: "Languages",
    priceTextEn: "Request Translation",
    priceTextBn: "অনুবাদ তথ্য নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need document translation assistance for visa.",
    whatsappMsgBn: "আসসালামু আলাইকুম, ভিসার জন্য আমার প্রয়োজনীয় কাগজপত্র অনুবাদ করতে হবে।",
    detailsEn: [
      "Marriage Certificate (Nikahnama) Bengali to English translation",
      "Birth Certificate & National ID translation",
      "Trade License, bank solvency & land document translation",
      "Notary public and advocacy coordination assistance"
    ],
    detailsBn: [
      "নিকাহনামা (বিবাহের চুক্তিপত্র) বাংলা থেকে প্রমিত ইংরেজি অনুবাদ",
      "জন্ম নিবন্ধন ও জাতীয় পরিচয়পত্র অনুবাদ",
      "ট্রেড লাইসেন্স, খতিয়ান ও ব্যবসায়িক দলিলের অনুবাদ",
      "নোটারি পাবলিক প্রত্যয়ন সংক্রান্ত সার্বিক সহায়তা"
    ],
    active: true,
    order: 6
  },
  {
    id: "srv-date-change",
    slug: "date-change-reissue",
    nameEn: "Ticket Reissue & Date Change",
    nameBn: "তারিখ পরিবর্তন ও রি-ইস্যু",
    descEn: "Change of flight travel dates, route modification, and reissue subject to airline rules.",
    descBn: "যাত্রার তারিখ পরিবর্তন, টিকেট রি-ইস্যু এবং এয়ারলাইন্স রুলস অনুসারে আপডেট সহায়তা।",
    category: "travel_visa",
    iconName: "CalendarSync",
    priceTextEn: "Check Change Fee",
    priceTextBn: "তারিখ পরিবর্তনের ফি জানুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need to change my flight date or reissue my ticket.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি আমার বিমান টিকেটের তারিখ পরিবর্তন বা রি-ইস্যু করতে চাই।",
    detailsEn: [
      "Flight date reschedule according to airline fare rules",
      "Calculation of airline penalty + fare difference (if any)",
      "Urgent same-day or next-day reissue assistance",
      "Ticket cancellation and refund processing tracking"
    ],
    detailsBn: [
      "এয়ারলাইন্সের ফেয়ার রুলস অনুযায়ী যাত্রার তারিখ পরিবর্তন",
      "এয়ারলাইন্স পেনাল্টি ফি ও ভাড়ার পার্থক্যের স্বচ্ছ হিসাব",
      "জরুরি ক্ষেত্রে দ্রুত টিকেট রি-ইস্যু সেবা",
      "টিকেট বাতিল ও রিফান্ডের আবেদন তদারকি"
    ],
    notesEn: "Penalty charges and fare differences are determined strictly by the operating airline.",
    notesBn: "তারিখ পরিবর্তনের চার্জ এয়ারলাইন্সের নিজস্ব নিয়মাবলীর উপর নির্ভরশীল।",
    active: true,
    order: 7
  },
  {
    id: "srv-india-visa",
    slug: "india-visa",
    nameEn: "India Visa Assistance",
    nameBn: "ভারতীয় ভিসা আবেদন",
    descEn: "Complete IVAC India Visa application filling, appointment coordination, and document review.",
    descBn: "ভারতীয় হাইকমিশন IVAC অনলাইন ফরম পূরণ, ফি জমা ও অ্যাপয়েন্টমেন্ট গাইডলাইন।",
    category: "travel_visa",
    iconName: "Compass",
    priceTextEn: "Get Requirements",
    priceTextBn: "ভারত ভিসার তথ্য নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need India visa application assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি ইন্ডিয়া (ভারত) ভিসা আবেদনের তথ্য ও সহায়তা চাই।",
    detailsEn: [
      "Tourist, Medical, and Business Visa application filling",
      "Photo specification guidance (2 inches x 2 inches with white background)",
      "IVAC processing fee payment guidance",
      "Document set organization (Electricity bill, bank statement/endorsement, NID)"
    ],
    detailsBn: [
      "ট্যুরিস্ট, মেডিকেল ও বিজনেস ভিসার অনলাইন ফর্ম পূরণ",
      "সঠিক সাইজের ছবি প্রস্তুত (২ ইঞ্চি বাই ২ ইঞ্চি, সাদা ব্যাকগ্রাউন্ড)",
      "আইভ্যাক (IVAC) প্রসেসিং ফি পরিশোধে সহায়তা",
      "কাগজপত্র সাজানো (বিদ্যুৎ বিল, ব্যাংক স্টেটমেন্ট/ডলার এন্ডোর্সমেন্ট, এনআইডি)"
    ],
    active: true,
    order: 8
  },
  {
    id: "srv-police-clearance",
    slug: "police-clearance",
    nameEn: "Police Clearance Certificate",
    nameBn: "পুলিশ ক্লিয়ারেন্স আবেদন",
    descEn: "Online police clearance certificate application for travel, employment, and visa requirements.",
    descBn: "বিদেশে চাকরি বা ভিসার জন্য বাংলাদেশ পুলিশের অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট আবেদন।",
    category: "travel_visa",
    iconName: "ShieldCheck",
    priceTextEn: "Apply Assistance",
    priceTextBn: "ক্লিয়ারেন্স তথ্য নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need Police Clearance Certificate application assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার পুলিশ ক্লিয়ারেন্স সার্টিফিকেট আবেদনের সহায়তা প্রয়োজন।",
    detailsEn: [
      "Bangladesh Police online clearance portal registration",
      "Treasury challan fee payment coordination",
      "Uploading attested passport and local council certificate",
      "Application tracking until certificate handover"
    ],
    detailsBn: [
      "বাংলাদেশ পুলিশের অনলাইন পোর্টালে নির্ভুল আবেদন",
      "ট্রেজারি চালানের মাধ্যমে সরকারি ফি জমা সহায়তা",
      "পাসপোর্ট কপি ও স্থানীয় চেয়ারম্যান/কমিশনার সনদের আপলোড",
      "সার্টিফিকেট প্রদান পর্যন্ত আবেদনের অগ্রগতি ট্র্যাক করা"
    ],
    active: true,
    order: 9
  },
  {
    id: "srv-medical-processing",
    slug: "medical-processing",
    nameEn: "Medical Processing Assistance",
    nameBn: "মেডিকেল প্রসেসিং",
    descEn: "Coordination for overseas travel & employment medical tests (GAMCA / Wafid) and appointments.",
    descBn: "সৌদি আরবসহ মধ্যপ্রাচ্যগামী যাত্রীদের গামকা (Wafid GAMCA) মেডিকেল স্লিপ ও অ্যাপয়েন্টমেন্ট সহায়তা।",
    category: "travel_visa",
    iconName: "Activity",
    priceTextEn: "Consult Assistance",
    priceTextBn: "মেডিকেল তথ্য নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need GAMCA/Medical appointment assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার গামকা মেডিকেল স্লিপ বা অ্যাপয়েন্টমেন্ট সংক্রান্ত সহায়তা প্রয়োজন।",
    detailsEn: [
      "Wafid (GAMCA) online medical slip generation for GCC countries",
      "Guidance for Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain",
      "Medical center location instructions & required items checklist",
      "Medical fitness report collection guidance"
    ],
    detailsBn: [
      "ওয়ালিদ/গামকা অফিসিয়াল পোর্টালে মেডিকেল স্লিপ সংগ্রহ",
      "সৌদি, কুয়েত, কাতার, বাহরাইন, ওমান ভ্রমণকারীদের গাইডলাইন",
      "নির্ধারিত মেডিকেল সেন্টারের ঠিকানা ও সঙ্গে নেওয়ার প্রয়োজনীয় কাগজের তালিকা",
      "মেডিকেল ফিটনেস রিপোর্টের স্ট্যাটাস ফলো-আপ"
    ],
    active: true,
    order: 10
  },
  {
    id: "srv-umrah-service",
    slug: "umrah-packages",
    nameEn: "Umrah Packages & Visa",
    nameBn: "ওমরাহ প্যাকেজ ও ভিসা",
    descEn: "Spiritual Umrah journeys with tailored visa processing, flights, Makkah/Madinah hotels, and ziyarat.",
    descBn: "পবিত্র ওমরাহ পালনের জন্য ভিসা, এয়ার টিকিট, মক্কা-মদিনায় মানসম্মত হোটেল ও জিয়ারাহ প্যাকেজ।",
    category: "umrah",
    iconName: "Moon",
    priceTextEn: "Request Current Price",
    priceTextBn: "বর্তমান প্যাকেজ মূল্য জানুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I would like to know about current Umrah packages.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমি পবিত্র ওমরাহ প্যাকেজ ও ভিসা সংক্রান্ত বিস্তারিত জানতে চাই।",
    detailsEn: [
      "Umrah electronic visa processing",
      "Airlines ticketing (Direct & Transit via Saudia, Biman, Flynas, Emirates, Gulf Air)",
      "Selected hotels in Makkah (Walking distance or shuttle)",
      "Selected hotels in Madinah (Close to Masjid an-Nabawi)",
      "Ground transportation and guided Ziyarat to holy historical places"
    ],
    detailsBn: [
      "ওমরাহ ইলেকট্রনিক ভিসা প্রসেসিং সেবা",
      "সরাসরি ও ট্রানজিট রুটের বিমান টিকিট (সাউদিয়া, বিমান বাংলাদেশ, ফ্লাইনাস ইত্যাদি)",
      "মক্কা শরীফে হারাম শরীফের কাছে সুবিধাজনক হোটেল",
      "মদিনা শরীফে মসজিদে নববীর সন্নিকটে আরামদায়ক হোটেল",
      "অভ্যন্তরীণ এসি ট্রান্সপোর্ট ও গুরুত্বপূর্ণ ঐতিহাসিক স্থান জিয়ারাহ"
    ],
    active: true,
    order: 11
  },
  {
    id: "srv-hotel-booking",
    slug: "hotel-booking",
    nameEn: "Hotel Booking",
    nameBn: "হোটেল বুকিং সহায়তা",
    descEn: "Worldwide hotel reservations in Saudi Arabia, Thailand, India, UAE, Malaysia, and beyond.",
    descBn: "সৌদি আরব, থাইল্যান্ড, ভারত, দুবাই, মালয়েশিয়াসহ বিশ্বজুড়ে হোটেল বুকিং সহায়তা।",
    category: "travel_visa",
    iconName: "Hotel",
    priceTextEn: "Get Hotel Quote",
    priceTextBn: "হোটেলের ভাড়া জানুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need hotel booking assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার হোটেলের বুকিং সহায়তা প্রয়োজন।",
    detailsEn: [
      "Verified budget, 3-star, 4-star, and luxury 5-star hotel options",
      "Makkah Clock Tower, Ibrahim Khalil Road & Ajyad area hotels",
      "Bangkok, Kolkata, Delhi, Kuala Lumpur, Dubai downtown accommodations",
      "Instant hotel booking voucher for visa submissions"
    ],
    detailsBn: [
      "বাজেট ফ্রেন্ডলি থেকে শুরু করে ৩, ৪ ও ৫ তারকা হোটেলের সুবিধা",
      "মক্কা শরীফ ক্লক টাওয়ার, ইব্রাহিম খলিল ও আজইয়াদ রোডের হোটেল",
      "ব্যাংকক, কলকাতা, কুয়ালালামপুর, দুবাইয়ের প্রাইম লোকেশন হোটেল",
      "ভিসা আবেদনের জন্য তাৎক্ষণিক ভাউচার প্রস্তুতকরণ"
    ],
    active: true,
    order: 12
  },
  {
    id: "srv-airport-transfer",
    slug: "airport-transfer",
    nameEn: "Airport Transfer",
    nameBn: "এয়ারপোর্ট ট্রান্সফার",
    descEn: "Reliable airport pickup and drop-off assistance for hassle-free transit in major destinations.",
    descBn: "জেদ্দা, মদিনা, ব্যাংকক, কুয়ালালামপুর ও কলকাতায় নিরাপদ এয়ারপোর্ট পিকআপ ও ড্রপ সহায়তা।",
    category: "travel_visa",
    iconName: "Car",
    priceTextEn: "Book Transfer",
    priceTextBn: "ট্রান্সফার বুক করুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need airport transfer assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার এয়ারপোর্ট পিকআপ/ড্রপ সহায়তা প্রয়োজন।",
    detailsEn: [
      "Jeddah Airport to Makkah hotel direct AC transport",
      "Madinah Airport to Madinah hotel transfer",
      "Private sedan, HiAce, and VIP GMC options for families",
      "Bangkok Suvarnabhumi & Kolkata airport transport options"
    ],
    detailsBn: [
      "জেদ্দা বিমানবন্দর থেকে সরাসরি মক্কা হোটেলের এসি গাড়ি",
      "মদিনা বিমানবন্দর থেকে হোটেল ট্রান্সফার",
      "পরিবারের জন্য প্রাইভেট কার, হাইয়েস ও ভিআইপি জিএমসি সুবিধা",
      "ব্যাংকক ও কলকাতা বিমানবন্দর ট্রান্সফার সহায়তা"
    ],
    active: true,
    order: 13
  },

  // Computer & Online Services
  {
    id: "srv-photo-composition",
    slug: "photo-composition",
    nameEn: "Photo Capture & Computer Composition",
    nameBn: "ছবি ও কম্পিউটার কম্পোজ",
    descEn: "Instant studio-grade visa photos, passport size pictures, document typing, and composition.",
    descBn: "ভিসা ও পাসপোর্ট সাইজের স্পেসিফিকেশন অনুযায়ী ছবি তোলা, এডিটিং ও কম্পিউটার কম্পোজ।",
    category: "computer_online",
    iconName: "Camera",
    priceTextEn: "Available at Office",
    priceTextBn: "অফিসে সরাসরি সেবা",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need photo printing/composition service.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার ছবি প্রিন্ট বা কম্পিউটার কম্পোজের কাজ করানো দরকার।",
    detailsEn: [
      "India Visa standard photo (2x2 inches, white background, matte finish)",
      "Schengen / Europe / US visa specification photos",
      "Bengali & English document typing, bio-data, and resume writing",
      "Official letterhead & application composition"
    ],
    detailsBn: [
      "ইন্ডিয়া ভিসা স্পেসিফিকেশন ছবি (২x২ ইঞ্চি, সাদা ব্যাকগ্রাউন্ড, ম্যাট পেপার)",
      "ইউরোপ, ইউএসএ ও থাইল্যান্ড ভিসার নির্ধারিত মাপের ছবি",
      "বাংলা ও ইংরেজি নির্ভুল টাইপিং, বায়োডাটা ও আবেদনপত্র প্রস্তুত",
      "জরুরি কম্পোজ ও প্রিন্ট সেবা"
    ],
    active: true,
    order: 14
  },
  {
    id: "srv-photocopy",
    slug: "photocopy",
    nameEn: "High-Quality Photocopy & Scanning",
    nameBn: "ফটোকপি ও স্ক্যানিং",
    descEn: "Clear black & white / color photocopy, document scanning, laminating, and PDF conversion.",
    descBn: "উচ্চমানের স্পষ্ট ফটোকপি, কালার কপি, ডকুমেন্ট স্ক্যানিং, লেমিনেটিং ও পিডিএফ প্রস্তুত।",
    category: "computer_online",
    iconName: "Printer",
    priceTextEn: "Available at Office",
    priceTextBn: "অফিসে সরাসরি সেবা",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need photocopy/scanning services.",
    whatsappMsgBn: "আসসালামু আলাইকুম, জরুরি ফটোকপি ও স্ক্যানিং সংক্রান্ত সেবা প্রয়োজন।",
    detailsEn: [
      "Sharp black & white and high-resolution color photocopying",
      "HD document scanning to email and WhatsApp",
      "Lamination of certificates, NID cards, and travel documents",
      "Booklet binding and bulk document preparation"
    ],
    detailsBn: [
      "উচ্চমানের স্পষ্ট সাদা-কালো ও কালার ফটোকপি",
      "হাই-রেজোলিউশন ডকুমেন্ট স্ক্যানিং ও ইমেইল/হোয়াটসঅ্যাপে প্রেরণ",
      "জরুরি সনদ, এনআইডি ও গুরুত্বপূর্ণ কাগজ লেমিনেটিং",
      "ডকুমেন্ট বুকলেট বাইন্ডিং ও ফাইল গোছানো"
    ],
    active: true,
    order: 15
  },
  {
    id: "srv-admission-application",
    slug: "admission-application",
    nameEn: "College & University Admission",
    nameBn: "ভর্তি আবেদন সেবা",
    descEn: "Online admission applications for XI Class, Honors, Degree, Nursing, and public universities.",
    descBn: "একাদশ শ্রেণি, জাতীয় বিশ্ববিদ্যালয় অনার্স, ডিগ্রি ও পাবলিক বিশ্ববিদ্যালয়ে অনলাইন ভর্তি আবেদন।",
    category: "computer_online",
    iconName: "GraduationCap",
    priceTextEn: "Online Assistance",
    priceTextBn: "আবেদন সহায়তা নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need online admission application assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার কলেজে/বিশ্ববিদ্যালয়ে অনলাইন ভর্তি আবেদনের সহায়তা দরকার।",
    detailsEn: [
      "XI Class college admission choice list and fee submission",
      "National University (NU) Honors, Degree, and Masters online admission",
      "Nursing and Health Technology online application form fill-up",
      "Admit card download and result printout"
    ],
    detailsBn: [
      "একাদশ শ্রেণিতে কলেজ চয়েস লিস্ট ও সঠিক ফি পরিশোধ",
      "জাতীয় বিশ্ববিদ্যালয়ের অনার্স, পাস কোর্স ও মাস্টার্স ভর্তি ফরম পূরণ",
      "নার্সিং ও বিভিন্ন সরকারি পরীক্ষার অনলাইন আবেদন",
      "এডমিট কার্ড ডাউনলোড ও ফলাফল প্রিন্ট"
    ],
    active: true,
    order: 16
  },
  {
    id: "srv-govt-applications",
    slug: "govt-applications",
    nameEn: "Online Government Applications (NID, Birth, Passport)",
    nameBn: "সরকারি আবেদন (পাসপোর্ট, এনআইডি, জন্মনিবন্ধন)",
    descEn: "Help with online corrections, reissue, and applications for NID, Birth Certificate, and Passport.",
    descBn: "জাতীয় পরিচয়পত্র (NID) সংশোধন, হারানো এনআইডি উত্তোলন, জন্মনিবন্ধন আবেদন ও পাসপোর্ট সহায়তা।",
    category: "computer_online",
    iconName: "Landmark",
    priceTextEn: "Consult Assistance",
    priceTextBn: "পরামর্শ নিন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need government application assistance (NID/Birth/Passport).",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার এনআইডি/জন্মনিবন্ধন/পাসপোর্ট অনলাইন আবেদনের সহায়তা প্রয়োজন।",
    detailsEn: [
      "NID correction application (Name, Date of Birth, Father/Mother name)",
      "Lost NID card re-issuance application",
      "Birth registration online verification & new application submission",
      "E-TIN certificate generation & general online forms"
    ],
    detailsBn: [
      "জাতীয় পরিচয়পত্রের নাম, বয়স ও পিতা-মাতার তথ্য সংশোধন আবেদন",
      "হারানো বা নষ্ট এনআইডি পুনঃউত্তোলনের আবেদন",
      "অনলাইন জন্মনিবন্ধন যাচাই ও নতুন আবেদনের সহায়তা",
      "ই-টিন সার্টিফিকেট সংগ্রহ ও বিভিন্ন সরকারি ফি চালান"
    ],
    notesEn: "We are an independent digital assistance service helping clients with online computer portals. We do not represent any government ministry.",
    notesBn: "আমরা নাগরিকদের সুবিধার জন্য অনলাইন পোর্টালে ফর্ম পূরণে সহায়তা করি। আমরা কোনো সরকারি দপ্তর নই।",
    active: true,
    order: 17
  },
  {
    id: "srv-other-online",
    slug: "other-online-services",
    nameEn: "Other Online & Digital Services",
    nameBn: "অন্যান্য সকল অনলাইন সেবা",
    descEn: "Utility bill payments, email sending, CV creation, mobile recharge, and customized digital tasks.",
    descBn: "বিদ্যুৎ বিল পরিশোধ, ইমেইল প্রেরণ, প্রফেশনাল সিভি তৈরি ও সকল ধরনের দৈনন্দিন অনলাইন সহায়তা।",
    category: "computer_online",
    iconName: "Globe",
    priceTextEn: "Discuss Requirement",
    priceTextBn: "যোগাযোগ করুন",
    whatsappMsgEn: "Hello Siam Air & Digital Service, I need computer/online service assistance.",
    whatsappMsgBn: "আসসালামু আলাইকুম, আমার একটি অনলাইন/ডিজিটাল কাজের জন্য সাহায্য প্রয়োজন।",
    detailsEn: [
      "Electricity and utility bill payment via bKash/Nagad/Bank",
      "Professional CV and Resume creation in Bangla and English",
      "Sending official emails with attached files",
      "Any custom internet application according to your needs"
    ],
    detailsBn: [
      "পল্লী বিদ্যুৎ ও অন্যান্য ইউটিলিটি বিল পরিশোধ",
      "চাকরির জন্য আকর্ষণীয় বাংলা ও ইংরেজি সিভি তৈরি",
      "জরুরি ইমেইল আদান-প্রদান ও স্ক্যান ফাইল সংযুক্তি",
      "আপনার যে কোনো অনলাইন বা ইন্টারনেটের কাজের নির্ভরযোগ্য সমাধান"
    ],
    active: true,
    order: 18
  }
];

export const INITIAL_VISA_SERVICES: VisaService[] = [
  {
    id: "visa-india",
    slug: "india",
    countryEn: "India",
    countryBn: "ভারত (ইন্ডিয়া)",
    flag: "🇮🇳",
    visaTypeEn: "Tourist / Medical / Business Visa",
    visaTypeBn: "ট্যুরিস্ট / মেডিকেল / বিজনেস ভিসা",
    basicReqsEn: [
      "Original passport with at least 6 months validity",
      "2x2 inches recent color photograph (white background, glossy/matte)",
      "Utility bill copy (Electricity bill of current residence)",
      "National ID Card (NID) or Birth Certificate copy",
      "Bank Statement (Minimum balance ~BDT 20,000) or Dollar Endorsement (min $150)",
      "Profession proof (NOC/Trade License/Student ID)"
    ],
    basicReqsBn: [
      "কমপক্ষে ৬ মাস মেয়াদী মূল পাসপোর্ট ও পূর্বের সকল পাসপোর্ট",
      "২x২ ইঞ্চি সাইজের সাদা ব্যাকগ্রাউন্ডের সদ্য তোলা ল্যাব প্রিন্ট ছবি",
      "বর্তমান ঠিকানার বিদ্যুৎ বিলের কপি",
      "জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম সনদের কপি",
      "কমপক্ষে ২০,০০০ টাকা ব্যালেন্স সহ ব্যাংক স্টেটমেন্ট অথবা ১৫০ ডলার এন্ডোর্সমেন্ট",
      "পেশাগত প্রমাণপত্র (চাকরিজীবীদের নো অবজেকশন লেটার / ব্যবসায়ীদের ট্রেড লাইসেন্স / ছাত্র আইডি)"
    ],
    processingInfoEn: "Subject to IVAC appointment availability and High Commission processing timeline.",
    processingInfoBn: "আইভ্যাক (IVAC) অ্যাপয়েন্টমেন্ট শিডিউল ও হাইকমিশনের নিয়মানুযায়ী নির্ধারিত হয়।",
    notesEn: "We assist with application filling and document compilation. Approval is strictly determined by the Indian High Commission.",
    notesBn: "আমরা ফরম পূরণ ও ফাইল প্রস্তুতকরণে সহায়তা করি। ভিসা মঞ্জুরির ক্ষমতা সম্পূর্ণ ভারতীয় দূতাবাসের।",
    popular: true,
    active: true
  },
  {
    id: "visa-thailand",
    slug: "thailand",
    countryEn: "Thailand",
    countryBn: "থাইল্যান্ড",
    flag: "🇹🇭",
    visaTypeEn: "Single Entry Tourist Visa (TR)",
    visaTypeBn: "সিঙ্গেল এন্ট্রি ট্যুরিস্ট ভিসা",
    basicReqsEn: [
      "Passport with at least 6 months validity and minimum 2 blank pages",
      "2 copies 3.5 x 4.5 cm photos with white background (matte)",
      "6-month Bank Statement with minimum balance of BDT 80,000 per person along with Bank Solvency Certificate",
      "Employment NOC on company letterhead / Trade license with English translation & notarized",
      "Confirmed round-trip flight booking & hotel reservation voucher"
    ],
    basicReqsBn: [
      "ন্যূনতম ৬ মাস মেয়াদ ও অন্তত ২টি ফাঁকা পৃষ্ঠা সহ মূল পাসপোর্ট",
      "৩.৫ x ৪.৫ সেমি সাইজের সাদা ব্যাকগ্রাউন্ডের ম্যাট পেপারের ২ কপি ছবি",
      "ব্যক্তি প্রতি ন্যূনতম ৮০,০০০ টাকা ব্যালেন্স সহ ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট",
      "চাকরিজীবীদের জন্য অফিসিয়াল এনওসি / ব্যবসায়ীদের জন্য ইংরেজি অনুবাদ ও নোটারিকৃত ট্রেড লাইসেন্স",
      "রিটার্ন এয়ার টিকিট ও হোটেল বুকিং কনফার্মেশন স্লিপ"
    ],
    processingInfoEn: "Typical processing takes 5 to 7 working days at the VFS Thailand center.",
    processingInfoBn: "সাধারণত ভিএফএস থাইল্যান্ড সেন্টারে জমা দেওয়ার পর ৫ থেকে ৭ কর্মদিবস সময় লাগে।",
    notesEn: "No visa guarantee is provided. The Royal Thai Embassy reserves full rights of approval.",
    notesBn: "কোনো প্রকার ভিসা গ্যারান্টি প্রদান করা হয় না। অনুমোদন সম্পূর্ণ রয়্যাল থাই দূতাবাসের ওপর নির্ভর করে।",
    popular: true,
    active: true
  },
  {
    id: "visa-saudi",
    slug: "saudi",
    countryEn: "Saudi Arabia",
    countryBn: "সৌদি আরব",
    flag: "🇸🇦",
    visaTypeEn: "Umrah Visa / Tourist E-Visa / Visit Visa Assistance",
    visaTypeBn: "ওমরাহ ভিসা / ট্যুরিস্ট ই-ভিসা / ভিজিট ভিসা",
    basicReqsEn: [
      "Passport with minimum 6 months validity",
      "Recent passport-sized photograph with white background",
      "Valid contact details and travel intention",
      "Confirmed flight and hotel arrangements (arranged by us or self)"
    ],
    basicReqsBn: [
      "ন্যূনতম ৬ মাস মেয়াদী মূল পাসপোর্ট",
      "সাদা ব্যাকগ্রাউন্ডের সদ্য তোলা পাসপোর্ট সাইজ ছবি",
      "সচল ফোন নম্বর ও ভ্রমণের বিস্তারিত তথ্য",
      "কনফার্মড এয়ার টিকিট ও হোটেল বুকিং কপি"
    ],
    processingInfoEn: "Electronic visas typically process within 24 to 72 hours subject to Saudi Ministry of Hajj & Umrah approvals.",
    processingInfoBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের অনুমোদন সাপেক্ষে সাধারণত ২৪ থেকে ৭২ ঘণ্টার মধ্যে ই-ভিসা পাওয়া যায়।",
    notesEn: "Requirements may vary depending on visa category and seasonal guidelines.",
    notesBn: "ভিসার ক্যাটাগরি ও মৌসুমী নির্দেশিকা অনুসারে নিয়মাবলী পরিবর্তিত হতে পারে।",
    popular: true,
    active: true
  },
  {
    id: "visa-malaysia",
    slug: "malaysia",
    countryEn: "Malaysia",
    countryBn: "মালয়েশিয়া",
    flag: "🇲🇾",
    visaTypeEn: "Tourist E-Visa / Sticker Visa",
    visaTypeBn: "ট্যুরিস্ট ই-ভিসা / স্টিকার ভিসা",
    basicReqsEn: [
      "Original passport with 6 months validity",
      "3.5 x 5.0 cm studio photo with white background",
      "6-month bank statement with solvency certificate",
      "NOC from employer or trade license copy"
    ],
    basicReqsBn: [
      "কমপক্ষে ৬ মাস মেয়াদী মূল পাসপোর্ট",
      "৩.৫ x ৫.০ সেমি সাইজের সাদা ব্যাকগ্রাউন্ডের স্টুডিও ছবি",
      "পর্যাপ্ত ব্যালেন্স সহ ৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি",
      "কোম্পানি এনওসি লেটার অথবা নোটারিকৃত ট্রেড লাইসেন্স"
    ],
    processingInfoEn: "Standard processing requires 3-5 working days.",
    processingInfoBn: "সাধারণত ৩ থেকে ৫ কর্মদিবসের মধ্যে প্রসেস সম্পন্ন হয়।",
    notesEn: "Subject to Malaysian Immigration requirements.",
    notesBn: "মালয়েশিয়া ইমিগ্রেশনের নিয়মাবলী সাপেক্ষে।",
    popular: true,
    active: true
  },
  {
    id: "visa-uae",
    slug: "uae",
    countryEn: "UAE (Dubai)",
    countryBn: "সংযুক্ত আরব আমিরাত (দুবাই)",
    flag: "🇦🇪",
    visaTypeEn: "30 Days / 60 Days Tourist E-Visa",
    visaTypeBn: "৩০ দিন / ৬০ দিনের ট্যুরিস্ট ই-ভিসা",
    basicReqsEn: [
      "Clear passport scanned copy (color, minimum 6 months validity)",
      "Passport-size photograph with white background",
      "Confirmed round-trip ticket copy (where requested)"
    ],
    basicReqsBn: [
      "ন্যূনতম ৬ মাস মেয়াদী পাসপোর্টের স্পষ্ট কালার স্ক্যান কপি",
      "সাদা ব্যাকগ্রাউন্ডের ডিজিটাল ছবি",
      "প্রয়োজনে কনফার্মড রিটার্ন এয়ার টিকিট কপি"
    ],
    processingInfoEn: "Typically issued in 2 to 4 working days.",
    processingInfoBn: "সাধারণত ২ থেকে ৪ কর্মদিবসের মধ্যে ইস্যু হয়।",
    notesEn: "Immigration entry rules and age restrictions are set by UAE GDRFA.",
    notesBn: "ইউএই জিডিআরএফএ ইমিগ্রেশন নীতিমালা অনুসরণীয়।",
    popular: true,
    active: true
  },
  {
    id: "visa-singapore",
    slug: "singapore",
    countryEn: "Singapore",
    countryBn: "সিঙ্গাপুর",
    flag: "🇸🇬",
    visaTypeEn: "Entry Visa (E-Visa via Authorised Agent)",
    visaTypeBn: "এন্ট্রি ই-ভিসা",
    basicReqsEn: [
      "Passport with 6 months validity",
      "Color photograph with matte finish",
      "Letter of Introduction (Form 14A)",
      "Bank statement and company NOC"
    ],
    basicReqsBn: [
      "৬ মাস মেয়াদী মূল পাসপোর্ট",
      "ম্যাট পেপারের সঠিক স্পেসিফিকেশনের ছবি",
      "ফর্ম ১৪এ যথাযথভাবে পূরণ",
      "সন্তোষজনক ব্যাংক স্টেটমেন্ট ও অফিস এনওসি"
    ],
    processingInfoEn: "Takes 5 to 7 working days.",
    processingInfoBn: "সাধারণত ৫ থেকে ৭ কর্মদিবস সময় লাগে।",
    notesEn: "Subject to Singapore ICA guidelines.",
    notesBn: "সিঙ্গাপুর আইসিএ নির্দেশিকা অনুযায়ী প্রযোজ্য।",
    popular: false,
    active: true
  },
  {
    id: "visa-schengen",
    slug: "schengen",
    countryEn: "Schengen (Europe)",
    countryBn: "শেঞ্জেন (ইউরোপ)",
    flag: "🇪🇺",
    visaTypeEn: "Short Stay Tourist / Business Visa Assistance",
    visaTypeBn: "শর্ট স্টে ট্যুরিস্ট / বিজনেস ভিসা সহায়তা",
    basicReqsEn: [
      "Valid passport, travel health insurance (minimum €30,000 coverage)",
      "Detailed day-to-day itinerary, flight reservation, hotel bookings",
      "6-month comprehensive bank statement with tax documents (TIN, Tax Return)",
      "Job NOC / Business trade documents with English notarization"
    ],
    basicReqsBn: [
      "বৈধ পাসপোর্ট ও ন্যূনতম ৩০,০০০ ইউরো কাভারেজের ট্রাভেল ইন্স্যুরেন্স",
      "দিনভিত্তিক পূর্ণাঙ্গ ভ্রমণ পরিকল্পনা, টিকেট ও হোটেল বুকিং",
      "৬ মাসের ব্যাংক স্টেটমেন্ট, ইনকাম ট্যাক্স রিটার্ন ও টিন সার্টিফিকেট",
      "চাকরির এনওসি অথবা ব্যবসায়িক দলিলের নোটারিকৃত কপি"
    ],
    processingInfoEn: "Embassy processing typically requires 15 to 30 calendar days.",
    processingInfoBn: "দূতাবাসে ফাইল জমা দেওয়ার পর ১৫ থেকে ৩০ দিন সময় লাগতে পারে।",
    notesEn: "We provide file preparation and advisory assistance. Embassy conducts biometric interviews.",
    notesBn: "আমরা ফাইল প্রস্তুতকরণে সহায়তা করি। আবেদনকারীকে সরাসরি উপস্থিত হয়ে বায়োমেট্রিক দিতে হয়।",
    popular: false,
    active: true
  },
  {
    id: "visa-uk",
    slug: "uk",
    countryEn: "United Kingdom",
    countryBn: "যুক্তরাজ্য (ইউকে)",
    flag: "🇬🇧",
    visaTypeEn: "Standard Visitor Visa Assistance",
    visaTypeBn: "স্ট্যান্ডার্ড ভিজিটর ভিসা সহায়তা",
    basicReqsEn: [
      "Current passport, financial evidence of funds to support visit",
      "Employment/business evidence and leave letter",
      "Accommodation details in the UK and travel itinerary"
    ],
    basicReqsBn: [
      "মূল পাসপোর্ট ও ভ্রমণের ব্যয় নির্বাহের জন্য পর্যাপ্ত আর্থিক প্রমাণ",
      "পেশাগত প্রমাণপত্র ও ছুটির অনুমোদনের চিঠি",
      "যুক্তরাজ্যে থাকার ঠিকানা ও ভ্রমণ পরিকল্পনা"
    ],
    processingInfoEn: "Standard UKVI processing is 3 to 6 weeks.",
    processingInfoBn: "সাধারণত ইউকেভিআই ৩ থেকে ৬ সপ্তাহের মধ্যে সিদ্ধান্ত প্রদান করে।",
    notesEn: "Decisions rest entirely with UK Visas & Immigration.",
    notesBn: "ইউকে ভিসা অ্যান্ড ইমিগ্রেশন সম্পূর্ণ সিদ্ধান্তের অধিকারী।",
    popular: false,
    active: true
  },
  {
    id: "visa-usa",
    slug: "usa",
    countryEn: "USA",
    countryBn: "যুক্তরাষ্ট্র (ইউএসএ)",
    flag: "🇺🇸",
    visaTypeEn: "B1/B2 Tourist & Business Visa Assistance",
    visaTypeBn: "বি১/বি২ ট্যুরিস্ট ও বিজনেস ভিসা সহায়তা",
    basicReqsEn: [
      "Valid passport, DS-160 online application form submission",
      "MRV visa fee payment and interview appointment scheduling",
      "Financial and ties to home country documents compilation"
    ],
    basicReqsBn: [
      "বৈধ পাসপোর্ট ও ডিএস-১৬০ অনলাইন ফর্ম নিখুঁতভাবে পূরণ",
      "ভিসা ফি পরিশোধ ও সাক্ষাতকারের অ্যাপয়েন্টমেন্ট শিডিউলিং",
      "আর্থিক সচ্ছলতা ও দেশে ফিরে আসার জোরালো প্রমাণাদি প্রস্তুত"
    ],
    processingInfoEn: "Subject to US Embassy appointment calendar availability.",
    processingInfoBn: "ইউএস দূতাবাসের নির্ধারিত ইন্টারভিউ স্লট প্রাপ্তির ওপর নির্ভরশীল।",
    notesEn: "Personal interview is mandatory at the US Embassy in Dhaka.",
    notesBn: "ঢাকাস্থ মার্কিন দূতাবাসে আবেদনকারীকে সশরীরে ইন্টারভিউ দিতে হয়।",
    popular: false,
    active: true
  },
  {
    id: "visa-canada",
    slug: "canada",
    countryEn: "Canada",
    countryBn: "কানাডা",
    flag: "🇨🇦",
    visaTypeEn: "Temporary Resident Visa (Visitor Visa) Assistance",
    visaTypeBn: "ভিজিটর ভিসা সহায়তা",
    basicReqsEn: [
      "Valid passport, detailed travel purpose",
      "Proof of financial support (Bank statements, property evaluation, assets)",
      "Ties to Bangladesh (Job/Business/Family commitments)"
    ],
    basicReqsBn: [
      "বৈধ পাসপোর্ট ও ভ্রমণের সুনির্দিষ্ট উদ্দেশ্য",
      "আর্থিক সক্ষমতার প্রমাণ (ব্যাংক স্টেটমেন্ট, সম্পদ মূল্যায়ন)",
      "বাংলাদেশে ফিরে আসার সামাজিক ও পেশাগত প্রমাণ"
    ],
    processingInfoEn: "IRCC processing varies by season.",
    processingInfoBn: "কানাডা আইআরসিসি এর নির্ধারিত সময়সূচি অনুসারে।",
    notesEn: "Assistance with IRCC online portal submission and document arrangement.",
    notesBn: "অনলাইন পোর্টাল ফাইল প্রস্তুতকরণে সহায়তা প্রদান করা হয়।",
    popular: false,
    active: true
  },
  {
    id: "visa-australia",
    slug: "australia",
    countryEn: "Australia",
    countryBn: "অস্ট্রেলিয়া",
    flag: "🇦🇺",
    visaTypeEn: "Visitor Visa (Subclass 600) Assistance",
    visaTypeBn: "ভিজিটর ভিসা (সাবক্লাস ৬০০) সহায়তা",
    basicReqsEn: [
      "Valid passport, ImmiAccount application submission",
      "Bank solvency, income tax certificates, salary slips/trade license",
      "Travel itinerary and health insurance"
    ],
    basicReqsBn: [
      "বৈধ পাসপোর্ট ও ইমিঅ্যাকাউন্টে অনলাইন আবেদন",
      "ব্যাংক সলভেন্সি, ট্যাক্স সার্টিফিকেট ও আয়ের উৎস প্রমাণ",
      "ভ্রমণ পরিকল্পনা ও আন্তর্জাতিক স্বাস্থ্য বীমা"
    ],
    processingInfoEn: "Typically 3 to 5 weeks.",
    processingInfoBn: "সাধারণত ৩ থেকে ৫ সপ্তাহ সময় লাগে।",
    notesEn: "Assistance with documentation according to Department of Home Affairs guidelines.",
    notesBn: "অস্ট্রেলিয়ান হোম অ্যাফেয়ার্সের নিয়ম মেনে ফাইল প্রস্তুত সহায়তা।",
    popular: false,
    active: true
  }
];

export const INITIAL_UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: "umrah-economy",
    nameEn: "Economy Umrah Package",
    nameBn: "ইকোনমি ওমরাহ প্যাকেজ",
    tier: "economy",
    durationEn: "14 Days (7 Nights Makkah + 7 Nights Madinah)",
    durationBn: "১৪ দিন (৭ রাত মক্কা + ৭ রাত মদিনা)",
    makkahNights: 7,
    madinahNights: 7,
    hotelCategoryEn: "Standard Hotel (Clean, Quad/Quint Sharing)",
    hotelCategoryBn: "স্ট্যান্ডার্ড হোটেল (পরিষ্কার-পরিচ্ছন্ন, ৪/৫ বেড শেয়ারিং)",
    makkahHotelDistEn: "700 – 900 meters (or regular shuttle service)",
    makkahHotelDistBn: "৭০০ – ৯০০ মিটার (অথবা নিয়মিত শাটল সার্ভিস)",
    madinahHotelDistEn: "400 – 600 meters from Haram boundary",
    madinahHotelDistBn: "৪০০ – ৬০০ মিটার দূরত্বে",
    transportEn: "AC Bus transportation (Jeddah – Makkah – Madinah – Jeddah)",
    transportBn: "সম্পূর্ণ এসি বাস পরিবহন (জেদ্দা – মক্কা – মদিনা – জেদ্দা)",
    inclusionsEn: [
      "Umrah electronic visa processing",
      "Return air ticket with checked baggage",
      "Makkah & Madinah hotel accommodations",
      "Full AC bus group transportation",
      "Historic Ziyarat in Makkah (Jabal al-Nour, Arafat, Muzdalifah, Mina)",
      "Historic Ziyarat in Madinah (Masjid Quba, Mount Uhud, Qiblatayn)",
      "Experienced religious Moallem / Guide assistance"
    ],
    inclusionsBn: [
      "ওমরাহ ইলেকট্রনিক ভিসা প্রসেসিং",
      "লাগেজসহ উভয় পথের কনফার্মড এয়ার টিকিট",
      "মক্কা ও মদিনায় নির্ধারিত হোটেল অবস্থান",
      "গ্রুপ এসি বাস পরিবহন সুবিধা",
      "মক্কার ঐতিহাসিক স্থান জিয়ারাহ (জাবালে নূর, আরাফাত, মুজদালিফা, মিনা)",
      "মদিনার বরকতময় স্থান জিয়ারাহ (মসজিদে কুবা, ওহুদ পাহাড়, কিবলাতাইন)",
      "অভিজ্ঞ মোয়াল্লেম ও গাইড দ্বারা ওমরাহ পরিচালনায় সার্বক্ষণিক সহায়তা"
    ],
    exclusionsEn: ["Personal shopping expenses", "Food/meals (unless requested)", "Any personal medical expenses"],
    exclusionsBn: ["ব্যক্তিগত কেনাকাটার খরচ", "খাবার (প্রয়োজনে প্যাকেজের সাথে যুক্ত করা যায়)", "ব্যক্তিগত চিকিৎসা খরচ"],
    priceNoteEn: "Due to seasonal airline and hotel fluctuations, please request today's best price.",
    priceNoteBn: "মৌসুমভেদে বিমান ভাড়া ও হোটেলের দর পরিবর্তনশীল হওয়ায় আজকের সেরা দর জানতে যোগাযোগ করুন।",
    active: true,
    order: 1
  },
  {
    id: "umrah-standard",
    nameEn: "Standard Comfort Umrah Package",
    nameBn: "স্ট্যান্ডার্ড কমফোর্ট ওমরাহ প্যাকেজ",
    tier: "standard",
    durationEn: "14 Days (7 Nights Makkah + 7 Nights Madinah)",
    durationBn: "১৪ দিন (৭ রাত মক্কা + ৭ রাত মদিনা)",
    makkahNights: 7,
    madinahNights: 7,
    hotelCategoryEn: "3-Star Quality Hotels (Double/Triple/Quad options)",
    hotelCategoryBn: "৩-তারকা মানসম্মত হোটেল (ডাবল/ট্রিপল/কোয়াড অপশন)",
    makkahHotelDistEn: "350 – 500 meters walking distance from Haram",
    makkahHotelDistBn: "৩৫০ – ৫০০ মিটার হাঁটা দূরত্ব (মসজিদুল হারামের নিকটবর্তী)",
    madinahHotelDistEn: "250 – 350 meters from Markazia area",
    madinahHotelDistBn: "২৫০ – ৩৫০ মিটার (মারকাজিয়া এলাকা)",
    transportEn: "Comfortable Air-conditioned bus / Shared modern coaches",
    transportBn: "আরামদায়ক এসি কোচ পরিবহন",
    inclusionsEn: [
      "Umrah electronic visa & insurance",
      "Airlines ticket via direct or standard carrier",
      "Quality hotel stay in prime proximity",
      "Complete ground transfers and holy Ziyarat visits",
      "Dedicated Umrah orientation and assistance"
    ],
    inclusionsBn: [
      "ওমরাহ ই-ভিসা ও ট্রাভেল হেলথ ইন্স্যুরেন্স",
      "উন্নত রুটের এয়ার টিকিট",
      "হারাম শরীফের সন্নিকটে আরামদায়ক হোটেল অবস্থান",
      "সম্পূর্ণ অভ্যন্তরীণ পরিবহন ও ঐতিহাসিক জিয়ারাহসমূহ",
      "ওমরাহ পালনের প্রাথমিক নিয়মাবলী বিষয়ক বিশেষ গাইডেন্স"
    ],
    exclusionsEn: ["Lunch/dinner unless added", "Laundry expenses"],
    exclusionsBn: ["লাঞ্চ/ডিনার (প্রয়োজনে যুক্ত করা যাবে)", "লন্ড্রি ও ব্যক্তিগত ব্যয়"],
    priceNoteEn: "Competitive market fare with verified quality standards.",
    priceNoteBn: "মানসম্মত সুবিধাসহ প্রতিযোগিতামূলক প্যাকেজ মূল্য।",
    active: true,
    order: 2
  },
  {
    id: "umrah-premium",
    nameEn: "Premium 5-Star Umrah Package",
    nameBn: "প্রিমিয়াম ৫-তারকা ওমরাহ প্যাকেজ",
    tier: "premium",
    durationEn: "10 to 14 Days Flexible Duration",
    durationBn: "১০ থেকে ১৪ দিন (কাস্টমাইজেবল)",
    makkahNights: 5,
    madinahNights: 5,
    hotelCategoryEn: "5-Star Luxury Hotels (Front Row / Clock Tower / Swissotel / Pullman ZamZam)",
    hotelCategoryBn: "৫-তারকা লাক্সারি হোটেল (ক্লক টাওয়ার / সুইসোটেল / পুলম্যান জমজম)",
    makkahHotelDistEn: "0 – 150 meters (Haram Courtyard Entrance)",
    makkahHotelDistBn: "০ – ১৫০ মিটার (সরাসরি হারাম চত্বর)",
    madinahHotelDistEn: "0 – 100 meters (Near Bab As-Salam / Haram Plaza)",
    madinahHotelDistBn: "০ – ১০০ মিটার (সরাসরি মসজিদে নববী প্লাজা)",
    transportEn: "Private VIP GMC / Luxury private vehicle transfers",
    transportBn: "প্রাইভেট ভিআইপি জিএমসি / লাক্সারি কার সার্ভিস",
    inclusionsEn: [
      "VIP Umrah Visa processing",
      "Business or premium economy flight options available",
      "Buffet breakfast included at 5-star hotel restaurant",
      "Exclusive private transfers for all sectors",
      "Private guided historical Ziyarat with knowledgeable scholar",
      "24/7 on-ground executive assistance"
    ],
    inclusionsBn: [
      "ভিআইপি ওমরাহ ভিসা দ্রুততম প্রসেসিং",
      "বিজনেস বা প্রিমিয়াম ফ্লাইটের সুবিধা",
      "প্রতিদিন ৫-তারকা বুফে ব্রেকফাস্ট অন্তর্ভুক্ত",
      "সম্পূর্ণ ব্যক্তিগত ভিআইপি গাড়িতে এয়ারপোর্ট ও অভ্যন্তরীণ যাতায়াত",
      "অভিজ্ঞ আলেম দ্বারা ব্যক্তিগত ঐতিহাসিক জিয়ারাহ পরিচালনা",
      "২৪ ঘণ্টা সার্বক্ষণিক এক্সিকিউটিভ কেয়ার"
    ],
    exclusionsEn: ["Personal shopping and laundry"],
    exclusionsBn: ["ব্যক্তিগত শপিং ও লন্ড্রি"],
    priceNoteEn: "Customized according to your exact preferred dates and room tier.",
    priceNoteBn: "আপনার সুবিধাজনক তারিখ ও পছন্দের রুম অনুযায়ী কাস্টমাইজড কোটেশন প্রদান করা হয়।",
    active: true,
    order: 3
  },
  {
    id: "umrah-family",
    nameEn: "Family Umrah Package",
    nameBn: "ফ্যামিলি ওমরাহ প্যাকেজ",
    tier: "family",
    durationEn: "12 to 15 Days (Tailored for parents, children & elders)",
    durationBn: "১২ থেকে ১৫ দিন (পিতা-মাতা ও পরিবারের জন্য বিশেষ যত্নশীল)",
    makkahNights: 6,
    madinahNights: 6,
    hotelCategoryEn: "Spacious Family Rooms / Connecting Suites near Haram",
    hotelCategoryBn: "পরিবারের জন্য প্রশস্ত পারিবারিক রুম / কানেক্টিং স্যুট",
    makkahHotelDistEn: "200 – 350 meters with easy wheelchair & senior citizen access",
    makkahHotelDistBn: "২০০ – ৩৫০ মিটার (বয়োজ্যেষ্ঠ ও হুইলচেয়ার চলাচলের উপযোগী পথ)",
    madinahHotelDistEn: "150 – 250 meters walking distance",
    madinahHotelDistBn: "১৫০ – ২৫০ মিটার হাঁটা পথ",
    transportEn: "Private family HiAce microbus or private van",
    transportBn: "পরিবারের সদস্যদের জন্য নিজস্ব হাইয়েস মাইক্রোবাস",
    inclusionsEn: [
      "Full family Umrah visa assistance",
      "Flights scheduled for family comfort (minimal layover)",
      "Wheelchair assistance coordination at Haram if required",
      "Private family transport for maximum privacy and ease",
      "Child-friendly arrangements and full guidance"
    ],
    inclusionsBn: [
      "সম্পূর্ণ পরিবারের ভিসা প্রসেসিং ও বিশেষ কেয়ার",
      "সহজ ও আরামদায়ক ট্রানজিটের ফ্লাইট সমন্বয়",
      "প্রয়োজনে বয়স্কদের জন্য হুইলচেয়ার সহায়তা",
      "পারিবারিক প্রাইভেট মাইক্রোবাসে শান্তিময় ভ্রমণ",
      "বাচ্চাদের সুবিধাজনক পরিবেশ ও পূর্ণাঙ্গ ধর্মীয় দিকনির্দেশনা"
    ],
    exclusionsEn: ["Individual special medical needs"],
    exclusionsBn: ["বিশেষ ব্যক্তিগত চিকিৎসা ব্যয়"],
    priceNoteEn: "Special family group discounted rates available.",
    priceNoteBn: "পারিবারিক গ্রুপের জন্য বিশেষ সাশ্রয়ী প্যাকেজ রেট দেওয়া হয়।",
    active: true,
    order: 4
  }
];

export const INITIAL_PAYMENT_CONFIG: PaymentConfig = {
  bankAccounts: [
    {
      id: "bank-islami",
      bankName: "Islami Bank Bangladesh PLC",
      accountName: "SIAM AIR & DIGITAL SERVICE",
      accountNumber: "20503920100456789",
      branch: "Homna Branch",
      routingNo: "125190876",
      accountTypeEn: "Current / Business Account",
      accountTypeBn: "চলতি / ব্যবসায়িক হিসাব",
      instructionsEn: "Transfer via online banking, BEFTN, NPSB, or deposit directly at any Islami Bank branch. Keep deposit slip or transaction screenshot.",
      instructionsBn: "ইসলামী ব্যাংকের যেকোনো শাখা, ইন্টারনেট ব্যাংকিং, সেলফিন বা বিএফটিএন/এনপিএসবির মাধ্যমে পাঠাতে পারেন। জমার স্লিপ সংরক্ষণ করুন।",
      active: true
    },
    {
      id: "bank-sonali",
      bankName: "Sonali Bank PLC",
      accountName: "BIJOY HOSSAIN",
      accountNumber: "4402102008765",
      branch: "Ramkrishnapur Sub-Branch, Homna",
      routingNo: "200192345",
      accountTypeEn: "Savings Account",
      accountTypeBn: "সঞ্চয়ী হিসাব",
      instructionsEn: "Direct deposit or Sonali eSheba app transfer accepted. Note down the transaction voucher reference.",
      instructionsBn: "সরাসরি রামকৃষ্ণপুর সাব-শাখা বা সোনালী ই-সেবা অ্যাপের মাধ্যমে জমা দেওয়া যাবে।",
      active: true
    }
  ],
  bkash: {
    provider: "bkash",
    number: "01883400808",
    accountTypeEn: "Personal / Agent Assistance",
    accountTypeBn: "পার্সোনাল / এজেন্ট সহায়তা",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=01883400808",
    instructionsEn: "Please send payment / cash-in to the bKash number above and keep your Transaction ID (TrxID) for confirmation.",
    instructionsBn: "উপরের বিকাশ নম্বরে সেন্ড মানি বা ক্যাশ-ইন করে ট্রানজেকশন আইডি (TrxID) সংরক্ষণ করুন এবং নিচের ফর্মে জমা দিন।",
    active: true
  },
  nagad: {
    provider: "nagad",
    number: "01883400808",
    accountTypeEn: "Personal Account",
    accountTypeBn: "পার্সোনাল একাউন্ট",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=01883400808",
    instructionsEn: "Send money to the above Nagad number. Keep your transaction reference or screenshot.",
    instructionsBn: "উপরোক্ত নগদ নম্বরে সেন্ড মানি করুন এবং সফল লেনদেনের ট্রানজেকশন আইডি সংরক্ষণ করুন।",
    active: true
  },
  customQrs: [
    {
      id: "qr-universal-bkash",
      provider: "bKash Official QR",
      accountNo: "01883400808",
      qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=bkash:01883400808",
      instructionsEn: "Open bKash App, tap 'Scan QR', scan this code, enter amount and your reference.",
      instructionsBn: "বিকাশ অ্যাপ ওপেন করে 'কিউআর স্ক্যান' অপশন দিয়ে সরাসরি স্ক্যান করে পেমেন্ট সম্পন্ন করুন।",
      active: true
    },
    {
      id: "qr-universal-nagad",
      provider: "Nagad Official QR",
      accountNo: "01883400808",
      qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=nagad:01883400808",
      instructionsEn: "Open Nagad App, tap 'Scan QR', point at this code, and confirm transaction.",
      instructionsBn: "নগদ অ্যাপ দিয়ে কিউআর কোড স্ক্যান করে দ্রুত টাকা পাঠান।",
      active: true
    }
  ]
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: "LEAD-101",
    date: "2026-09-18",
    customerName: "Mohammad Rafiqul Islam",
    phone: "01712345678",
    whatsapp: "01712345678",
    service: "Air Ticketing",
    destination: "Dhaka to Jeddah",
    travelDate: "2026-10-15",
    passengerCount: 2,
    passportStatus: "Valid",
    message: "Need 2 return tickets for Jeddah in October. Saudia or Biman preferred.",
    preferredContact: "WhatsApp",
    source: "Website Hero Form",
    status: "New",
    notes: "Customer contacted via website. Looking for direct flight."
  },
  {
    id: "LEAD-102",
    date: "2026-09-17",
    customerName: "Abdul Karim Mia",
    phone: "01823456789",
    whatsapp: "01823456789",
    service: "India Visa Assistance",
    destination: "Kolkata, India",
    travelDate: "2026-11-01",
    passengerCount: 1,
    passportStatus: "Valid",
    message: "Medical visa processing assistance needed for Christian Medical College Vellore.",
    preferredContact: "Phone Call",
    source: "India Visa Page",
    status: "Quotation Sent",
    notes: "Quotation for document organization & IVAC fee guidance sent."
  },
  {
    id: "LEAD-103",
    date: "2026-09-16",
    customerName: "Haji Nurul Alam",
    phone: "01934567890",
    whatsapp: "01934567890",
    service: "Umrah Package",
    destination: "Makkah & Madinah",
    travelDate: "2026-11-20",
    passengerCount: 4,
    passportStatus: "Valid",
    message: "Standard Umrah package for 4 family members. Looking for 3-star close hotel.",
    preferredContact: "WhatsApp",
    source: "Umrah Page",
    status: "Follow-up",
    notes: "Sent hotel pictures on WhatsApp, awaiting family decision."
  }
];

export const INITIAL_PAYMENT_SUBMISSIONS: PaymentSubmission[] = [
  {
    id: "PAY-201",
    customerName: "Mohammad Rafiqul Islam",
    phone: "01712345678",
    service: "Air Ticketing Booking Deposit",
    paymentMethod: "bKash",
    amount: "15000",
    transactionId: "BK9X840L1Q",
    paymentDate: "2026-09-18",
    status: "Pending Verification",
    notes: "Advance deposit for 2 flight tickets to Jeddah.",
    submittedAt: "2026-09-18 09:30 AM"
  },
  {
    id: "PAY-202",
    customerName: "Tareq Ahmed",
    phone: "01899112233",
    service: "India Visa Application Fee",
    paymentMethod: "Nagad",
    amount: "2500",
    transactionId: "NG782K19",
    paymentDate: "2026-09-17",
    status: "Verified",
    notes: "Verified in Nagad account statement.",
    submittedAt: "2026-09-17 04:15 PM"
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "admin-owner",
    name: "Bijoy Hossain (Owner)",
    email: "bijoy105671@gmail.com",
    role: "owner",
    permissions: {
      dashboard: true,
      leads: true,
      customers: true,
      services: true,
      visa: true,
      umrah: true,
      payments: true,
      bankAccounts: true,
      mobileWallets: true,
      qrCodes: true,
      paymentVerification: true,
      blog: true,
      faq: true,
      offers: true,
      websiteSettings: true,
      adminUsers: true,
      deleteData: true
    },
    active: true
  }
];

export const INITIAL_SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "off-1",
    titleEn: "Special Umrah Group Package for Next Month",
    titleBn: "পবিত্র ওমরাহ গ্রুপ প্যাকেজে বিশেষ সুবিধা",
    descEn: "Book in advance with your family and enjoy hassle-free direct flights and hotel stays near Haram.",
    descBn: "পরিবার নিয়ে এখনই অগ্রিম বুকিং করে মক্কার হারাম ও মদিনার মসজিদে নববীর সন্নিকটে সাশ্রয়ী প্যাকেজ নিশ্চিত করুন।",
    badgeEn: "Limited Seats",
    badgeBn: "সীমিত আসন",
    validUntil: "2026-12-31",
    whatsappMsg: "Hello Siam Air & Digital Service, I want to know about the Special Umrah Group Package offer.",
    active: true
  },
  {
    id: "off-2",
    titleEn: "Air Ticket Assistance for Middle East Expatriates",
    titleBn: "প্রবাসী ভাইদের জন্য বিশেষ টিকেট সহায়তা",
    descEn: "Assistance with Jeddah, Riyadh, Dammam, Dubai, Muscat, and Doha return tickets with proper baggage allowance.",
    descBn: "জেদ্দা, রিয়াদ, দাম্মাম, দুবাই ও দোহার টিকিট বুকিংয়ে বিশেষ ব্যাগেজ পরামর্শ ও তারিখ সমন্বয় সুবিধা।",
    badgeEn: "Popular",
    badgeBn: "জনপ্রিয় সেবা",
    validUntil: "2026-12-31",
    whatsappMsg: "Hello Siam Air & Digital Service, I need expatriate flight fare assistance.",
    active: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "india-visa-document-guidelines-bangladesh",
    titleEn: "Step-by-Step Guide for India Visa Application from Bangladesh",
    titleBn: "বাংলাদেশ থেকে ভারতীয় ভিসা আবেদনের সঠিক নিয়ম ও কাগজপত্র",
    categoryEn: "Visa Updates",
    categoryBn: "ভিসা তথ্য",
    date: "2026-09-10",
    readTimeEn: "4 min read",
    readTimeBn: "৪ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
    summaryEn: "Learn the exact photo specifications, bank solvency rules, and how to avoid common rejection mistakes when applying for an Indian tourist visa.",
    summaryBn: "ইন্ডিয়ান ট্যুরিস্ট ভিসা আবেদনের ক্ষেত্রে ছবির মাপ, বিদ্যুৎ বিল ও ব্যাংক স্টেটমেন্ট প্রস্তুতের গুরুত্বপূর্ণ গাইডলাইন।",
    contentEn: `Applying for an Indian visa from Bangladesh through IVAC centers requires meticulous documentation. 
1. **Photo Requirements**: Exactly 2 inches x 2 inches, white background, matte or glossy finish without glasses or shadows.
2. **Bank Statement**: Recent 6-month statement with at least BDT 20,000 balance or an international credit card / passport dollar endorsement.
3. **Utility Bill**: An updated electricity bill of the present address.
4. **Profession Proof**: NOC on official letterhead for employees, or translated and notarized trade license for business owners.
Avoid spelling discrepancies between passport and NID. Siam Air & Digital Service provides experienced document filing assistance to make sure your submission is neat and complete.`,
    contentBn: `বাংলাদেশ থেকে ভারতীয় ভিসা (IVAC) আবেদনের জন্য সঠিক কাগজপত্র প্রস্তুত করা অত্যন্ত জরুরি:
১. **ছবির সাইজ**: ২ ইঞ্চি বাই ২ ইঞ্চি, সাদা ব্যাকগ্রাউন্ড, মুখমন্ডল ৭০-৮০% স্পষ্ট ও ল্যাব প্রিন্ট।
২. **ব্যাংক স্টেটমেন্ট**: নূন্যতম ২০,০০০ টাকা ব্যালেন্স সহ ৬ মাসের স্টেটমেন্ট অথবা পাসপোর্টে ১৫০ ডলার এন্ডোর্সমেন্ট।
৩. **বিদ্যুৎ বিল**: বর্তমান বসবাসের ঠিকানার হালনাগাদ বিদ্যুৎ বিলের স্পষ্ট কপি।
৪. **পেশাগত সনদ**: চাকরিজীবীদের ক্ষেত্রে নো অবজেকশন সার্টিফিকেট (NOC) এবং ব্যবসায়ীদের জন্য ইংরেজি অনূদিত ট্রেড লাইসেন্স।
সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস আপনার আবেদনটি নির্ভুলভাবে পূরণ ও গুছিয়ে দিতে নির্ভরযোগ্য সহায়তা প্রদান করে।`
  },
  {
    id: "blog-2",
    slug: "essential-umrah-preparation-tips",
    titleEn: "Essential Umrah Preparation Checklist for Bangladeshi Pilgrims",
    titleBn: "বাংলাদেশি ওমরাহ যাত্রীদের জন্য প্রয়োজনীয় প্রস্তুতি ও পরামর্শ",
    categoryEn: "Umrah Guide",
    categoryBn: "ওমরাহ গাইড",
    date: "2026-09-05",
    readTimeEn: "5 min read",
    readTimeBn: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop",
    summaryEn: "A complete guide on spiritual and physical preparations for your blessed Umrah journey, packing tips, and hotel considerations.",
    summaryBn: "পবিত্র ওমরাহ পালনের মানসিক ও শারীরিক প্রস্তুতি, প্রয়োজনীয় ওষুধপত্র ও মোয়াল্লেম সহায়তার বিস্তারিত।",
    contentEn: `Performing Umrah is a lifelong dream for every Muslim. Proper preparation ensures peace of mind during worship.
- **Physical Fitness**: Walking practice before leaving Bangladesh helps endure the Tawaf and Sa'i.
- **Ihram & Essentials**: Carry at least 2 sets of Ihram cloth for men, comfortable walking sandals, unscented toiletries, and necessary prescription medications.
- **Documentation**: Keep passport photocopies, Umrah visa printout, and hotel address card handy at all times.
- **Guidance**: Our team provides an experienced Moallem to instruct each step with care.`,
    contentBn: `পবিত্র ওমরাহ পালন প্রতিটি মুসলমানের কাছে অন্তরের গভীর আকাঙ্ক্ষা। সুন্দর পরিকল্পনাই ইবাদতের একাগ্রতা নিশ্চিত করে:
- **শারীরিক প্রস্তুতি**: প্রতিদিন কিছুটা হাঁটার অভ্যাস করা উচিত, কারণ তাওয়াফ ও সাঈ করতে প্রচুর হাঁটার প্রয়োজন হয়।
- **ইহরামের কাপড় ও প্রয়োজনীয় জিনিস**: পুরুষদের জন্য নূন্যতম ২ সেট ইহরাম, আরামদায়ক জুতো, সুগন্ধিমুক্ত সাবান ও নিয়মিত প্রেসক্রিপশনের ওষুধ সঙ্গে নিন।
- **কাগজপত্র**: পাসপোর্ট, ওমরাহ ভিসার প্রিন্ট কপি ও মক্কা-মদিনা হোটেলের কার্ড সবসময় সাথে রাখা জরুরি।
- **মোয়াল্লেম সহায়তা**: সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিসের দক্ষ টিম সকল ধর্মীয় নিয়ম পালনে সহায়তা প্রদান করে।`
  },
  {
    id: "blog-3",
    slug: "thailand-tourist-visa-requirements-simplified",
    titleEn: "Thailand Tourist Visa for Bangladeshis: What You Need to Know",
    titleBn: "বাংলাদেশিদের জন্য থাইল্যান্ড ট্যুরিস্ট ভিসার নিয়ম ও খরচ",
    categoryEn: "Travel Tips",
    categoryBn: "ভ্রমণ টিপস",
    date: "2026-08-28",
    readTimeEn: "3 min read",
    readTimeBn: "৩ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=800&auto=format&fit=crop",
    summaryEn: "Detailed breakdown of bank solvency requirements, travel itinerary, and tips for first-time Thailand travelers from Bangladesh.",
    summaryBn: "থাইল্যান্ড ভ্রমণের জন্য ব্যাংক সলভেন্সি, ভিএফএস জমা নিয়ম ও সঠিক ডকুমেন্টস সাজানোর উপায়।",
    contentEn: `Thailand remains one of the top holiday destinations for Bangladeshi travelers.
The Royal Thai Embassy requires applicants to prove sufficient financial funds (minimum BDT 80,000 to 100,000 balance for an individual). 
Key documents include 6-month bank statement, bank solvency letter, verified hotel bookings, confirmed round-trip air tickets, and company NOC. 
Contact our desk in Homna for hands-on file preparation.`,
    contentBn: `ছুটি কাটাতে বাংলাদেশি পর্যটকদের প্রথম পছন্দ থাইল্যান্ড। 
থাই এম্বাসিতে আবেদনের জন্য অন্যতম গুরুত্বপূর্ণ শর্ত হলো আর্থিক স্বচ্ছলতার প্রমাণ (ব্যক্তি প্রতি ন্যূনতম ৮০,০০০ থেকে ১,০০,০০০ টাকা ব্যালেন্স)।
পাশাপাশি ৬ মাসের ব্যাংক স্টেটমেন্ট, ব্যাংক সলভেন্সি সার্টিফিকেট, কনফার্মড এয়ার টিকিট ও হোটেল বুকিং কপি প্রয়োজন। 
আমাদের রামকৃষ্ণপুর বাজারে অফিসে এসে সহজে ফাইল সাজিয়ে নিতে পারেন।`
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  // Air ticket
  {
    id: "faq-air-1",
    category: "air_ticket",
    questionEn: "How can I book a flight ticket or request a quotation?",
    questionBn: "আমি কীভাবে বিমান টিকেট বুক বা ভাড়ার কোটেশন জানতে পারি?",
    answerEn: "You can submit your travel details via our website form, call us directly at +8801883400808, or send a message on WhatsApp. We will compare multiple airline schedules and provide you with competitive flight options.",
    answerBn: "আপনি আমাদের ওয়েবসাইটের ফর্ম পূরণ করে, সরাসরি +8801883400808 নম্বরে ফোন করে অথবা হোয়াটসঅ্যাপে যাত্রার বিস্তারিত পাঠিয়ে টিকিটের সেরা মূল্য জানতে পারেন।"
  },
  {
    id: "faq-air-2",
    category: "air_ticket",
    questionEn: "Can you help with date changes or ticket reissue?",
    questionBn: "আপনারা কি যাত্রার তারিখ পরিবর্তন বা টিকেট রি-ইস্যুতে সাহায্য করতে পারেন?",
    answerEn: "Yes, we provide date change and reissue assistance for domestic and international tickets. Charges are subject strictly to the operating airline's fare rules, penalty, and seat availability.",
    answerBn: "হ্যাঁ, আমরা অভ্যন্তরীণ ও আন্তর্জাতিক উভয় টিকিটের তারিখ পরিবর্তন ও রি-ইস্যুতে সহায়তা করি। এর খরচ ও ফি সম্পূর্ণভাবে এয়ারলাইন্সের নিজস্ব নিয়মাবলীর উপর নির্ভর করে।"
  },
  {
    id: "faq-air-3",
    category: "air_ticket",
    questionEn: "Can you assist with ticket cancellations and refunds?",
    questionBn: "টিকেট বাতিল ও রিফান্ডের আবেদন করা যাবে কি?",
    answerEn: "Yes, we can apply for ticket refund on your behalf. The refundable amount and processing time are determined solely by the airline. Non-refundable tickets cannot be refunded.",
    answerBn: "হ্যাঁ, আমরা সংশ্লিষ্ট এয়ারলাইন্সে রিফান্ডের আবেদন জমা দিতে সহায়তা করি। রিফান্ডের অর্থ ও সময় এয়ারলাইন্সের সিদ্ধান্তের উপর নির্ভরশীল।"
  },
  {
    id: "faq-air-4",
    category: "air_ticket",
    questionEn: "Can I book family or group tickets together?",
    questionBn: "পরিবার বা বড় দলের জন্য একসাথে টিকেট কাটা সম্ভব?",
    answerEn: "Absolutely. We specialize in family group ticketing to ensure adjoining seats, coordinated baggage allowances, and convenient transit times for elderly and children.",
    answerBn: "অবশ্যই। পরিবার বা দলের জন্য একসাথে পাশাপাশি সিট ও সুবিধাজনক ব্যাগেজ সমন্বয় করে টিকেট বুকিংয়ে আমরা বিশেষ যত্ন নিই।"
  },

  // Visa
  {
    id: "faq-visa-1",
    category: "visa",
    questionEn: "Is visa approval guaranteed?",
    questionBn: "ভিসা কি ১০০% নিশ্চিত বা গ্যারান্টিযুক্ত?",
    answerEn: "No. Siam Air & Digital Service never makes misleading claims such as '100% Guaranteed Visa'. Visa approval, issuance, and entry decisions are solely at the legal discretion of the respective country's embassy and immigration authorities. We provide meticulous file preparation and professional assistance.",
    answerBn: "না। আমরা কোনো ভুয়া বা অবাস্তব '১০০% ভিসা গ্যারান্টি' দাবি করি না। ভিসা মঞ্জুরির ক্ষমতা সম্পূর্ণভাবে সংশ্লিষ্ট দেশের দূতাবাস ও ইমিগ্রেশন কর্তৃপক্ষের। আমরা নির্ভুল ফাইল প্রস্তুত ও প্রসেসিং সহায়তা প্রদান করি।"
  },
  {
    id: "faq-visa-2",
    category: "visa",
    questionEn: "What documents are generally required for visa processing?",
    questionBn: "ভিসা প্রসেসিংয়ের জন্য সাধারণত কী কী কাগজপত্র প্রয়োজন?",
    answerEn: "Generally, you need an original valid passport (at least 6 months validity), recent color lab photos as per country specs, 6-month bank statement with solvency, employment NOC or trade license, and national ID. Specific requirements depend on the destination country.",
    answerBn: "সাধারণত ৬ মাস মেয়াদী মূল পাসপোর্ট, নির্দিষ্ট সাইজের ল্যাব ছবি, ৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি, চাকরির এনওসি বা ব্যবসার ট্রেড লাইসেন্স এবং জাতীয় পরিচয়পত্র প্রয়োজন হয়।"
  },
  {
    id: "faq-visa-3",
    category: "visa",
    questionEn: "Can I check requirements with you before applying?",
    questionBn: "আবেদনের আগে কি আপনাদের সাথে প্রয়োজনীয় কাগজপত্র মিলিয়ে দেখা যাবে?",
    answerEn: "Yes! We encourage you to visit our Ramkrishnapur Bazar office or contact us on WhatsApp (+8801883400808) for a free document evaluation before submitting.",
    answerBn: "হ্যাঁ! আবেদনের পূর্বে আমাদের অফিসে সরাসরি এসে অথবা হোয়াটসঅ্যাপে কাগজপত্র যাচাই করিয়ে নিতে পারেন।"
  },

  // Umrah
  {
    id: "faq-umrah-1",
    category: "umrah",
    questionEn: "What is included in your Umrah packages?",
    questionBn: "আপনাদের ওমরাহ প্যাকেজে কী কী সেবা অন্তর্ভুক্ত থাকে?",
    answerEn: "Our packages typically include Umrah electronic visa processing, return flight tickets, hotel stay in Makkah and Madinah, AC ground transportation, historic holy Ziyarat, and religious guidance by an experienced Moallem.",
    answerBn: "আমাদের প্যাকেজে সাধারণত ওমরাহ ভিসা, বিমান টিকিট, মক্কা ও মদিনায় হোটেল, সম্পূর্ণ এসি ট্রান্সপোর্ট, ঐতিহাসিক স্থান জিয়ারাহ ও দক্ষ মোয়াল্লেমের সার্বিক তত্ত্বাবধান অন্তর্ভুক্ত থাকে।"
  },
  {
    id: "faq-umrah-2",
    category: "umrah",
    questionEn: "Can I customize the package according to my budget and preferred dates?",
    questionBn: "আমার বাজেট ও পছন্দের তারিখ অনুযায়ী কি প্যাকেজ পরিবর্তন করা সম্ভব?",
    answerEn: "Yes, we offer fully customized Umrah packages. You can choose the number of nights in Makkah and Madinah, hotel proximity to Haram, private transport (like GMC), and direct flight options.",
    answerBn: "হ্যাঁ, আপনার পছন্দমতো দিন সংখ্যা, হোটেলের ক্যাটাগরি, প্রাইভেট গাড়ি ও সরাসরি ফ্লাইটের সমন্বয়ে কাস্টমাইজড প্যাকেজ তৈরি করে দেওয়া হয়।"
  },
  {
    id: "faq-umrah-3",
    category: "umrah",
    questionEn: "Why are prices marked as 'Request Current Price'?",
    questionBn: "প্যাকেজের মূল্য স্থায়ী না রেখে 'বর্তমান মূল্য জানুন' কেন লেখা?",
    answerEn: "Umrah flight fares and hotel tariffs in Makkah and Madinah fluctuate significantly depending on the Islamic calendar (Ramadan, Rajab, peak seasons) and real-time flight availability. Requesting the current price ensures you receive the most accurate and best available fare.",
    answerBn: "ওমরাহ ফ্লাইটের ভাড়া এবং মক্কা-মদিনার হোটেলের রেট আরবি মাস (যেমন রমজান বা অন্যান্য মৌসুম) ও দিনভিত্তিক ওঠানামা করে। তাই আমরা সঠিক ও সেরা মূল্য প্রদানের জন্য তাৎক্ষণিক কোটেশন দিই।"
  },

  // General
  {
    id: "faq-gen-1",
    category: "general",
    questionEn: "Where is your office located?",
    questionBn: "আপনাদের অফিস কোথায় অবস্থিত?",
    answerEn: "Our office is located at Ramkrishnapur Bazar, Shutradhar Super Market, Homna, Cumilla, Bangladesh. We welcome local clients as well as visitors from Muradnagar, Chattogram, Dhaka, and all over the country.",
    answerBn: "আমাদের অফিস: রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা, বাংলাদেশ। হোমনা, মুরাদনগর, কুমিল্লা ও সারা দেশের গ্রাহকরা সাদরে আমন্ত্রিত।"
  },
  {
    id: "faq-gen-2",
    category: "general",
    questionEn: "What computer and digital services do you provide?",
    questionBn: "আপনারা কী কী কম্পিউটার ও ডিজিটাল সেবা প্রদান করেন?",
    answerEn: "We provide studio photo capture, photo editing, color & b/w photocopying, document scanning, laminating, online college/university admissions, NID corrections, birth registration assistance, passport forms, and general internet applications.",
    answerBn: "আমরা ছবি তোলা, ফটোকপি, স্ক্যানিং, লেমিনেটিং, একাদশ ও অনার্স ভর্তি আবেদন, এনআইডি ও জন্মনিবন্ধন সংশোধন আবেদন এবং সকল অনলাইন সেবা প্রদান করি।"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "AUD-001",
    adminName: "Bijoy Hossain (Owner)",
    role: "owner",
    action: "System Initialization",
    timestamp: "2026-09-18 10:00 AM",
    details: "Initialized Siam Air & Digital Service portal with bilingual configuration, services, and payment methods."
  }
];

export const PHOTO_PRESETS: PhotoPreset[] = [
  {
    id: "bd-passport",
    nameEn: "Bangladesh Passport & NID",
    nameBn: "বাংলাদেশ পাসপোর্ট ও এনআইডি",
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    aspectRatio: 35 / 45,
    category: "passport",
    descriptionEn: "35x45 mm with white/light background",
    descriptionBn: "৩৫×৪৫ মিমি, সাদা অথবা হালকা ব্যাকগ্রাউন্ড"
  },
  {
    id: "us-saudi-visa",
    nameEn: "US / Saudi / Schengen Visa (2x2 inch)",
    nameBn: "আমেরিকা / সৌদি / শেঞ্জেন ভিসা (২×২ ইঞ্চি)",
    widthMm: 50.8,
    heightMm: 50.8,
    widthPx: 600,
    heightPx: 600,
    aspectRatio: 1,
    category: "visa",
    descriptionEn: "2x2 inches (50x50 mm) square format, pure white background",
    descriptionBn: "২×২ ইঞ্চি (৫০×৫০ মিমি) বর্গাকার সাইজ, সম্পূর্ণ সাদা ব্যাকগ্রাউন্ড"
  },
  {
    id: "job-teletalk",
    nameEn: "Govt Job / Teletalk Photo (300x300)",
    nameBn: "সরকারি চাকরি / টেলিটক আবেদন (৩০০×৩০০)",
    widthMm: 25.4,
    heightMm: 25.4,
    widthPx: 300,
    heightPx: 300,
    aspectRatio: 1,
    category: "job",
    descriptionEn: "Exact 300x300 pixels, under 100 KB",
    descriptionBn: "সঠিক ৩০০×৩০০ পিক্সেল, সর্বোচ্চ ১০০ কেবি"
  },
  {
    id: "signature-std",
    nameEn: "Online Signature (300x100)",
    nameBn: "অনলাইন আবেদন স্বাক্ষর (৩০০×১০০)",
    widthMm: 25.4,
    heightMm: 8.5,
    widthPx: 300,
    heightPx: 100,
    aspectRatio: 3,
    category: "job",
    descriptionEn: "Standard 300x100 pixels signature, under 60 KB",
    descriptionBn: "স্ট্যান্ডার্ড ৩০০×১০০ পিক্সেল, সর্বোচ্চ ৬০ কেবি"
  },
  {
    id: "indian-visa",
    nameEn: "Indian Visa (2x2 inch)",
    nameBn: "ভারতীয় ভিসা (২×২ ইঞ্চি)",
    widthMm: 50.8,
    heightMm: 50.8,
    widthPx: 600,
    heightPx: 600,
    aspectRatio: 1,
    category: "visa",
    descriptionEn: "Square photo with 70-80% face coverage",
    descriptionBn: "বর্গাকার ছবি, ৭০-৮০% ফেস কাভারেজ"
  },
  {
    id: "stamp-size",
    nameEn: "Stamp Size Photo (20x25 mm)",
    nameBn: "স্ট্যাম্প সাইজ ছবি (২০×২৫ মিমি)",
    widthMm: 20,
    heightMm: 25,
    widthPx: 236,
    heightPx: 295,
    aspectRatio: 20 / 25,
    category: "passport",
    descriptionEn: "Mini stamp size for school/office documents",
    descriptionBn: "স্কুল, কলেজ ও প্রাতিষ্ঠানিক ডকুমেন্টের জন্য"
  }
];

export const PRINT_TEMPLATES: PrintTemplateItem[] = [
  {
    id: "tmpl-visiting-card",
    titleEn: "Standard Visiting Card / Business Card",
    titleBn: "স্ট্যান্ডার্ড ভিজিটিং কার্ড / বিজনেস কার্ড",
    category: "visiting_card",
    dimensions: "3.5 x 2.0 inch (88.9 x 50.8 mm)",
    descriptionEn: "Double-sided or single-sided premium visiting card with custom QR",
    descriptionBn: "প্রিমিয়াম ভিজিটিং কার্ড, লোগো, কিউআর কোড ও সম্পূর্ণ কালার প্রিন্ট",
    previewBg: "from-blue-900 via-indigo-900 to-slate-950",
    fields: [
      { key: "business_name", labelEn: "Business Name", labelBn: "প্রতিষ্ঠানের নাম", defaultValue: "Siam Air & Digital Service" },
      { key: "proprietor", labelEn: "Proprietor Name", labelBn: "প্রোপাইটর", defaultValue: "Bijoy Hossain" },
      { key: "services", labelEn: "Key Services", labelBn: "প্রধান সেবাসমূহ", defaultValue: "Air Ticket | Visa | Umrah | Photo & Print" },
      { key: "mobile", labelEn: "Mobile / WhatsApp", labelBn: "মোবাইল ও হোয়াটসঅ্যাপ", defaultValue: "+8801883400808" },
      { key: "address", labelEn: "Address", labelBn: "ঠিকানা", defaultValue: "Ramkrishnapur Bazar, Homna, Cumilla" }
    ]
  },
  {
    id: "tmpl-shop-banner",
    titleEn: "Shop Counter Banner / Flex",
    titleBn: "দোকানের কাউন্টার ব্যানার / ফেস্টুন",
    category: "banner",
    dimensions: "6 x 3 feet (180 x 90 cm)",
    descriptionEn: "Vibrant high-contrast shop signage and promotional vinyl banner",
    descriptionBn: "উচ্চমানের স্পষ্ট ব্যানার ও সাইনবোর্ড ডিজাইন",
    previewBg: "from-emerald-800 via-teal-900 to-slate-900",
    fields: [
      { key: "headline", labelEn: "Headline", labelBn: "শিরোনাম", defaultValue: "সিয়াম এয়ার অ্যান্ড ডিজিটাল সার্ভিস + প্রজাপতি প্রিন্ট মিডিয়া" },
      { key: "subheading", labelEn: "Tagline", labelBn: "স্লোগান", defaultValue: "বিমান টিকিট, ভিসা প্রসেসিং, ওমরাহ ও সকল অনলাইন ডিজিটাল সেবা" },
      { key: "features", labelEn: "Highlighted Features", labelBn: "বিশেষ সুবিধাসমূহ", defaultValue: "দ্রুত পাসপোর্ট ছবি | ইনস্ট্যান্ট ডকুমেন্ট প্রিন্ট | সুলভ বিমান ভাড়া" },
      { key: "mobile", labelEn: "Hotline", labelBn: "হটলাইন", defaultValue: "01883400808" },
      { key: "address", labelEn: "Location", labelBn: "ঠিকানা", defaultValue: "রামকৃষ্ণপুর বাজার, সূত্রধর সুপার মার্কেট, হোমনা, কুমিল্লা" }
    ]
  },
  {
    id: "tmpl-cash-memo",
    titleEn: "Money Receipt & Cash Memo",
    titleBn: "টাকা জমার মানি রিসিট ও ক্যাশ মেমো",
    category: "memo",
    dimensions: "A5 (5.8 x 8.3 inch)",
    descriptionEn: "Official branded payment voucher and invoice memo",
    descriptionBn: "অফিসিয়াল পেমেন্ট ভাউচার, টিকিট বুকিং রশিদ ও মানি রিসিট",
    previewBg: "from-slate-800 to-slate-950",
    fields: [
      { key: "memo_title", labelEn: "Receipt Title", labelBn: "রশিদের শিরোনাম", defaultValue: "পেমেন্ট ভাউচার / মানি রিসিট" },
      { key: "customer_name", labelEn: "Customer Name", labelBn: "গ্রাহকের নাম", defaultValue: "মোহাম্মদ রফিকুল ইসলাম" },
      { key: "service_name", labelEn: "Service Description", labelBn: "সেবার বিবরণ", defaultValue: "কুয়েত এয়ারওয়েজ টিকিট বুকিং অ্যাডভান্স" },
      { key: "amount", labelEn: "Amount (BDT)", labelBn: "টাকার পরিমাণ", defaultValue: "৳ ৪৫,০০০" },
      { key: "contact", labelEn: "Helpline", labelBn: "হেল্পলাইন", defaultValue: "01883400808" }
    ]
  }
];

export const INITIAL_STUDIO_ORDERS: StudioOrder[] = [
  {
    id: "SA-2026-000101",
    customerName: "মোহাম্মদ ফারুক আহমেদ",
    phone: "01812345678",
    serviceType: "পাসপোর্ট সাইজ ছবি (Passport Photo)",
    requiredSize: "35x45 mm (BD Passport)",
    copies: 8,
    notes: "সাদা ব্যাকগ্রাউন্ড করে দিতে হবে, পাসপোর্ট রিনিউ এর জন্য জরুরি।",
    urgent: true,
    deliveryPref: "counter_pickup",
    files: [
      {
        id: "file-001",
        fileName: "customer_photo_faruk.jpg",
        fileType: "image/jpeg",
        fileSizeKb: 420,
        dataUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
      }
    ],
    status: "Ready",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    price: 120,
    paymentStatus: "Paid",
    staffNotes: "প্রিন্ট সম্পন্ন হয়েছে। কাউন্টারে প্যাকেট তৈরি আছে।"
  },
  {
    id: "SA-2026-000102",
    customerName: "ফাতেমা আক্তার",
    phone: "01723456789",
    serviceType: "চাকরির আবেদন ছবি ও স্বাক্ষর (Photo & Signature)",
    requiredSize: "300x300 px (Photo) & 300x100 px (Sign)",
    copies: 1,
    notes: "টেলিটক সরকারি চাকরির ফর্মের জন্য স্বাক্ষর ৬০ KB এবং ছবি ১০০ KB এর নিচে লাগবে।",
    urgent: false,
    deliveryPref: "digital_download",
    files: [
      {
        id: "file-002",
        fileName: "fatema_job_photo.jpg",
        fileType: "image/jpeg",
        fileSizeKb: 310,
        dataUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
      }
    ],
    status: "Processing",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    price: 80,
    paymentStatus: "Unpaid",
    staffNotes: "ব্যাকগ্রাউন্ড ক্লিন করা হচ্ছে।"
  },
  {
    id: "SA-2026-000103",
    customerName: "কামাল হোসেন",
    phone: "01934567890",
    serviceType: "ডকুমেন্ট ও সার্টিফিকেট কালার প্রিন্ট",
    requiredSize: "A4 Size Paper (100 GSM)",
    copies: 4,
    notes: "সকল সার্টিফিকেট স্পষ্ট কালার কপি লাগবে।",
    urgent: false,
    deliveryPref: "counter_pickup",
    files: [
      {
        id: "file-003",
        fileName: "academic_certificate.pdf",
        fileType: "application/pdf",
        fileSizeKb: 1450,
        dataUrl: "https://images.unsplash.com/photo-1589330694653-dad6bc0140ce?q=80&w=600&auto=format&fit=crop"
      }
    ],
    status: "New",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    price: 100,
    paymentStatus: "Unpaid"
  }
];

