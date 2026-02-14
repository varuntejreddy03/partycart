import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

const PHONE = '917396737700';
const PHONE_DISPLAY = '7396737700';
const ADMIN_PHONE = '917396737700';

const socials = [
    {
        name: 'Instagram',
        handle: '@partycart_yumzy',
        url: 'https://www.instagram.com/partycart_yumzy',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
        color: 'from-purple-500 to-pink-500',
        hoverBg: 'hover:bg-pink-500/10',
        borderColor: 'border-pink-500/20',
        lightColor: 'text-pink-400'
    },
    {
        name: 'Facebook',
        handle: 'PartyCart by Yumzy',
        url: 'https://www.facebook.com/yumzyapp',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        color: 'from-blue-500 to-blue-600',
        hoverBg: 'hover:bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        lightColor: 'text-blue-400'
    },
    {
        name: 'LinkedIn',
        handle: 'Yumzy',
        url: 'https://www.linkedin.com/company/yumzy-app/',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: 'from-sky-500 to-blue-600',
        hoverBg: 'hover:bg-sky-500/10',
        borderColor: 'border-sky-500/20',
        lightColor: 'text-sky-400'
    },
    {
        name: 'YouTube',
        handle: 'Yumzy',
        url: 'https://www.youtube.com/@yumzyapp',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        color: 'from-red-500 to-red-600',
        hoverBg: 'hover:bg-red-500/10',
        borderColor: 'border-red-500/20',
        lightColor: 'text-red-400'
    },
];

export const Contact: React.FC = () => {
    const openWhatsApp = () => {
        const text = encodeURIComponent('Hi PartyCart! I would like to enquire about party catering services.');
        window.open(`https://wa.me/${ADMIN_PHONE}?text=${text}`, '_blank');
    };

    return (
        <div className="bg-dark min-h-screen relative overflow-x-hidden pt-20">
            {/* ═══════════════════════════════════════
                 PREMIUM BACKGROUND
               ═══════════════════════════════════════ */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[40vh] h-[40vh] bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow font-delay-2000"></div>
                <div className="absolute top-[40%] right-[10%] w-[30vh] h-[30vh] bg-accent/5 rounded-full blur-[80px] animate-pulse-slow font-delay-5000"></div>

                {/* Noise overlays */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* ═══════════════════════════════════════
                 HERO SECTION
               ═══════════════════════════════════════ */}
            <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-10 backdrop-blur-md animate-fade-in shadow-xl shadow-primary/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        PLAN THE PERFECT CELEBRATION
                    </div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 animate-fade-in">
                        Let's Plan Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-primary animate-gradient bg-[length:200%_auto]">
                            Perfect Party
                        </span>
                    </h1>

                    <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium px-4 animate-fade-in [animation-delay:200ms]">
                        Hyderabad's elite party food destination. From intimate gatherings to grand celebrations, we bring the best bawarchis and chefs to your home.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:400ms]">
                        <button
                            onClick={openWhatsApp}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-black text-base uppercase tracking-wider shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.05] active:scale-95 transition-all duration-300 group"
                        >
                            <span className="material-icons-round text-2xl group-hover:rotate-12 transition-transform">chat</span>
                            Discuss Your Event
                        </button>
                        <a
                            href={`tel:+${PHONE}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
                        >
                            <span className="material-icons-round text-2xl">call</span>
                            Quick Enquiry
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 CONTACT OPTIONS GRID
               ═══════════════════════════════════════ */}
            <section className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Primary Contact (WhatsApp) */}
                    <div
                        onClick={openWhatsApp}
                        className="glass-card group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border border-white/10 hover:border-primary/40 transition-all duration-500 cursor-pointer shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                            <span className="material-icons-round text-[120px] rotate-12">auto_awesome</span>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                            <span className="material-icons-round text-primary text-3xl">chat_bubble</span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3">WhatsApp Us</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                            Message our event planning team for curated menus and custom packages.
                        </p>

                        <div className="flex items-center gap-3 text-primary font-black text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                            Send Message
                            <span className="material-icons-round">arrow_forward</span>
                        </div>
                    </div>

                    {/* Secondary Contact (Phone) */}
                    <a
                        href={`tel:+${PHONE}`}
                        className="glass-card group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border border-white/10 hover:border-secondary/40 transition-all duration-500 shadow-2xl"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-500">
                            <span className="material-icons-round text-secondary text-3xl">phone_iphone</span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3">Direct Call</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-2 font-medium">Speak with our party consultants.</p>
                        <p className="text-3xl font-black text-white mb-8 tracking-tighter">{PHONE_DISPLAY}</p>

                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                            <span className="material-icons-round text-sm">schedule</span>
                            9 AM – 10 PM
                        </div>
                    </a>

                    {/* Location Card */}
                    <div className="glass-card group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border border-white/10 lg:col-span-1 md:col-span-2 shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                            <span className="material-icons-round text-accent text-3xl">location_on</span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3">Hyderabad</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            Premium delivery across Banjara Hills, Jubilee Hills, Gachibowli, & more.
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                            SERVICE AREA: CITY-WIDE
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 SOCIAL CONNECT
               ═══════════════════════════════════════ */}
            <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                    <div className="max-w-md text-center md:text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            STAY CONNECTED
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">Social Vibes</h2>
                        <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed">
                            Watch our live counters, event highlights, and latest menu launches on our social channels.
                        </p>
                    </div>

                    <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {socials.map((s) => (
                            <a
                                key={s.name}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {s.icon}
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{s.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Social Feed Banner */}
                <div className="glass-card rounded-[3rem] p-6 sm:p-12 border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-primary/[0.03] overflow-hidden relative">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
                                <img
                                    src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop"
                                    alt="Catering"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                                            <span className="material-icons-round text-xl">stars</span>
                                        </div>
                                        <div className="text-white font-black text-sm">#PartyCartHyderbad</div>
                                    </div>
                                    <p className="text-gray-300 text-xs font-medium">Transforming house parties into gourmet experiences.</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center lg:text-left">
                            <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-tight">
                                Join our community of<br />
                                <span className="text-primary tracking-tighter">5,000+ Happy Hosts</span>
                            </h3>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Live Counters</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Home Bawarchis</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Premium Decor</span>
                            </div>
                            <button
                                onClick={openWhatsApp}
                                className="px-8 py-4 rounded-2xl border border-primary/30 text-primary font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5"
                            >
                                Inquire Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 LAST MILE CTA
               ═══════════════════════════════════════ */}
            <section className="relative z-10 pb-32 px-4">
                <div className="max-w-4xl mx-auto glass-card rounded-[3.5rem] p-12 sm:p-20 border border-primary/20 bg-dark/60 text-center relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <span className="material-icons-round text-primary text-6xl mb-8 block animate-bounce-subtle">celebration</span>
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                        Ready to Start Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Order?</span>
                    </h2>
                    <p className="text-gray-400 text-lg sm:text-xl font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                        Don't stress over the menu. Choose from our curated vendors and enjoy your party!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link
                            to={AppRoutes.VENDORS}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <span className="material-icons-round">restaurant_menu</span>
                            Browse Menus
                        </Link>
                        <button
                            onClick={openWhatsApp}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
                        >
                            Custom Package
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};