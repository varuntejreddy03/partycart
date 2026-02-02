import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const text = `*Contact Request from PartyCart Website*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Message:* ${formData.message}`;
    
    // WhatsApp Phone Number
    const phoneNumber = "917396737700";
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-dark min-h-screen relative overflow-x-hidden">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[40vh] h-[40vh] bg-secondary/10 rounded-full blur-[80px]"></div>
            <span className="material-icons-round absolute top-[15%] right-[10%] text-primary/10 text-8xl rotate-12">support_agent</span>
            <span className="material-icons-round absolute bottom-[20%] left-[5%] text-accent/10 text-6xl -rotate-12">chat</span>
        </div>

        <section className="relative pt-24 pb-16 px-4 z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left Column: Info */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        #partycart_yumzy
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black italic text-white leading-[0.9] tracking-tight mb-6 uppercase">
                        PartyCart <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">By Yumzy</span>
                    </h1>
                    
                    <p className="text-lg text-white font-bold mb-2">Hyderabad’s premium party food provider 🍽️✨</p>
                    <p className="text-gray-400 mb-8">You host the party. We’ll handle the food.</p>
                    
                    <div className="flex items-center gap-3 mb-10">
                        <span className="material-icons-round text-primary text-3xl">phone</span>
                        <div>
                             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contact Us</p>
                             <p className="text-3xl font-black text-white">7396737700</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <a href="https://play.google.com/store/search?q=yumzy&c=apps&hl=en-IN" target="_blank" rel="noopener noreferrer" className="glass-card p-6 rounded-3xl flex items-center gap-6 group hover:border-primary/50 transition duration-300">
                             <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center group-hover:scale-110 transition overflow-hidden">
                                <img src="https://partycart.in/wp-content/uploads/2025/09/Yuumzy-App-Qr.png" alt="Download App" className="w-full h-full object-contain" />
                             </div>
                             <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Available on</p>
                                <p className="text-xl font-bold text-white">Google Play</p>
                             </div>
                        </a>
                        
                        <a href="https://apps.apple.com/in/app/yumzy-online-food-delivery/id1476665049" target="_blank" rel="noopener noreferrer" className="glass-card p-6 rounded-3xl flex items-center gap-6 group hover:border-primary/50 transition duration-300">
                             <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center group-hover:scale-110 transition overflow-hidden">
                                <span className="material-icons-round text-3xl text-black">apple</span>
                             </div>
                             <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Available on</p>
                                <p className="text-xl font-bold text-white">App Store</p>
                             </div>
                        </a>

                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/partycart_yumzy" target="_blank" rel="noopener noreferrer" className="glass-card p-4 rounded-2xl flex items-center justify-center gap-2 text-white hover:text-primary transition flex-1">
                                <span className="text-lg font-bold">Instagram</span>
                            </a>
                            <a href="https://www.linkedin.com/company/yumzy-app/" target="_blank" rel="noopener noreferrer" className="glass-card p-4 rounded-2xl flex items-center justify-center gap-2 text-white hover:text-primary transition flex-1">
                                <span className="text-lg font-bold">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="relative">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            
                            <h3 className="text-2xl font-black italic text-white mb-6 relative z-10">ENQUIRE NOW</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Your Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    type="text" 
                                    className="glass-input w-full rounded-2xl px-5 py-4 text-white focus:ring-0 placeholder-gray-500 bg-dark/80 border-white/10" 
                                    placeholder="John Doe" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</label>
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    type="email" 
                                    className="glass-input w-full rounded-2xl px-5 py-4 text-white focus:ring-0 placeholder-gray-500 bg-dark/80 border-white/10" 
                                    placeholder="john@example.com" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required 
                                    rows={4} 
                                    className="glass-input w-full rounded-2xl px-5 py-4 text-white focus:ring-0 placeholder-gray-500 bg-dark/80 resize-none border-white/10" 
                                    placeholder="Tell us about your event..."
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-white text-dark font-black py-5 rounded-2xl shadow-xl hover:bg-gray-100 transition transform active:scale-95 flex items-center justify-center gap-2">
                                SEND ON WHATSAPP <span className="material-icons-round">whatsapp</span>
                            </button>
                            </form>
                    </div>
                </div>
            </div>
        </section>

        {/* Service Areas */}
        <section className="relative py-20 px-4 bg-surface/30 z-10">
            <div className="max-w-7xl mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-black italic text-white mb-2">SERVICE <span className="text-primary">AREAS</span></h2>
                    <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                
                <div className="flex justify-center">
                     <div className="glass-card p-6 rounded-2xl text-center hover:bg-white/5 transition cursor-default px-12 border border-primary/20 bg-primary/5">
                         <span className="material-icons-round text-primary mb-3 text-4xl">location_on</span>
                         <p className="font-black text-white text-xl uppercase tracking-widest">Serving All Hyderabad</p>
                     </div>
                </div>
            </div>
        </section>
    </div>
  );
};