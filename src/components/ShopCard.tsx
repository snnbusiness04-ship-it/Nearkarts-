import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Shop } from '../types';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-xl border border-slate-100 flex items-center space-x-4 sm:space-x-5 group hover:shadow-2xl transition-all cursor-pointer ring-0 hover:ring-2 hover:ring-blue-100 snap-start flex-shrink-0 w-[300px] sm:w-[320px]">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-200 flex-shrink-0 overflow-hidden relative">
        <img 
          src={shop.imageUrl} 
          alt={shop.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between h-full py-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] sm:text-xs font-black uppercase text-green-600 tracking-wider truncate mb-1 pr-2">{shop.category}</span>
          <span className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap ${shop.isOpen ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {shop.isOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-800 leading-tight mb-1 line-clamp-1">{shop.name}</h4>
        
        <div className="flex items-center space-x-1 text-yellow-500 mb-2">
          <span className="font-black text-xs sm:text-sm">{shop.rating}</span>
          <div className="flex items-center space-x-0.5">
            <Star size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-slate-400 text-[10px] sm:text-xs font-medium ml-1">({shop.reviewsCount})</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-slate-500 text-[10px] sm:text-xs font-bold mb-3">
          <MapPin size={12} strokeWidth={3} />
          <span>{shop.distance}</span>
        </div>
        
        <button className={`w-full py-2 font-black rounded-xl text-[10px] sm:text-xs transition-colors shadow-sm ${shop.isOpen ? 'bg-blue-600 text-white hover:bg-yellow-400 hover:text-blue-900 shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
          {shop.isOpen ? 'VISIT SHOP' : 'OPENS 10 AM'}
        </button>
      </div>
    </div>
  );
}
