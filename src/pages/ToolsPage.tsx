import React,{useMemo,useState} from 'react';
import {Calculator,Plane,Upload,RefreshCw,RotateCcw,ArrowRight,CheckCircle,Ticket,Search} from 'lucide-react';

const money=(n:number)=>`৳ ${n.toLocaleString('en-BD',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const num=(v:string)=>Number.parseFloat(v)||0;

const AIRLINES:Record<string,string>={
 'G9':'Air Arabia','BS':'US-Bangla Airlines','BG':'Biman Bangladesh Airlines','EK':'Emirates','QR':'Qatar Airways',
 'SV':'Saudia','OV':'SalamAir','WY':'Oman Air','GF':'Gulf Air','KU':'Kuwait Airways','MH':'Malaysia Airlines',
 '6E':'IndiGo','AI':'Air India','IX':'Air India Express','FZ':'Flydubai','EY':'Etihad Airways','TK':'Turkish Airlines'
};
const logo=(code:string)=>code?\`https://images.kiwi.com/airlines/64/\${code.toUpperCase()}.png\`:''; 

function FareCalculator(){
 const [mode,setMode]=useState<'net'|'reissue'|'refund'>('net'); const [v,setV]=useState<Record<string,string>>({});
 const set=(k:string,x:string)=>setV(p=>({...p,[k]:x})); const n=(k:string)=>num(v[k]||'');
 let result=0,label='NET FARE';
 if(mode==='net') result=n('gross')-n('base')*.07+n('gross')*.003;
 if(mode==='reissue'){const d=(n('newBase')-n('oldBase'))+(n('newTax')-n('oldTax'))+n('penalty');result=d+d*.003;label='REISSUE CHARGE';}
 if(mode==='refund'){result=n('net')-n('refundPenalty')-n('otherTax')-n('net')*.003;label='FULL REFUND';}
 const Field=({k,label}:{k:string;label:string})=><label className="block"><span className="text-xs font-bold text-slate-600">{label}</span><input type="number" value={v[k]||''} onChange={e=>set(k,e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 font-semibold outline-none focus:border-teal-500" placeholder="0"/></label>;
 return <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-7">
  <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-black">Net Fare Calculator</h2><p className="text-xs text-slate-500 mt-1">Fast SIAM AIR fare, reissue and refund calculations.</p></div><Calculator className="text-teal-600"/></div>
  <div className="grid grid-cols-3 gap-2 bg-slate-100 rounded-2xl p-1 mt-5">{[['net','NET FARE'],['reissue','REISSUE'],['refund','REFUND']].map(([k,l])=><button key={k} onClick={()=>{setMode(k as any);setV({})}} className={`rounded-xl py-3 text-xs font-black ${mode===k?'bg-white text-teal-700 shadow-sm':'text-slate-500'}`}>{l}</button>)}</div>
  <div className="grid sm:grid-cols-2 gap-3 mt-5">
   {mode==='net'&&<><Field k="gross" label="Gross Fare"/><Field k="base" label="Base Fare"/></>}
   {mode==='reissue'&&<><Field k="oldBase" label="Old Base Fare"/><Field k="oldTax" label="Old Tax"/><Field k="newBase" label="New Base Fare"/><Field k="newTax" label="New Tax"/><Field k="penalty" label="Penalty / Change Charge"/></>}
   {mode==='refund'&&<><Field k="net" label="Net Fare"/><Field k="refundPenalty" label="Penalty"/><Field k="otherTax" label="Other Non-refundable Tax"/></>}
  </div>
  <div className="mt-5 rounded-2xl bg-slate-950 text-white p-5"><div className="text-xs text-slate-400">{label}</div><div className="text-3xl font-black mt-1">{money(result)}</div></div>
  <button onClick={()=>setV({})} className="mt-3 w-full rounded-xl bg-slate-100 py-3 text-xs font-black text-slate-700 flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4"/> Clear</button>
 </section>
}

function PnrWorkspace(){
 const [airline,setAirline]=useState('G9'); const [pnr,setPnr]=useState(''); const [passenger,setPassenger]=useState(''); const [from,setFrom]=useState('DAC'); const [to,setTo]=useState('JED'); const [flight,setFlight]=useState(''); const [date,setDate]=useState(''); const [file,setFile]=useState<File|null>(null);
 const airlineName=AIRLINES[airline]||airline;
 return <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 sm:p-7">
  <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-black">PNR & Ticket Workspace</h2><p className="text-xs text-slate-500 mt-1">Create a clean booking record and prepare ticket information.</p></div><Ticket className="text-teal-600"/></div>
  <div className="grid md:grid-cols-2 gap-4 mt-5">
   <label><span className="text-xs font-bold">Airline Code</span><input value={airline} onChange={e=>setAirline(e.target.value.toUpperCase())} className="mt-1 w-full rounded-xl border px-3 py-3 font-bold"/></label>
   <div className="rounded-xl bg-slate-50 border p-3 flex items-center gap-3"><img src={logo(airline)} className="w-10 h-10 object-contain" onError={e=>(e.currentTarget.style.display='none')}/><div><b>{airlineName}</b><div className="text-xs text-slate-500">Automatic airline logo</div></div></div>
   <label><span className="text-xs font-bold">PNR</span><input maxLength={8} value={pnr} onChange={e=>setPnr(e.target.value.toUpperCase())} className="mt-1 w-full rounded-xl border px-3 py-3 font-mono font-black"/></label>
   <label><span className="text-xs font-bold">Passenger Name</span><input value={passenger} onChange={e=>setPassenger(e.target.value.toUpperCase())} className="mt-1 w-full rounded-xl border px-3 py-3"/></label>
   <label><span className="text-xs font-bold">Route</span><div className="grid grid-cols-2 gap-2 mt-1"><input value={from} onChange={e=>setFrom(e.target.value.toUpperCase())} className="rounded-xl border px-3 py-3 font-bold" placeholder="DAC"/><input value={to} onChange={e=>setTo(e.target.value.toUpperCase())} className="rounded-xl border px-3 py-3 font-bold" placeholder="JED"/></div></label>
   <label><span className="text-xs font-bold">Flight / Date</span><div className="grid grid-cols-2 gap-2 mt-1"><input value={flight} onChange={e=>setFlight(e.target.value.toUpperCase())} className="rounded-xl border px-3 py-3 font-bold" placeholder="G9 501"/><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="rounded-xl border px-3 py-3"/></div></label>
  </div>
  <label className="mt-4 block rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center cursor-pointer"><Upload className="w-6 h-6 mx-auto text-teal-600"/><span className="block mt-2 text-sm font-black">{file?file.name:'Upload ticket PDF'}</span><span className="block text-xs text-slate-500 mt-1">Keep the original PDF available for ticket preparation.</span><input type="file" accept=".pdf,application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="hidden"/></label>
  <div className="mt-5 rounded-2xl bg-slate-950 text-white p-5"><div className="text-xs text-slate-400">BOOKING PREVIEW</div><div className="text-lg font-black mt-1">{airlineName} · {pnr||'PNR'} · {from} → {to}</div><div className="text-sm text-slate-300 mt-1">{passenger||'Passenger'} · {flight||'Flight'} · {date||'Travel date'}</div></div>
 </section>
}

export default function ToolsPage(){
 const [tab,setTab]=useState<'fare'|'pnr'>('fare');
 return <main className="min-h-[70vh] bg-slate-50 py-8 sm:py-12"><div className="max-w-5xl mx-auto px-4">
  <div className="rounded-[2rem] bg-gradient-to-br from-teal-900 via-slate-900 to-red-950 text-white p-6 sm:p-10 shadow-xl"><div className="text-xs font-black uppercase tracking-[.2em] text-teal-300">SIAM AIR PRO TOOLS</div><h1 className="text-3xl sm:text-5xl font-black mt-3">Ticketing tools, now in one place.</h1><p className="text-slate-300 mt-3 max-w-2xl">PNR workspace and net fare tools are moving to the online travel-service portal so the accounting dashboard stays focused on accounts.</p></div>
  <div className="grid grid-cols-2 gap-2 bg-white border rounded-2xl p-1 mt-5"><button onClick={()=>setTab('fare')} className={`rounded-xl py-3 font-black text-sm ${tab==='fare'?'bg-slate-950 text-white':'text-slate-600'}`}><Calculator className="inline w-4 h-4 mr-2"/>Net Fare</button><button onClick={()=>setTab('pnr')} className={`rounded-xl py-3 font-black text-sm ${tab==='pnr'?'bg-slate-950 text-white':'text-slate-600'}`}><Plane className="inline w-4 h-4 mr-2"/>PNR & Ticket</button></div>
  <div className="mt-5">{tab==='fare'?<FareCalculator/>:<PnrWorkspace/>}</div>
 </div></main>
}