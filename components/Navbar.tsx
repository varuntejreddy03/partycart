import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === AppRoutes.QUOTE;

  if (isQuotePage) return null;

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={AppRoutes.HOME} className="flex items-center gap-2">
            <img
              src="https://partycart.in/wp-content/uploads/2025/09/Party-cart-logo@4x-e1757269507691.png"
              alt="Partycart Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to={AppRoutes.VENDORS} className="text-sm font-bold text-gray-300 hover:text-white transition">Restaurants</Link>
            <Link to={AppRoutes.CONTACT} className="text-sm font-bold text-gray-300 hover:text-white transition">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={AppRoutes.VENDORS}
              className="bg-gradient-to-r from-primary to-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition transform hover:-translate-y-0.5"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};