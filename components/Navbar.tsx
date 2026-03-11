import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === AppRoutes.QUOTE;

  if (isQuotePage) return null;

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-border-custom bg-surface backdrop-blur-md" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={AppRoutes.HOME} className="flex items-center gap-2">
            <img
              src="https://partycart.in/wp-content/uploads/2025/09/Party-cart-logo@4x-e1757269507691.png"
              alt="Partycart Logo"
              className="h-14 md:h-16 w-auto object-contain transition-all duration-300 navbar-logo"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to={AppRoutes.VENDORS} className="font-body font-medium text-sm text-text-secondary hover:text-primary transition">Food</Link>
            <Link to={AppRoutes.CONTACT} className="font-body font-medium text-sm text-text-secondary hover:text-primary transition">Enquire now</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={AppRoutes.VENDORS}
              className="btn-primary px-6 py-2.5 rounded-full text-sm shadow-lg shadow-primary/30"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};