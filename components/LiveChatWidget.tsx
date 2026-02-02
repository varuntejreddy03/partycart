import React, { useState } from 'react';
import { trackPhoneCall } from '../utils/analytics';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = () => {
    trackPhoneCall();
    window.open('https://wa.me/917396737700?text=Hi! I need help with party catering', '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 animate-bounce"
      >
        <span className="material-icons-round">chat</span>
      </button>
      
      {isOpen && (
        <div className="fixed bottom-32 right-4 bg-dark border border-white/20 rounded-2xl p-4 w-80 z-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="material-icons-round text-white text-sm">support_agent</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Need Help?</p>
              <p className="text-gray-400 text-xs">We're online now!</p>
            </div>
          </div>
          <button
            onClick={openWhatsApp}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
          >
            <span className="material-icons-round text-sm">whatsapp</span>
            Chat on WhatsApp
          </button>
        </div>
      )}
    </>
  );
};