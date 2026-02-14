import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isQuotePage = location.pathname === AppRoutes.QUOTE;
  const isVendorMenu = location.pathname.startsWith('/vendor/');

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide if we've scrolled down a bit and are scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isQuotePage || isVendorMenu) return null;

  const TABS = [
    { path: AppRoutes.HOME, icon: 'home', label: 'Home' },
    { path: AppRoutes.VENDORS, icon: 'restaurant_menu', label: 'Food' },
    { path: AppRoutes.CONTACT, icon: 'support_agent', label: 'Help' },
  ];

  const activeIndex = TABS.findIndex(tab => location.pathname === tab.path);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <>
      <div className="h-24 md:hidden" />

      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
        style={{ width: '90%', maxWidth: '350px' }}
      >
        <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl h-16 flex items-center justify-between px-1.5 ring-1 ring-white/5 overflow-hidden">

          {/* Sliding Active Background */}
          <div
            className="absolute top-1 bottom-1 bg-white/10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              left: `${(currentIndex * 33.33) + 1.5}%`,
              width: '30%'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-orange-500/20 blur-md rounded-full"></div>
          </div>

          {TABS.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="relative flex-1 h-full flex flex-col items-center justify-center cursor-pointer select-none z-10"
              >
                <div className={`relative transition-all duration-500 ease-out flex items-center justify-center flex-col ${isActive ? '-translate-y-1' : 'translate-y-0.5'}`}>

                  {isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary/20 blur-xl rounded-full"></div>
                  )}

                  <span
                    className={`material-icons-round text-[28px] transition-all duration-300 relative z-10 
                      ${isActive
                        ? 'text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] scale-110'
                        : 'text-gray-400/80 hover:text-white scale-100'}`}
                  >
                    {tab.icon}
                  </span>

                  <span
                    className={`text-[10px] font-bold mt-0.5 transition-all duration-300 ease-out origin-top
                      ${isActive
                        ? 'opacity-100 scale-100 text-white'
                        : 'opacity-0 scale-50 text-gray-500 absolute top-full'}`}
                  >
                    {tab.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};