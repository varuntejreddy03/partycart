import React, { useState, useEffect } from 'react';

const quotes = [
  "Good food is the foundation of genuine happiness.",
  "People who love to eat are always the best people.",
  "First we eat, then we do everything else.",
  "Life is uncertain. Eat dessert first.",
  "Cooking is love made visible.",
  "A party without cake is just a meeting.",
];

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    // 2.5 seconds total loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center overflow-hidden">
      {/* ═══════════════════════════════════════
           PREMIUM ANIMATED BACKGROUND
         ═══════════════════════════════════════ */}

      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black"></div>

      {/* 2. Animated Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vh] h-[70vh] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vh] h-[70vh] bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vh] h-[50vh] bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      {/* 3. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* 4. Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Logo Animation */}
        <div className="mb-10 relative">
          <div className="w-24 h-24 rounded-3xl bg-surface border border-white/5 shadow-2xl flex items-center justify-center p-3 animate-bounce-subtle">
            <img
              src="https://partycart.in/wp-content/uploads/2025/09/partycartORG_logonobg.png"
              alt="PartyCart"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          {/* Glow */}
          <div className="absolute inset-0 bg-primary/20 blur-xl -z-10 animate-pulse"></div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-black italic text-white mb-2 tracking-tight">
          PARTY<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">CART</span>
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-12">By Yumzy</p>

        {/* Loader Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-8 relative">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-orange-500 to-primary w-full animate-loading-bar rounded-full shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"></div>
        </div>

        {/* Quote */}
        <p className="text-gray-400 text-sm font-medium italic animate-fade-in relative">
          "<span className="text-white">{quote}</span>"
        </p>
      </div>
    </div>
  );
};