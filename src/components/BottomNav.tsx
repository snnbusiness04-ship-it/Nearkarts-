import React from 'react';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'home' as ViewState, label: 'Home', icon: Home },
    { id: 'categories' as ViewState, label: 'Categories', icon: Grid },
    { id: 'search' as ViewState, label: 'Search', icon: Search },
    { id: 'orders' as ViewState, label: 'Orders', icon: ShoppingBag },
    { id: 'account' as ViewState, label: 'Account', icon: User },
  ];

  return (
    <nav className="h-[72px] sm:h-20 bg-white border-t border-slate-100 px-4 sm:px-10 flex items-center justify-between shadow-[0_-10px_25px_rgba(0,0,0,0.03)] z-50 flex-shrink-0 relative">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = currentView === id;
        
        // Center button style (Search or Cart based on flow, using Search here)
        if (id === 'search') {
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center justify-center"
            >
              <div className={`-mt-10 sm:-mt-12 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white flex items-center justify-center text-white shadow-xl shadow-blue-300 ring-4 ring-white transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-yellow-400 text-blue-900 shadow-yellow-300' : 'bg-blue-600'}`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center space-y-1 w-14 sm:w-16 transition-colors ${
              isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-0.5" />
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wide ${isActive ? 'font-black' : ''}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
