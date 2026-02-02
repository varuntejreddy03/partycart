import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === AppRoutes.QUOTE;

  if (isQuotePage) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/95 to-dark/80 backdrop-blur-xl border-t border-white/20 flex justify-around items-end py-3 px-2 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      
      <Link 
        to={AppRoutes.HOUSE_PARTIES}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${isActive(AppRoutes.HOUSE_PARTIES) ? 'text-primary -translate-y-1' : 'text-gray-400'}`}
      >
        {isActive(AppRoutes.HOUSE_PARTIES) && <div className="absolute -top-2 w-6 h-1 bg-primary rounded-full"></div>}
        <div className={`p-2 rounded-xl transition-all duration-300 ${isActive(AppRoutes.HOUSE_PARTIES) ? 'bg-primary/20 scale-110' : 'group-hover:bg-white/10'}`}>
          <span className="material-icons-round text-xl">celebration</span>
        </div>
        <span className="text-[9px] font-medium">Parties</span>
      </Link>

      <Link 
        to={AppRoutes.CORPORATE}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${isActive(AppRoutes.CORPORATE) ? 'text-primary -translate-y-1' : 'text-gray-400'}`}
      >
        {isActive(AppRoutes.CORPORATE) && <div className="absolute -top-2 w-6 h-1 bg-primary rounded-full"></div>}
        <div className={`p-2 rounded-xl transition-all duration-300 ${isActive(AppRoutes.CORPORATE) ? 'bg-primary/20 scale-110' : 'group-hover:bg-white/10'}`}>
          <span className="material-icons-round text-xl">business_center</span>
        </div>
        <span className="text-[9px] font-medium">Corp</span>
      </Link>

      <Link 
        to={AppRoutes.HOME} 
        className={`flex flex-col items-center gap-1 transition-all duration-300 group relative -mt-4`}
      >
        <div className={`p-4 rounded-2xl shadow-lg transition-all duration-300 ${isActive(AppRoutes.HOME) ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-primary/40 scale-110' : 'bg-surface border border-white/20 text-gray-300 group-hover:scale-105'}`}>
          <span className="material-icons-round text-2xl">home</span>
        </div>
        <span className={`text-[9px] font-bold ${isActive(AppRoutes.HOME) ? 'text-primary' : 'text-gray-400'}`}>Home</span>
      </Link>

      <Link 
        to={AppRoutes.BULK}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${isActive(AppRoutes.BULK) ? 'text-primary -translate-y-1' : 'text-gray-400'}`}
      >
        {isActive(AppRoutes.BULK) && <div className="absolute -top-2 w-6 h-1 bg-primary rounded-full"></div>}
        <div className={`p-2 rounded-xl transition-all duration-300 ${isActive(AppRoutes.BULK) ? 'bg-primary/20 scale-110' : 'group-hover:bg-white/10'}`}>
          <span className="material-icons-round text-xl">outdoor_grill</span>
        </div>
        <span className="text-[9px] font-medium">Order</span>
      </Link>

      <Link 
        to={AppRoutes.CONTACT}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${isActive(AppRoutes.CONTACT) ? 'text-primary -translate-y-1' : 'text-gray-400'}`}
      >
        {isActive(AppRoutes.CONTACT) && <div className="absolute -top-2 w-6 h-1 bg-primary rounded-full"></div>}
        <div className={`p-2 rounded-xl transition-all duration-300 ${isActive(AppRoutes.CONTACT) ? 'bg-primary/20 scale-110' : 'group-hover:bg-white/10'}`}>
          <span className="material-icons-round text-xl">person</span>
        </div>
        <span className="text-[9px] font-medium">Contact</span>
      </Link>
    </div>
  );
};