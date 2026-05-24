import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-[1.5rem] p-3 shadow-lg border border-slate-100 flex flex-col group hover:shadow-xl transition-all cursor-pointer ring-0 hover:ring-2 hover:ring-blue-100 flex-shrink-0 relative overflow-hidden">
      {product.discountBadge && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-sm transform -rotate-3">
          {product.discountBadge}
        </div>
      )}
      
      <div className="h-28 w-full rounded-xl overflow-hidden mb-3 bg-slate-50 flex items-center justify-center relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <span className="text-[9px] font-bold text-slate-400 mb-0.5 truncate uppercase tracking-wider">{product.shopName}</span>
        <h3 className="font-bold text-sm text-slate-800 line-clamp-2 leading-tight mb-2 flex-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-slate-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-sm focus:outline-none">
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
