import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Corporate: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[60vh] h-[60vh] bg-primary/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[15%] right-[-5%] w-[45vh] h-[45vh] bg-saffron/10 rounded-full blur-[100px]"></div>
        <span className="material-symbols-outlined absolute top-[20%] right-[12%] text-primary/10 text-8xl rotate-12">room_service</span>
      </div>

      <section className="relative pt-28 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-saffron text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                First-In-Class Hot Boxes
            </div>
            <h1 className="text-6xl font-black italic text-white leading-[0.85] tracking-tight mb-8">
                <span className="text-saffron">CATERING</span><br/>
                UP TO 100<br/>
                <span className="text-stroke text-transparent">GUESTS</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-primary pl-4 max-w-[85%] mb-10">
                Perfect for large gatherings and events. We use temperature-controlled delivery to keep food warm for 6 hours.
            </p>
            <div className="flex flex-col gap-4 max-w-md">
                <Link to={AppRoutes.QUOTE} className="w-full bg-white text-dark font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transform active:scale-95 transition">
                    Explore Options <span className="material-symbols-outlined text-xl">description</span>
                </Link>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md">
                        <span className="material-symbols-outlined text-xl">calendar_month</span> Schedule
                    </button>
                    <a href="https://play.google.com/store/search?q=yumzy&c=apps&hl=en-IN" target="_blank" rel="noopener noreferrer" className="bg-primary/10 border border-primary/20 text-primary py-4 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md font-bold">
                        <span className="material-symbols-outlined text-xl">smartphone</span> Yumzy App
                    </a>
                </div>
            </div>
        </div>
      </section>

      <div className="relative py-10 bg-gradient-to-r from-primary to-orange-600 bg-noise transform -skew-y-2 z-20 border-y border-white/10 shadow-2xl">
        <div className="transform skew-y-2 px-5 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4">
                <div className="text-center">
                    <p className="text-4xl font-black text-white mb-0.5">100<span className="text-saffron-200">+</span></p>
                    <p className="text-sm font-black uppercase tracking-widest text-white/70">Guest Capacity</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-black text-white mb-0.5">6<span className="text-saffron-200">Hr</span></p>
                    <p className="text-sm font-black uppercase tracking-widest text-white/70">Heat Retention</p>
                </div>
                <div className="text-center md:border-t-0 md:pt-0 border-t border-white/10 pt-4">
                    <p className="text-4xl font-black text-white mb-0.5">100<span className="text-saffron-200">%</span></p>
                    <p className="text-sm font-black uppercase tracking-widest text-white/70">Hygiene Check</p>
                </div>
                <div className="text-center md:border-t-0 md:pt-0 border-t border-white/10 pt-4">
                    <p className="text-4xl font-black text-white mb-0.5">4.9<span className="text-saffron-200">★</span></p>
                    <p className="text-sm font-black uppercase tracking-widest text-white/70">Rating</p>
                </div>
            </div>
        </div>
      </div>

      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-5">
            <div className="mb-12">
                <h2 className="text-4xl font-black italic text-white mb-2 uppercase">Core <span className="text-primary">Services</span></h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group glass-card rounded-[2rem] overflow-hidden transition transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10"></div>
                        <img alt="Executive Lunches" className="w-full h-full object-cover" src="https://partycart.in/wp-content/uploads/2025/09/lunch.jpg"/>
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Premium</span>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-3 italic">Event Catering</h3>
                        <p className="text-gray-400 text-sm mb-6">Full meal services including breakfast, lunch, or dinner. Indian banquets and multiple cuisine options available.</p>
                        <div className="flex items-center justify-between">
                            <span className="text-saffron font-bold text-xs uppercase">Up to 100 Guests</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">north_east</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group glass-card rounded-[2rem] overflow-hidden transition transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10"></div>
                        <img alt="Team Events" className="w-full h-full object-cover" src="https://partycart.in/wp-content/uploads/2025/09/4-1.jpg"/>
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 bg-saffron text-dark text-[10px] font-bold rounded-full uppercase tracking-tighter">Hot Boxes</span>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-3 italic">Corporate & Large Events</h3>
                        <p className="text-gray-400 text-sm mb-6">Our temperature-controlled service ensures your food arrives hot and stays warm for 6 hours.</p>
                        <div className="flex items-center justify-between">
                            <span className="text-saffron font-bold text-xs uppercase">Enquire Now</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">north_east</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};