/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewState, UserRole } from './types';
import { AuthView } from './views/AuthView';
import { HomeView } from './views/HomeView';
import { ShopDashboardView } from './views/ShopDashboardView';
import { BottomNav } from './components/BottomNav';
import { AnimatePresence, motion } from 'motion/react';
import { Clock, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('auth');
  const [role, setRole] = useState<UserRole | null>(null);

  const handleLoginSuccess = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'shop_owner') {
      setCurrentView('shop_dashboard');
    } else {
      setCurrentView('home');
    }
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    setRole(null);
    setCurrentView('auth');
  };

  // Helper placeholder for unbuilt views
  const renderPlaceholder = (title: string) => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-slate-50 absolute inset-0 z-40"
    >
      {/* Top Header with Back Button */}
      <div className="bg-blue-600 px-4 py-4 sm:px-6 flex items-center text-white shadow-lg z-40 shrink-0 h-20">
        <button 
          onClick={() => handleNavigate('home')}
          className="mr-4 p-2 hover:bg-blue-700 rounded-full transition-colors active:scale-95 flex-shrink-0"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight">{title}</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Clock size={32} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-500 font-medium max-w-xs">This section is currently under development. Check back soon for updates!</p>
        
        {currentView === 'account' && (
          <button 
            onClick={handleLogout}
            className="mt-8 px-8 py-3 bg-white text-red-600 font-black rounded-xl border-2 border-red-100 shadow-md hover:bg-red-50 transition-colors uppercase tracking-wider"
          >
            Sign Out
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex items-center justify-center sm:p-4">
      {/* Mobile container boundary for desktop preview */}
      <div className="w-full sm:max-w-md bg-slate-50 min-h-screen sm:min-h-[850px] sm:max-h-[850px] relative sm:rounded-[40px] border-slate-800 shadow-2xl overflow-hidden sm:border-[8px] flex flex-col text-slate-900">
        
        <AnimatePresence mode="wait">
          {currentView === 'auth' && (
            <motion.div key="auth" className="flex-1 overflow-auto bg-white absolute inset-0 z-50">
              <AuthView onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          )}

          {currentView === 'home' && (
            <motion.div key="home" className="flex-1 overflow-auto h-full">
              <HomeView onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentView === 'shop_dashboard' && (
            <motion.div key="shop" className="flex-1 overflow-auto bg-white absolute inset-0 z-50">
              <ShopDashboardView onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentView === 'categories' && renderPlaceholder('Categories')}
          {currentView === 'search' && renderPlaceholder('Search')}
          {currentView === 'orders' && renderPlaceholder('Your Orders')}
          {currentView === 'account' && renderPlaceholder('My Account')}
          
        </AnimatePresence>

        {/* Bottom Nav is strictly for authenticated views */}
        {currentView !== 'auth' && currentView !== 'shop_dashboard' && (
          <BottomNav currentView={currentView} onNavigate={handleNavigate} />
        )}

      </div>
    </div>
  );
}

