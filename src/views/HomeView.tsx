import React, { useState } from 'react';
import { MapPin, Search, Mic, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { TopBar } from '../components/TopBar';
import { ShopCard } from '../components/ShopCard';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, TOP_RATED_SHOPS, TRENDING_PRODUCTS, BANNERS } from '../data';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [activeBanner, setActiveBanner] = useState(0);

  // Auto slide banner simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-24 flex flex-col min-h-full"
    >
      <TopBar onProfileClick={() => onNavigate('account')} />

      <main className="flex-1 overflow-y-auto px-4 space-y-6">
        
        {/* Search Bar */}
        <div className="relative flex-shrink-0 pt-2 px-1">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none top-2">
            <Search className="h-6 w-6 text-blue-600" strokeWidth={2.5} />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-12 py-4 bg-white rounded-[1.5rem] shadow-xl text-sm sm:text-base font-medium border-2 border-transparent focus:border-blue-400 outline-none transition-all placeholder:text-slate-400 text-slate-800"
            placeholder="Search groceries, electronics or shops..."
          />
          <div className="absolute inset-y-0 right-4 flex items-center top-2">
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Mic className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Banners */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm">
          <motion.div 
            className="flex h-full"
            animate={{ x: `-${activeBanner * 100}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          >
            {BANNERS.map((banner) => (
              <div 
                key={banner.id} 
                className="w-full h-full flex-shrink-0 relative"
                style={{ 
                  backgroundImage: `url(${banner.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-70`}></div>
                <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1 leading-tight">{banner.title}</h2>
                  <p className="font-medium text-white/90">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
            {BANNERS.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeBanner ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <section className="px-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black uppercase italic tracking-tight text-slate-800">Categories</h2>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2 snap-x px-1">
            {CATEGORIES.map((cat) => {
              // Dynamically pick icon
              const Icon = (Icons as any)[cat.iconName] || Icons.HelpCircle;
              return (
                <div key={cat.id} className="flex flex-col items-center space-y-2 group cursor-pointer w-[72px] sm:w-[88px] snap-start shrink-0">
                  <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] bg-white rounded-2xl shadow-md border-b-4 border-slate-200 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:bg-blue-50 group-hover:border-blue-400">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-full text-center truncate">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Top Rated Near You */}
        <section className="px-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-black uppercase italic tracking-tight text-slate-800 flex items-center flex-wrap gap-2">
                Top Rated Near You
                <span className="normal-case not-italic px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] sm:text-xs rounded border border-blue-100 font-black whitespace-nowrap">
                  4.5★+
                </span>
              </h2>
            </div>
            <button className="text-blue-600 font-bold text-xs hover:underline uppercase tracking-wide">
              View All
            </button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4 snap-x px-1">
            {TOP_RATED_SHOPS.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="pb-8 px-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black uppercase italic tracking-tight text-slate-800">
              Trending Products
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {TRENDING_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </motion.div>
  );
}
