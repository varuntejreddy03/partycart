import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

export const HouseParty: React.FC = () => {
  return (
    <div className="bg-[#0F1115] min-h-screen">
       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-emerald-600/10 to-transparent"></div>
            <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] bg-yellow-500/5 rounded-full blur-[120px]"></div>
        </div>
      <section className="relative pt-32 pb-16 px-5 z-10">
        <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Minimum 10+ Guests
            </div>
            <h1 className="text-6xl font-black italic leading-[0.85] tracking-tighter mb-4 flex flex-col uppercase">
                <span>Cozy</span>
                <span className="text-stroke text-white/80">House</span>
                <span className="text-yellow-500">Parties</span>
            </h1>
            <p className="text-gray-400 text-base max-w-[280px] leading-relaxed mb-10 border-l-2 border-emerald-500 pl-4">
                Curated meals from unique home chefs and trusted vendors. Authentic cooking practices for your special moments.
            </p>
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group mb-12 max-w-md">
                <img alt="Premium Catering" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-1000" src="https://partycart.in/wp-content/uploads/2025/09/party-order.jpg"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-card p-5 rounded-3xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-1">Authentic</p>
                            <p className="text-xl font-black italic">Home Chef Network</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-black">restaurant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="relative py-12 bg-emerald-500 bg-noise transform -skew-y-3 z-20 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 transform skew-y-3 flex gap-8 items-center overflow-x-auto hide-scroll whitespace-nowrap">
            <div className="flex-shrink-0 flex flex-col">
                <span className="text-4xl font-black text-black">10-50</span>
                <span className="text-[10px] font-black uppercase text-black/60 tracking-tighter">Guest Capacity</span>
            </div>
            <div className="w-px h-10 bg-black/10 flex-shrink-0"></div>
            <div className="flex-shrink-0 flex flex-col">
                <span className="text-4xl font-black text-black">100%</span>
                <span className="text-[10px] font-black uppercase text-black/60 tracking-tighter">Hygiene Checked</span>
            </div>
            <div className="w-px h-10 bg-black/10 flex-shrink-0"></div>
            <div className="flex-shrink-0 flex flex-col">
                <span className="text-4xl font-black text-black">4.9</span>
                <span className="text-[10px] font-black uppercase text-black/60 tracking-tighter">User Rating</span>
            </div>
        </div>
    </div>

    <section className="relative py-24 px-5 z-10">
        <div className="mb-12">
            <h2 className="text-4xl font-black italic uppercase leading-none tracking-tighter mb-2">
                Service <span className="text-emerald-500">Selection</span>
            </h2>
            <div className="w-12 h-1 bg-yellow-500"></div>
        </div>
        <div className="space-y-6 max-w-2xl">
            <div className="glass-card rounded-[2rem] p-6 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                        <img alt="House Parties" className="w-full h-full object-cover" src="https://partycart.in/wp-content/uploads/2025/09/party-order.jpg"/>
                    </div>
                    <Link to={AppRoutes.QUOTE} className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined">arrow_outward</span>
                    </Link>
                </div>
                <div>
                    <h3 className="text-2xl font-black italic uppercase mb-2">Party Orders</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">Minimum 10+ guests. Curated meals for house parties, birthdays, and get-togethers.</p>
                </div>
            </div>
            
            <div className="glass-card rounded-[2rem] p-6 flex flex-col gap-6 relative overflow-hidden group">
                 <div className="relative flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                        <img alt="Birthdays" className="w-full h-full object-cover" src="https://partycart.in/wp-content/uploads/2025/09/snacks.jpg"/>
                    </div>
                    <Link to={AppRoutes.QUOTE} className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined">arrow_outward</span>
                    </Link>
                </div>
                <div>
                    <h3 className="text-2xl font-black italic uppercase mb-2 text-yellow-500">For Occasions</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">Prasadam meals for poojas, pure-veg festive treats, and specialized menus tailored to your ceremony.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="relative py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-[#FF5A1F] bg-noise"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-transparent mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="material-symbols-outlined text-white/20 text-[120px] absolute -top-12 -left-6 rotate-12 pointer-events-none">celebration</span>
            <h2 className="text-5xl font-black italic leading-[0.85] tracking-tight text-black mb-8">
                READY TO <br/>IGNITE THE <br/>PARTY?
            </h2>
            <div className="flex flex-col gap-4">
                <Link to={AppRoutes.QUOTE} className="bg-black text-white text-sm font-black uppercase tracking-widest py-5 px-10 rounded-full shadow-2xl inline-block">
                    Order Now
                </Link>
                <a href="https://play.google.com/store/search?q=yumzy&c=apps&hl=en-IN" target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-md border border-white/30 text-black text-sm font-bold uppercase tracking-widest py-5 px-10 rounded-full flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">smartphone</span> Get Yumzy App
                </a>
            </div>
        </div>
    </section>
    </div>
  );
};