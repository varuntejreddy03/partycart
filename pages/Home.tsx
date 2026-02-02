import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { openYumzyApp } from '../utils/appStore';
import { trackQuoteRequest, trackAppDownload } from '../utils/analytics';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { ScrollAnimatedDiv } from '../components/ScrollAnimation';
import { VideoHero } from '../components/VideoHero';

export const Home: React.FC = () => {
  return (
    <>
      <ScrollAnimatedDiv className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Now Live in Hyderabad • 500+ Happy Customers
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic text-white leading-[0.9] tracking-tight mb-6">
                PARTYCART <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">BY YUMZY</span> <br />
                <span className="text-stroke text-transparent relative text-4xl sm:text-5xl md:text-6xl block mt-2">
                  PREMIUM FOOD PROVIDER
                  <span className="absolute -top-6 -right-8 material-icons-round text-accent text-5xl rotate-12 opacity-80">celebration</span>
                </span>
              </h1>
              <p className="mt-6 text-lg text-white font-bold">
                You host the party. We’ll handle the food. 🍽️✨
              </p>
              <p className="mt-2 text-gray-300 max-w-lg leading-relaxed border-l-4 border-primary pl-4">
                Hyderabad’s premium party food provider. From cozy house parties to big celebrations.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={AppRoutes.QUOTE} onClick={() => trackQuoteRequest()} className="flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Order Now <span className="material-icons-round">arrow_forward</span>
                </Link>
                <button onClick={() => { openYumzyApp(); trackAppDownload(); }} className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition backdrop-blur-md">
                  <span className="material-icons-round text-secondary">smartphone</span> Get Yumzy App
                </button>
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[60px] animate-pulse-slow"></div>
              <VideoHero />
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>

      <ScrollAnimatedDiv className="relative py-12 bg-gradient-to-r from-primary to-orange-600 bg-noise transform -skew-y-2 z-20 border-y border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform skew-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">10<span className="text-yellow-300">+</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Min Guests</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">6<span className="text-yellow-300">Hr</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Heat Retention</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">4.9<span className="text-yellow-300">★</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Anvita Reddy</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">100<span className="text-yellow-300">%</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Live Cooking</p>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>

      <ScrollAnimatedDiv className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic text-white mb-4">OUR <span className="text-primary">SERVICES</span></h2>
              <p className="text-gray-400 max-w-md">We curate the experience, not just the food. Choose your service type below.</p>
            </div>
            <Link to={AppRoutes.QUOTE} className="inline-flex items-center gap-2 text-accent font-bold hover:text-white transition">
              Explore Options <span className="material-icons-round">east</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8 md:space-y-12">
              <Link to={AppRoutes.HOUSE_PARTIES} className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition"></div>
                <img alt="Party Orders" className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700" src="https://partycart.in/wp-content/uploads/2025/09/party-order.jpg" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3">Min 10+ Guests</span>
                  <h3 className="text-3xl font-bold text-white mb-2 italic">Party Orders</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">Curated meals from unique home chefs. Perfect for house parties and small gatherings.</p>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">
                    <span className="material-icons-round">arrow_outward</span>
                  </div>
                </div>
              </Link>
              <Link to={AppRoutes.CORPORATE} className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition"></div>
                <img alt="Catering" className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700" src="https://partycart.in/wp-content/uploads/2025/09/4-1.jpg" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-bold text-white mb-2 italic">Catering</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">Up to 100 Guests. First-in-class hot boxes keeping food warm for 6 hours.</p>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">
                    <span className="material-icons-round">arrow_outward</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="space-y-8 md:space-y-12 md:mt-16">
              <Link to={AppRoutes.HOUSE_PARTIES} className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition"></div>
                <img alt="Occasions" className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700" src="https://partycart.in/wp-content/uploads/2025/09/snacks.jpg" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-bold text-white mb-2 italic">For Occasions</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">Pooja, Prasadam, Birthdays & Festivals. Specialized menus for your specific needs.</p>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">
                    <span className="material-icons-round">arrow_outward</span>
                  </div>
                </div>
              </Link>
              <Link to={AppRoutes.BULK} className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition"></div>
                <img alt="Live Counters" className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700" src="https://partycart.in/wp-content/uploads/2025/09/live.jpg" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full mb-3">Experience</span>
                  <h3 className="text-3xl font-bold text-white mb-2 italic">Live Counters</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">Order meat by the kilo. Cooked live at your party by elite chefs.</p>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">
                    <span className="material-icons-round">arrow_outward</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>

      <ScrollAnimatedDiv className="relative py-20 bg-surface/50 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic text-white mb-4">WHAT OUR <span className="text-primary">CUSTOMERS SAY</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </div>
      </ScrollAnimatedDiv>

      <ScrollAnimatedDiv className="relative py-20 bg-surface/50 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic text-white">HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-green-300">WORKS</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-transparent mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 border-t border-dashed border-white/30"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="group text-center">
                <div className="relative inline-block mb-6 transition transform group-hover:scale-110 duration-300">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-surface to-dark border border-white/10 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                    <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" src="https://partycart.in/wp-content/uploads/2025/09/freepik__candid-photography-with-natural-textures-and-highl__82970.png" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">1</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Order</h3>
                <p className="text-gray-400 text-sm px-4">Choose your menu and get a custom quote via WhatsApp instantly.</p>
              </div>
              <div className="group text-center md:mt-12">
                <div className="relative inline-block mb-6 transition transform group-hover:scale-110 duration-300">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-surface to-dark border border-white/10 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                    <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" src="https://partycart.in/wp-content/uploads/2025/09/freepik__candid-photography-with-natural-textures-and-highl__88552.png" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">2</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cook</h3>
                <p className="text-gray-400 text-sm px-4">Chefs prepare fresh food with premium ingredients.</p>
              </div>
              <div className="group text-center">
                <div className="relative inline-block mb-6 transition transform group-hover:scale-110 duration-300">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-surface to-dark border border-white/10 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                    <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" src="https://partycart.in/wp-content/uploads/2025/09/freepik__candid-photography-with-natural-textures-and-highl__82969.png" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">3</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enjoy</h3>
                <p className="text-gray-400 text-sm px-4">Timely delivery and professional setup at your venue.</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>

      <ScrollAnimatedDiv className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-noise opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="material-icons-round text-white/20 text-9xl absolute -top-12 -left-12 rotate-12">campaign</span>
          <span className="material-icons-round text-white/20 text-9xl absolute -bottom-12 -right-12 -rotate-12">celebration</span>
          <h2 className="text-4xl sm:text-6xl font-black italic text-white mb-8 tracking-tight">
            ORDER YOUR NEXT <br />EXPERIENCE WITH US
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={AppRoutes.QUOTE} onClick={() => trackQuoteRequest()} className="bg-white text-primary text-lg font-black py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-1 active:translate-y-0">
              Order Now
            </Link>
            <button onClick={() => { openYumzyApp(); trackAppDownload(); }} className="bg-black/20 backdrop-blur-sm border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-black/30 transition flex items-center justify-center gap-2">
              <span className="material-icons-round">smartphone</span> Get Yumzy App
            </button>
          </div>
        </div>
      </ScrollAnimatedDiv>
    </>
  );
};