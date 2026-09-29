import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';

const API=String((import.meta as any).env?.VITE_ACCOUNTING_API_URL||'https://siam-air-digital-service.onrender.com').replace(/\/$/,'');
export type Product={id:string;kind:string;sku?:string;name:string;name_bn?:string;description?:string;description_bn?:string;category?:string;image_url?:string;price:number;compare_price?:number|null;stock?:number|null;active:boolean;featured:boolean};
export type Customer={id:string;name:string;phone:string;email?:string;address?:string;city?:string};
export type Order={id:string;order_number:string;customer_name:string;phone:string;items:any[];subtotal:number;delivery_fee:number;discount:number;total:number;payment_method:string;payment_status:string;status:string;address?:string;city?:string;note?:string;created_at:string};
export type StoreIdentity={name:string;tagline:string;logoUrl:string;address:string;mobile:string;whatsapp:string;email:string;website:string};
export type StoreSettings=Record<string,any>;

async function request<T>(path:string,options:RequestInit={}){const token=localStorage.getItem('siam_ecom_customer_token');const r=await fetch(API+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...(options.headers||{})}});const p=await r.json().catch(()=>({}));if(!r.ok)throw new Error(p.error||'Request failed');return p as T;}

type CartItem={product:Product;quantity:number};
type Ctx={identity:StoreIdentity;settings:StoreSettings;products:Product[];cart:CartItem[];customer:Customer|null;orders:Order[];loading:boolean;addToCart:(p:Product)=>void;removeFromCart:(id:string)=>void;setQty:(id:string,q:number)=>void;clearCart:()=>void;register:(data:any)=>Promise<void>;login:(id:string,password:string)=>Promise<void>;logout:()=>void;refreshOrders:()=>Promise<void>;checkout:(data:any)=>Promise<Order>;notice:(m:string)=>void};
const C=createContext<Ctx|null>(null);
export const StoreProvider:React.FC<{children:React.ReactNode}>=({children})=>{
 const [identity,setIdentity]=useState<StoreIdentity>({name:'SIAM AIR & DIGITAL SERVICE',tagline:'',logoUrl:'',address:'',mobile:'',whatsapp:'',email:'',website:''});
 const [settings,setSettings]=useState<StoreSettings>({});
 const [products,setProducts]=useState<Product[]>([]);
 const [cart,setCart]=useState<CartItem[]>(()=>{try{return JSON.parse(localStorage.getItem('siam_ecom_cart')||'[]')}catch{return[]}});
 const [customer,setCustomer]=useState<Customer|null>(null); const [orders,setOrders]=useState<Order[]>([]); const [loading,setLoading]=useState(true);
 const [toast,setToast]=useState<string|null>(null);
 const notice=(m:string)=>{setToast(m);window.setTimeout(()=>setToast(null),3000);};
 const refresh=async()=>{try{const p=await request<any>('/api/storefront');setIdentity(p.settings);setSettings(p.ecommerce||{});const ecommerceProducts=((p.products||[]) as Product[]).filter((x:any)=>x.kind==='service');const serviceProducts=(p.services||[]).map((s:any)=>({id:'service-'+s.id,kind:'service',name:String(s.name||'Service'),name_bn:String(s.name||'Service'),description:'Service from SIAM AIR & DIGITAL SERVICE',category:String(s.category||'Services'),price:0,stock:null,active:true,featured:false}));setProducts([...ecommerceProducts,...serviceProducts.filter((s:any)=>!ecommerceProducts.some((p:Product)=>p.kind==='service'&&p.name.toLowerCase()===s.name.toLowerCase()))]);}catch(e){console.error(e)}finally{setLoading(false)}};
 useEffect(()=>{void refresh();const i=window.setInterval(refresh,60000);return()=>window.clearInterval(i)},[]);
 useEffect(()=>{if(identity.name)document.title=identity.name+(identity.tagline?' — '+identity.tagline:'')},[identity.name,identity.tagline]);
 useEffect(()=>{try{localStorage.setItem('siam_ecom_cart',JSON.stringify(cart))}catch{}},[cart]);
 useEffect(()=>{const token=localStorage.getItem('siam_ecom_customer_token');if(token){request<any>('/api/storefront/me').then(p=>setCustomer(p.customer)).catch(()=>localStorage.removeItem('siam_ecom_customer_token'))}},[]);
 const addToCart=(p:Product)=>{setCart(c=>{const x=c.find(i=>i.product.id===p.id);if(x)return c.map(i=>i.product.id===p.id?{...i,quantity:i.quantity+1}:i);return [...c,{product:p,quantity:1}]});notice('Added to cart');};
 const removeFromCart=(id:string)=>setCart(c=>c.filter(i=>i.product.id!==id));
 const setQty=(id:string,q:number)=>{if(q<=0)return removeFromCart(id);setCart(c=>c.map(i=>i.product.id===id?{...i,quantity:Math.min(q,i.product.stock==null?99:Number(i.product.stock))}:i))};
 const clearCart=()=>setCart([]);
 const register=async(data:any)=>{const p=await request<any>('/api/storefront/register',{method:'POST',body:JSON.stringify(data)});localStorage.setItem('siam_ecom_customer_token',p.token);setCustomer(p.customer);notice('Account created successfully');};
 const login=async(identifier:string,password:string)=>{const p=await request<any>('/api/storefront/login',{method:'POST',body:JSON.stringify({identifier,password})});localStorage.setItem('siam_ecom_customer_token',p.token);setCustomer(p.customer);notice('Signed in successfully');};
 const logout=()=>{localStorage.removeItem('siam_ecom_customer_token');setCustomer(null);setOrders([]);};
 const refreshOrders=async()=>{if(!customer)return;try{const p=await request<any>('/api/storefront/my-orders');setOrders(p)}catch(e){console.error(e)}};
 const checkout=async(data:any)=>{if(!customer)throw new Error('Please sign in first');const p=await request<any>('/api/storefront/orders',{method:'POST',body:JSON.stringify({items:cart.map(i=>({productId:i.product.id,quantity:i.quantity})),...data})});clearCart();await refresh();await refreshOrders();notice('Order '+p.order.order_number+' placed successfully');return p.order};
 const value=useMemo(()=>({identity,settings,products,cart,customer,orders,loading,addToCart,removeFromCart,setQty,clearCart,register,login,logout,refreshOrders,checkout,notice}),[identity,settings,products,cart,customer,orders,loading]);
 return <C.Provider value={value}>{children}{toast&&<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] rounded-full bg-slate-950 text-white px-5 py-3 text-sm font-bold shadow-2xl">{toast}</div>}</C.Provider>;
};
export const useStore=()=>{const c=useContext(C);if(!c)throw new Error('useStore must be inside StoreProvider');return c;};
