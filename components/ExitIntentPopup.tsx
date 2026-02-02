import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { trackQuoteRequest } from '../utils/analytics';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-dark border border-primary rounded-2xl p-8 max-w-md text-center relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <span className="material-icons-round">close</span>
        </button>
        <h3 className="text-2xl font-bold text-white mb-4">Wait! Don't Leave Hungry! 🍽️</h3>
        <p className="text-gray-300 mb-6">Get 20% OFF your first order + FREE delivery</p>
        <Link 
          to={AppRoutes.QUOTE}
          onClick={() => { trackQuoteRequest(); setIsVisible(false); }}
          className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition"
        >
          Claim Offer Now
        </Link>
      </div>
    </div>
  );
};