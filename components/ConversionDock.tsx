import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

const WHATSAPP_NUMBER = '917396737700';
const SALES_NUMBER = '+91 7396 737 700';

export const ConversionDock: React.FC = () => {
  const location = useLocation();
  const hideOnPages = location.pathname === AppRoutes.QUOTE || location.pathname.startsWith('/vendor/');

  if (hideOnPages) return null;

  const waMessage = encodeURIComponent(
    'Hi PartyCart! I want a fast recommendation for my event and best-selling menu options.'
  );

  return (
    <div className="hidden lg:flex fixed right-5 bottom-6 z-50 flex-col gap-3">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full bg-green-600 px-5 py-3 text-white shadow-2xl transition-transform duration-200 hover:scale-[1.03]"
        aria-label="Get menu suggestions on WhatsApp"
      >
        <span className="material-icons-round text-xl">chat</span>
        <span className="text-sm font-black uppercase tracking-wide">Get Fast Menu Help</span>
      </a>

      <a
        href={`tel:${WHATSAPP_NUMBER}`}
        className="group flex items-center gap-3 rounded-full border border-white/20 bg-surface/80 px-5 py-3 text-white backdrop-blur-xl shadow-2xl transition-transform duration-200 hover:scale-[1.03]"
        aria-label="Call PartyCart sales"
      >
        <span className="material-icons-round text-xl text-primary">call</span>
        <span className="text-sm font-black uppercase tracking-wide">Call {SALES_NUMBER}</span>
      </a>
    </div>
  );
};
