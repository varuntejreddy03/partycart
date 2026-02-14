import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Footer: React.FC = () => {
  const location = useLocation();
  // Hide footer on Quote page if needed, but let's keep it consistent unless requested otherwise.
  // The previous code hid it on Quote page. I'll respect that.
  const isQuotePage = location.pathname === AppRoutes.QUOTE;

  if (isQuotePage) return null;

  return (
    <footer className="relative bg-dark pt-20 pb-32 text-gray-400 overflow-hidden border-t border-white/5">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[50vh] h-[50vh] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link to={AppRoutes.HOME} className="block w-48">
              <img
                src="https://partycart.in/wp-content/uploads/2025/09/partycartORG_logonobg.png"
                alt="PartyCart Logo"
                className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition duration-300"
              />
            </Link>
            <p className="text-base leading-relaxed text-gray-400 max-w-sm">
              <span className="text-white font-bold">PartyCart by Yumzy.</span> <br />
              Hyderabad’s premium party food provider. <br />
              You host the party. We’ll handle the food. 🍽️✨
            </p>

            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/partycart_yumzy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/yumzy-app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0077b5] flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1">
                <span className="sr-only">LinkedIn</span>
                <span className="material-icons-round text-lg">work</span>
              </a>
              <a href="https://www.facebook.com/yumzyapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to={AppRoutes.VENDORS} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">Restaurants</Link></li>
              <li><Link to={AppRoutes.VENDORS} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">Cuisines</Link></li>
              <li><Link to={AppRoutes.CONTACT} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">Offers</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to={AppRoutes.HOME} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">About Us</Link></li>
              <li><Link to={AppRoutes.CONTACT} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">Contact</Link></li>
              <li><Link to={AppRoutes.CONTACT} className="hover:text-primary transition duration-200 block hover:translate-x-1 w-fit">Partners</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-icons-round text-primary text-sm">call</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Call Us</p>
                  <a href="tel:+917396737700" className="text-white font-bold hover:text-primary transition">+91 7396 737 700</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-icons-round text-secondary text-sm">location_on</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Location</p>
                  <p className="text-white font-medium text-sm leading-snug">Hyderabad, Telangana<br />India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-600">
          <p>© 2026 PartyCart by Yumzy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};