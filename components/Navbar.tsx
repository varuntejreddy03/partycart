import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === AppRoutes.QUOTE;
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);

    document.documentElement.setAttribute('data-theme', next);

    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
            <Link to={AppRoutes.VENDORS} className="text-sm font-bold text-muted-custom hover:text-content transition">Food</Link>
            <Link to={AppRoutes.CONTACT} className="text-sm font-bold text-muted-custom hover:text-content transition">Enquire now</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition text-content border border-white/10"
              aria-label="Toggle Theme"
            >
              <span className="material-icons-round text-xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <Link
              to={AppRoutes.VENDORS}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition transform hover:-translate-y-0.5 border border-primary/20"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};