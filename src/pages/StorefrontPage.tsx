import React,{useMemo,useState} from 'react';
import {ArrowRight,ChevronRight,Minus,Package,Plus,Search,ShoppingCart,Star,Trash2,Truck,Zap} from 'lucide-react';
import {useStore,Product} from '../context/StoreContext';

type Props={navigate:(p:string)=>void;mode:'home'|'shop'|'cart'|'checkout'};

function ProductCard({p,navigate}:{p:Product;navigate:(p:string)=>void}){
 const {addToCart}=useStore();
 const soldOut=false;
 const add=()=>{addToCart(p);navigate('/cart')};
 return <article className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
   {p.image_url?<img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>:<div className="w-full h-full grid place-items-center text-slate-300"><Package className="w-14 h-14"/></div>}
   {p.featured&&<span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">FEATURED</span>}
   {false&&<span className="absolute top-3 right-3 bg-white text-rose-600 text-[10px] font-black px-2 py-1 rounded-full">Only {p.stock} left</span>}
  </div>
  <div className="p-4">
   <div className="text-[10px] font-black uppercase tracking-widest text-teal-700">{p.category||'Service'}</div>
   <h3 className="font-black mt-1 line-clamp-2">{p.name}</h3>
   <p className="text-xs text-slate-500 mt-1 line-clamp-2 min-h-8">{p.description||'SIAM AIR & DIGITAL SERVICE'}</p>
   <div className="flex items-end justify-between gap-2 mt-4">
    <div><div className="text-xl font-black">৳{Number(p.price).toLocaleString()}</div>{p.compare_price&&<div className="text-xs text-slate-400 line-through">৳{Number(p.compare_price).toLocaleString()}</div>}</div>
    <button disabled={soldOut} onClick={add} className="px-3 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-black disabled:opacity-40">Order Service</button>
   </div>
  </div>
 </article>;
}

function CartPage({navigate}:{navigate:(p:string)=>void}){
 const {cart,removeFromCart,setQty,customer,settings}=useStore();
 const subtotal=cart.reduce((n,i)=>n+Number(i.product.price)*i.quantity,0);
 const delivery=subtotal>=Number(settings.freeDeliveryMinimum||0)?0:Number(settings.deliveryFee||0);
 const total=subtotal+delivery;
 return <main className="min-h-screen bg-slate-50 py-8"><div className="max-w-6xl mx-auto px-4">
  <button onClick={()=>navigate('/shop')} className="text-sm font-bold text-slate-500 mb-5">← Continue shopping</button>
  <div className="grid lg:grid-cols-[1fr_380px] gap-5">
   <section className="bg-white rounded-3xl border p-5"><h1 className="text-2xl font-black">Your Cart</h1>
    {cart.length===0?<div className="py-20 text-center text-slate-400">Your cart is empty.</div>:<div className="divide-y">{cart.map(i=><div key={i.product.id} className="py-4 flex gap-3">
     <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">{i.product.image_url&&<img src={i.product.image_url} className="w-full h-full object-cover"/>}</div>
     <div className="flex-1"><b>{i.product.name}</b><div className="text-sm text-slate-500">৳{Number(i.product.price).toLocaleString()}</div>
      <div className="flex items-center gap-2 mt-2"><button onClick={()=>setQty(i.product.id,i.quantity-1)} className="p-1.5 rounded-lg bg-slate-100"><Minus className="w-4 h-4"/></button><span className="w-8 text-center font-black">{i.quantity}</span><button onClick={()=>setQty(i.product.id,i.quantity+1)} className="p-1.5 rounded-lg bg-slate-100"><Plus className="w-4 h-4"/></button><button onClick={()=>removeFromCart(i.product.id)} className="ml-2 p-1.5 text-rose-600"><Trash2 className="w-4 h-4"/></button></div>
     </div><b>৳{(Number(i.product.price)*i.quantity).toLocaleString()}</b>
    </div>)}</div>}
   </section>
   <aside className="bg-white rounded-3xl border p-5 h-fit"><h2 className="font-black text-lg">Service Order Summary</h2><div className="flex justify-between mt-5 text-sm"><span>Subtotal</span><b>৳{subtotal.toLocaleString()}</b></div><div className="flex justify-between mt-2 text-sm"><span>Delivery</span><b>{delivery?'৳'+delivery:'FREE'}</b></div><div className="border-t mt-4 pt-4 flex justify-between text-lg"><b>Total</b><b>৳{total.toLocaleString()}</b></div><button disabled={!cart.length} onClick={()=>navigate(customer?'/checkout':'/account?next=/checkout')} className="w-full mt-5 py-3.5 rounded-2xl bg-teal-700 text-white font-black disabled:opacity-40">{customer?'Checkout':'Sign in to checkout'}</button></aside>
  </div>
 </div></main>;
}

function CheckoutPage({navigate}:{navigate:(p:string)=>void}){
 const {cart,customer,settings,checkout,notice}=useStore();
 const [address,setAddress]=useState(customer?.address||'');const [city,setCity]=useState(customer?.city||'');const [payment,setPayment]=useState('cod');const [note,setNote]=useState('');
 const subtotal=cart.reduce((n,i)=>n+Number(i.product.price)*i.quantity,0);const delivery=subtotal>=Number(settings.freeDeliveryMinimum||0)?0:Number(settings.deliveryFee||0);const total=subtotal+delivery;
 const place=async()=>{try{const o=await checkout({address,city,paymentMethod:payment,note});notice('Order '+o.order_number+' received');navigate('/account')}catch(e){alert((e as Error).message)}};
 if(!customer)return <main className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-2xl font-black">Sign in required</h1><button onClick={()=>navigate('/account?next=/checkout')} className="mt-4 px-5 py-3 rounded-xl bg-slate-950 text-white font-bold">Sign In</button></div></main>;
 return <main className="min-h-screen bg-slate-50 py-8"><div className="max-w-5xl mx-auto px-4"><h1 className="text-3xl font-black">Checkout</h1><p className="text-slate-500 mt-1">Order as {customer.name}</p><div className="grid lg:grid-cols-[1fr_360px] gap-5 mt-6">
  <section className="bg-white rounded-3xl border p-5 space-y-4"><h2 className="font-black text-lg">Delivery & Payment</h2><input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Full delivery address" className="w-full rounded-xl border px-4 py-3"/><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City / Area" className="w-full rounded-xl border px-4 py-3"/>
   <select value={payment} onChange={e=>setPayment(e.target.value)} className="w-full rounded-xl border px-4 py-3"><option value="cod">Cash on Delivery</option>{settings.bkashEnabled&&<option value="bkash">bKash</option>}{settings.nagadEnabled&&<option value="nagad">Nagad</option>}{settings.bankEnabled&&<option value="bank">Bank Transfer</option>}</select>
   <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Order note (optional)" className="w-full rounded-xl border px-4 py-3 min-h-28"/>
   <button onClick={place} className="w-full py-4 rounded-2xl bg-slate-950 text-white font-black">Place Order · ৳{total.toLocaleString()}</button>
  </section>
  <aside className="bg-white rounded-3xl border p-5 h-fit"><h2 className="font-black">Items</h2>{cart.map(i=><div key={i.product.id} className="flex justify-between gap-3 py-3 border-b text-sm"><span>{i.product.name} × {i.quantity}</span><b>৳{(Number(i.product.price)*i.quantity).toLocaleString()}</b></div>)}<div className="flex justify-between pt-4"><b>Total</b><b className="text-xl">৳{total.toLocaleString()}</b></div></aside>
 </div></div></main>;
}

export default function StorefrontPage({navigate,mode}:Props){
 const {identity,settings,products}=useStore();const [search,setSearch]=useState('');const [category,setCategory]=useState('all');
 const cats=useMemo(()=>['all',...Array.from(new Set(products.map(p=>p.category).filter(Boolean) as string[]))],[products]);
 const filtered=useMemo(()=>products.filter(p=>(category==='all'||p.category===category)&&(!search||p.name.toLowerCase().includes(search.toLowerCase())||String(p.category||'').toLowerCase().includes(search.toLowerCase()))),[products,category,search]);
 if(mode==='cart')return <CartPage navigate={navigate}/>;
 if(mode==='checkout')return <CheckoutPage navigate={navigate}/>;
 return <main>
  {mode==='home'&&<section className="relative overflow-hidden bg-slate-950 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(220,38,38,.25),transparent_40%)]"/><div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative"><div className="max-w-3xl"><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-teal-300 text-xs font-black"><Zap className="w-3.5 h-3.5"/>{settings.announcement||identity.tagline||'Official online store'}</div><h1 className="text-4xl sm:text-6xl font-black leading-tight mt-5">{settings.heroTitle||'Book your service online, quickly and easily.'}</h1><p className="text-slate-300 text-lg mt-5 max-w-2xl">{settings.heroSubtitle||'Book and order SIAM AIR & DIGITAL SERVICE services online.'}</p><div className="flex flex-wrap gap-3 mt-7"><button onClick={()=>navigate('/shop')} className="px-5 py-3.5 rounded-2xl bg-white text-slate-950 font-black flex items-center gap-2">Shop now <ArrowRight className="w-4 h-4"/></button><button onClick={()=>navigate('/account')} className="px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 font-black">My Account</button></div></div></div></section>}
  <section className="max-w-7xl mx-auto px-4 py-10"><div className="flex items-end justify-between gap-4"><div><div className="text-xs font-black text-teal-700 uppercase tracking-widest">SIAM AIR STORE</div><h2 className="text-3xl font-black mt-1">{mode==='shop'?'All Services':'Featured for you'}</h2></div>{mode==='home'&&<button onClick={()=>navigate('/shop')} className="text-sm font-black text-teal-700 flex items-center gap-1">View all <ChevronRight className="w-4 h-4"/></button>}</div>
   {mode==='shop'&&<div className="mt-6 flex flex-col md:flex-row gap-3"><div className="relative flex-1"><Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search services..." className="w-full rounded-2xl border bg-white py-3 pl-10 pr-4"/></div><div className="flex gap-2 overflow-x-auto">{cats.map(c=><button key={c} onClick={()=>setCategory(c)} className={'px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap '+(category===c?'bg-slate-950 text-white':'bg-white border')}>{c==='all'?'All':c}</button>)}</div></div>}
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">{filtered.slice(0,mode==='home'?8:100).map(p=><ProductCard key={p.id} p={p} navigate={navigate}/>)}</div>{filtered.length===0&&<div className="py-20 text-center text-slate-400">No products or services found.</div>}
  </section>
  <section className="bg-white border-y"><div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-4"><div className="flex gap-3"><Truck className="text-teal-700"/><div><b className="block">Fast Delivery</b><span className="text-xs text-slate-500">Reliable local service</span></div></div><div className="flex gap-3"><Star className="text-amber-500"/><div><b className="block">Trusted Service</b><span className="text-xs text-slate-500">Accounting-controlled catalog</span></div></div><div className="flex gap-3"><ShoppingCart className="text-slate-800"/><div><b className="block">Easy Checkout</b><span className="text-xs text-slate-500">Cart to order in minutes</span></div></div><div className="flex gap-3"><Package className="text-slate-800"/><div><b className="block">Order Tracking</b><span className="text-xs text-slate-500">Customer account history</span></div></div></div></section>
 </main>;
}
