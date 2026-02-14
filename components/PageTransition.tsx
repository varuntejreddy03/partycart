import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounting, setIsMounting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsMounting(true);
    const timer = setTimeout(() => setIsMounting(false), 50); // Small delay to ensure render cycle catches the start state
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname} // Key forces re-mount on route change to trigger animation
      className={`
        transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform
        ${isMounting
          ? 'opacity-0 scale-[0.98] blur-[8px] translate-y-4'
          : 'opacity-100 scale-100 blur-0 translate-y-0'}
      `}
    >
      {children}
    </div>
  );
};