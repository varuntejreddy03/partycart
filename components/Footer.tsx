import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Footer: React.FC = () => {
    const location = useLocation();
    const isQuotePage = location.pathname === AppRoutes.QUOTE;
  
    if (isQuotePage) return null;

  return (
    <footer className="bg-dark border-t border-white/5 pt-16 pb-32 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
                <img 
                    src="https://partycart.in/wp-content/uploads/2025/09/partycartORG_logonobg.png" 
                    alt="Partycart Logo" 
                    className="h-16 w-auto object-contain"
                />
            </div>
            <p className="text-sm leading-relaxed mb-4">PartyCart by Yumzy.<br/>Hyderabad’s premium party food provider.<br/>You host the party. We’ll handle the food.</p>
            <div className="flex gap-2 mt-4">
                <a href="https://play.google.com/store/search?q=yumzy&c=apps&hl=en-IN" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition">
                    <span className="material-icons-round text-xl text-white">android</span>
                </a>
                <a href="https://apps.apple.com/in/app/yumzy-online-food-delivery/id1476665049" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition">
                    <span className="material-icons-round text-xl text-white">apple</span>
                </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={AppRoutes.HOUSE_PARTIES} className="hover:text-primary transition">Explore Cuisines</Link></li>
              <li><Link to={AppRoutes.CORPORATE} className="hover:text-primary transition">Explore Options</Link></li>
              <li><Link to={AppRoutes.QUOTE} className="hover:text-primary transition">Enquire Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={AppRoutes.QUOTE} className="hover:text-primary transition">Order Now</Link></li>
              <li><Link to={AppRoutes.CONTACT} className="hover:text-primary transition">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary transition">Vendor Safety Checks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h4>
            <p className="text-sm mb-4 text-white font-bold text-lg">7396737700</p>
            <div className="flex items-center gap-4">
               <a href="https://www.instagram.com/partycart_yumzy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Instagram</span>
                  <img src="https://partycart.in/wp-content/uploads/2025/09/instagram.svg" className="w-6 h-6 invert opacity-60 hover:opacity-100 transition" onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<i class="material-icons-round">photo_camera</i>';
                  }}/>
               </a>
               <a href="https://www.linkedin.com/company/yumzy-app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">LinkedIn</span>
                   {/* Material Icon for LinkedIn fallback */}
                   <span className="text-xl font-bold">in</span>
               </a>
               <a href="https://www.linkedin.com/company/yumzy-x/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Facebook</span>
                  <span className="material-icons-round">facebook</span>
               </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 border-t border-white/5 pt-8">
          © 2026 PartyCart by Yumzy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};