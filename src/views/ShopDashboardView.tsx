import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, ArrowLeft, CheckCircle, Package, DollarSign, TrendingUp } from 'lucide-react';
import { ViewState } from '../types';

interface ShopDashboardViewProps {
  onNavigate: (view: ViewState) => void;
}

export function ShopDashboardView({ onNavigate }: ShopDashboardViewProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('Grocery');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage for mocked registration status
    const registeredObj = localStorage.getItem('nearkart_shop_reg');
    if (registeredObj) {
      const data = JSON.parse(registeredObj);
      setIsRegistered(true);
      setShopName(data.shopName);
      setCategory(data.category);
      setAddress(data.address);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('nearkart_shop_reg', JSON.stringify({
        shopName, category, address
      }));
      setIsRegistered(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-blue-600 px-4 py-4 sm:px-6 flex items-center text-white shadow-lg z-40 shrink-0 h-20">
          <button 
            onClick={() => onNavigate('home')}
            className="mr-4 p-2 hover:bg-blue-700 rounded-full transition-colors active:scale-95 flex-shrink-0"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="flex-1 flex items-center space-x-3">
             <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-inner">
               <Store className="w-6 h-6 text-blue-800" strokeWidth={2.5} />
             </div>
             <div className="overflow-hidden">
               <h1 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight leading-none truncate">{shopName || 'My Shop'}</h1>
               <span className="text-[10px] font-bold bg-blue-500 px-2 py-0.5 rounded-full uppercase">Verified Partner</span>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-blue-100 font-bold uppercase tracking-wider text-sm mb-1">Today's Revenue</p>
               <h2 className="text-4xl font-black tracking-tight flex items-center">
                 <span className="text-2xl mr-1 text-yellow-400">₹</span>0.00
               </h2>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  <Package size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-slate-800">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Active Orders</span>
             </div>
             <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                  <TrendingUp size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-slate-800">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Store Visits</span>
             </div>
          </div>

          <button className="w-full bg-white border-2 border-dashed border-blue-200 text-blue-600 font-black py-4 rounded-2xl flex items-center justify-center hover:bg-blue-50 transition-colors uppercase tracking-wide shadow-sm">
             + Add New Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-b-[40px] -z-0 shadow-lg"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="px-4 py-4 sm:px-6 flex items-center text-white h-20 shrink-0">
          <button 
            onClick={() => onNavigate('home')}
            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95 flex-shrink-0"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight">Setup Shop</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-6 shadow-2xl border border-slate-100 mt-2"
          >
            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-inner transform rotate-3">
                 <Store size={40} className="text-yellow-600" strokeWidth={2.5} />
               </div>
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-center text-slate-800 mb-2">Register Business</h2>
            <p className="text-slate-500 font-medium text-center text-sm mb-8 px-2">Reach thousands of nearby customers and grow your daily local orders.</p>

            <form onSubmit={handleRegister} className="space-y-5 flex flex-col items-center">
              <div className="w-full">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Shop Name</label>
                <input 
                  type="text" 
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white font-bold text-slate-900 transition-colors placeholder:font-medium placeholder:text-slate-400"
                  placeholder="e.g. Fresh Mart Grocery"
                />
              </div>

              <div className="w-full">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white font-bold text-slate-900 transition-colors appearance-none"
                >
                  <option value="Grocery">Grocery</option>
                  <option value="Food">Food & Restaurants</option>
                  <option value="Medical">Pharmacy & Medical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing & Fashion</option>
                  <option value="Beauty">Beauty & Cosmetics</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Full Address</label>
                <textarea 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white font-bold text-slate-900 transition-colors placeholder:font-medium placeholder:text-slate-400 resize-none"
                  placeholder="Shop number, building, street, landmarks"
                />
              </div>

              <div className="pt-4 w-full">
                <button 
                  type="submit"
                  disabled={isSubmitting || !shopName || !address}
                  className="w-full bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors shadow-lg shadow-blue-200 disabled:shadow-none uppercase tracking-wide space-x-2"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <CheckCircle size={20} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
