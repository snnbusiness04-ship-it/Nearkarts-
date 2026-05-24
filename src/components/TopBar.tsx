import React from 'react';
import { MapPin, Bell, User, ShoppingBag } from 'lucide-react';

interface TopBarProps {
  onProfileClick: () => void;
}

export function TopBar({ onProfileClick }: TopBarProps) {
  return (
    <header className="bg-blue-600 px-4 py-4 sm:px-6 flex items-center justify-between text-white shadow-lg z-40 sticky top-0 h-20">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-inner">
          <ShoppingBag className="w-6 h-6 text-blue-800" strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-black tracking-tighter italic uppercase min-[400px]:block hidden">NearKart</span>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 bg-blue-700/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer hover:bg-blue-800/50 max-w-[150px] sm:max-w-none transition-colors">
        <MapPin className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" />
        <span className="text-xs sm:text-sm font-bold truncate">HSR Layout, Bangalore</span>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-5">
        <div className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <Bell className="w-7 h-7 opacity-90" strokeWidth={2} />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-blue-600 rounded-full"></div>
        </div>
        <button 
          onClick={onProfileClick}
          className="flex items-center space-x-2 bg-white/10 px-2 py-1.5 rounded-lg border border-white/20 transition hover:bg-white/20 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 border-2 border-white flex items-center justify-center text-white overflow-hidden shadow-sm">
            <User size={16} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </header>
  );
}
