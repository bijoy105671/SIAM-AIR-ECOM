import React, { useState } from 'react';
import { Plane, Hotel, ShieldCheck, Send, FileText, Clock, BadgeCheck } from 'lucide-react';

const API = String((import.meta as any).env?.VITE_ACCOUNTING_API_URL || 'https://siam-air-digital-service.onrender.com').replace(/\/$/, '');
type Mode = 'flight' | 'hotel';
const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500';
const labelClass = 'mb-1.5 block text-xs font-bold text-slate-700';

export default function FlightQuotePage() {
  const [mode, setMode] = useState<Mode>('flight');
  const [tripType, setTripType] = useState('oneway');
  const [from, setFrom] = useState(() => new URLSearchParams(window.location.search).get('from') || 'Dhaka (DAC)');
  const [to, setTo] = useState(() => new URLSearchParams(window.location.search).get('to') || '');
  const [depart, setDepart] = useState(() => new URLSearchParams(window.location.search).get('date') || '');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(() => new URLSearchParams(window.location.search).get('adults') || '1');
  const [children, setChildren] = useState('0');
  const [cabin, setCabin] = useState('Economy');
  const [airline, setAirline] = useState('Any available airline');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState('1');
  const [guests, setGuests] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [documentType, setDocumentType] = useState('passport');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'flight' && !documentFile) {
      setError('আন্তর্জাতিক ফ্লাইটের জন্য পাসপোর্ট কপি নির্বাচন করুন।');
      return;
    }
    setBusy(true);
    try {
      let document: { name: string; mime: string; base64: string } | null = null;
      if (documentFile) {
        if (documentFile.size > 5 * 1024 * 1024) throw new Error('ডকুমেন্ট সর্বোচ্চ ৫ MB হতে পারবে।');
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(documentFile.type)) throw new Error('শুধু PDF, JPG বা PNG ফাইল দিন।');
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(new Error('ডকুমেন্ট পড়া যায়নি। আবার চেষ্টা করুন।'));
          reader.onload = () => resolve(String(reader.result || '').split(',')[1] || '');
          reader.readAsDataURL(documentFile);
        });
        document = { name: documentFile.name, mime: documentFile.type, base64 };
      }
      const details = mode === 'flight'
        ? { tripType, from, to, depart, returnDate, adults: Number(adults), children: Number(children), cabin, preferredAirline: airline, pricingStatus: 'QUOTE_PENDING', notes }
        : { destination: to, checkIn, checkOut, rooms: Number(rooms), guests: Number(guests), pricingStatus: 'QUOTE_PENDING', notes };
      const body = { serviceType: mode, customerName: name.trim(), email: email.trim(), phone: phone.trim(), whatsapp: whatsapp.trim(), details, documentType, document };
      const response = await fetch(API + '/api/storefront/flight-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Booking request service is not available yet. Please contact SIAM AIR by phone or WhatsApp.');
      setReference(String(result.reference || result.request?.reference || result.id || 'Submitted'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'অনুরোধ জমা দেওয়া যায়নি। ফোন/WhatsApp-এ যোগাযোগ করুন।');
    } finally {
      setBusy(false);
    }
  };

  if (reference) return <main className="min-h-[70vh] bg-slate-50 px-4 py-12"><section className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm"><BadgeCheck className="mx-auto h-14 w-14 text-emerald-600"/><h1 className="mt-4 text-2xl font-black text-slate-900">Request received</h1><p className="mt-2 text-slate-600">Reference: <b>{reference}</b></p><p className="mt-2 text-sm text-slate-500">এটি এখনো টিকিট/হোটেল বুকিং নিশ্চিতকরণ নয়। Admin ভাড়া, availability ও ডকুমেন্ট যাচাই করে আপনাকে যোগাযোগ করবে।</p><button onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">New request</button></section></main>;

  return <main className="min-h-[70vh] bg-slate-50 py-8 sm:py-12">
    <section className="mx-auto max-w-6xl px-4">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-sky-900 p-6 text-white sm:p-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-200"><Plane className="h-4 w-4"/> SIAM AIR · Travel Desk</div>
        <h1 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Find your trip. Request your best quote.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">No fake live fares or seat availability. Submit your trip details and our team will verify current supplier fares and send you a confirmed quotation.</p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-2"><ShieldCheck className="mr-1 inline h-4 w-4"/> Admin-verified quote</span><span className="rounded-full border border-white/20 bg-white/10 px-3 py-2"><Clock className="mr-1 inline h-4 w-4"/> Booking confirmed after payment verification</span></div>
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex gap-2 rounded-2xl bg-slate-100 p-1">
          <button type="button" onClick={() => setMode('flight')} className={'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-black ' + (mode === 'flight' ? 'bg-sky-700 text-white shadow' : 'text-slate-600')}><Plane className="h-4 w-4"/> Flights</button>
          <button type="button" onClick={() => setMode('hotel')} className={'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-black ' + (mode === 'hotel' ? 'bg-sky-700 text-white shadow' : 'text-slate-600')}><Hotel className="h-4 w-4"/> Hotels</button>
        </div>
        <form onSubmit={submit} className="space-y-6">
          {mode === 'flight' ? <>
            <div className="flex flex-wrap gap-2">{[['oneway','One way'],['round','Round trip'],['multicity','Multi-city']].map(([v,t])=><button key={v} type="button" onClick={()=>setTripType(v)} className={'rounded-full px-4 py-2 text-xs font-bold '+(tripType===v?'bg-slate-950 text-white':'bg-slate-100 text-slate-700')}>{t}</button>)}</div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label className={labelClass}>From airport / city *</label><input className={inputClass} required value={from} onChange={e=>setFrom(e.target.value)} placeholder="Dhaka (DAC)"/></div><div><label className={labelClass}>Destination *</label><input className={inputClass} required value={to} onChange={e=>setTo(e.target.value)} placeholder="Jeddah (JED), London (LHR)…"/></div><div><label className={labelClass}>Departure date *</label><input type="date" className={inputClass} required min={new Date().toISOString().slice(0,10)} value={depart} onChange={e=>setDepart(e.target.value)}/></div>{tripType!=='oneway'&&<div><label className={labelClass}>Return date {tripType==='round'?'*':''}</label><input type="date" className={inputClass} required={tripType==='round'} min={depart||new Date().toISOString().slice(0,10)} value={returnDate} onChange={e=>setReturnDate(e.target.value)}/></div>}<div><label className={labelClass}>Adults (12+)</label><select className={inputClass} value={adults} onChange={e=>setAdults(e.target.value)}>{[1,2,3,4,5,6,7,8,9].map(n=><option key={n}>{n}</option>)}</select></div><div><label className={labelClass}>Children</label><select className={inputClass} value={children} onChange={e=>setChildren(e.target.value)}>{[0,1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div><div><label className={labelClass}>Cabin class</label><select className={inputClass} value={cabin} onChange={e=>setCabin(e.target.value)}>{['Economy','Premium Economy','Business','First'].map(x=><option key={x}>{x}</option>)}</select></div><div><label className={labelClass}>Preferred carrier</label><select className={inputClass} value={airline} onChange={e=>setAirline(e.target.value)}>{['Any available airline','Legacy Carrier','Biman Bangladesh Airlines','US-Bangla Airlines','Air Arabia','Saudia','Qatar Airways','Emirates','Other / specify in notes'].map(x=><option key={x}>{x}</option>)}</select></div></div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950"><b>Legacy Carrier commission rule:</b> 7% commission is calculated only for a verified Legacy Carrier fare. Other airlines do not receive this automatic 7% calculation. Final quote depends on the verified fare and applicable rules.</div>
          </> : <div className="grid gap-4 sm:grid-cols-2"><div><label className={labelClass}>Destination / city *</label><input className={inputClass} required value={to} onChange={e=>setTo(e.target.value)} placeholder="Kuala Lumpur, Cox's Bazar…"/></div><div><label className={labelClass}>Check-in *</label><input type="date" className={inputClass} required value={checkIn} onChange={e=>setCheckIn(e.target.value)}/></div><div><label className={labelClass}>Check-out *</label><input type="date" className={inputClass} required value={checkOut} onChange={e=>setCheckOut(e.target.value)}/></div><div><label className={labelClass}>Rooms</label><select className={inputClass} value={rooms} onChange={e=>setRooms(e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div><div><label className={labelClass}>Guests</label><select className={inputClass} value={guests} onChange={e=>setGuests(e.target.value)}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(n=><option key={n}>{n}</option>)}</select></div></div>}
          <div className="border-t border-slate-100 pt-5"><h2 className="mb-4 text-lg font-black text-slate-900">Your contact details</h2><div className="grid gap-4 sm:grid-cols-2"><div><label className={labelClass}>Full name *</label><input className={inputClass} required value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></div><div><label className={labelClass}>Email address *</label><input type="email" className={inputClass} required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></div><div><label className={labelClass}>Phone number *</label><input type="tel" className={inputClass} required value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel"/></div><div><label className={labelClass}>WhatsApp (optional)</label><input type="tel" className={inputClass} value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="If different from phone"/></div></div></div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><label className={labelClass}>Travel document type</label><select className={inputClass} value={documentType} onChange={e=>setDocumentType(e.target.value)}><option value="passport">Passport copy (international flight)</option><option value="visa">Visa copy</option><option value="national_id">National ID / other ID (where applicable)</option></select><label className={labelClass+' mt-4'}>Upload document {mode==='flight'?'(required for international flight)':'(optional at quote stage)'}</label><input className={inputClass} type="file" accept=".pdf,.jpg,.jpeg,.png" required={mode==='flight'} onChange={e=>setDocumentFile(e.target.files?.[0]||null)}/><p className="mt-2 text-xs leading-5 text-amber-900">Passport and visa files contain sensitive personal information. Submit only through the secure upload service; files must not be stored in browser storage or the public website.</p></div>
          <div><label className={labelClass}>Additional request / preferred airline / hotel needs</label><textarea className={inputClass+' min-h-24'} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Transit preference, baggage, room type, meal, child ages…"/></div>
          {error&&<div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</div>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white hover:bg-sky-800 disabled:opacity-60"><Send className="h-4 w-4"/>{busy?'Submitting…':'Submit quote request'}</button>
          <p className="text-center text-xs text-slate-500">Submitting a request does not create a booking or charge a payment. Availability, fare and payment will be confirmed by SIAM AIR staff.</p>
        </form>
      </div>
    </section>
  </main>;
}
