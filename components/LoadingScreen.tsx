import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [openTime, setOpenTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setOpenTime(now.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    }));

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-dark z-[200] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <img 
            src="https://partycart.in/wp-content/uploads/2025/09/cropped-partycart_logo-192x192.jpg" 
            alt="Partycart Logo" 
            className="w-20 h-20 mx-auto rounded-2xl shadow-lg animate-pulse"
          />
        </div>
        <h1 className="text-3xl font-black italic text-white mb-2">
          PARTY<span className="text-primary">CART</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8">by Yumzy • Opened at {openTime}</p>
        
        <div className="w-64 bg-surface rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-500 text-xs">Loading... {progress}%</p>
      </div>
    </div>
  );
};