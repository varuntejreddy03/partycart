import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { trackQuoteRequest } from '../utils/analytics';

export const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    eventType: 'House Party',
    guestCount: '',
    date: '',
    name: '',
    mobile: '',
    preferences: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackQuoteRequest();
    
    // Construct WhatsApp Message
    const text = `*New Booking Enquiry from PartyCart Website*%0A%0A` +
                 `*Event Type:* ${formData.eventType}%0A` +
                 `*Guests:* ${formData.guestCount}%0A` +
                 `*Date:* ${formData.date}%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Mobile:* ${formData.mobile}%0A` +
                 `*Preferences:* ${formData.preferences}`;
    
    // WhatsApp Phone Number
    const phoneNumber = "917396737700";
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-dark min-h-screen relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[40vh] h-[40vh] bg-secondary/10 rounded-full blur-[80px]"></div>
            <span className="material-icons-round absolute top-[15%] right-[10%] text-primary/10 text-8xl rotate-12">local_fire_department</span>
            <span className="material-icons-round absolute bottom-[20%] left-[5%] text-accent/10 text-6xl -rotate-12">grain</span>
        </div>

        <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-lg rotate-3">
                        <span className="material-icons-round text-white text-lg">lunch_dining</span>
                    </div>
                    <span className="font-extrabold text-lg tracking-tighter italic uppercase text-white">Party<span className="text-primary">cart</span></span>
                </div>
                <Link to={AppRoutes.HOME} className="text-gray-400 hover:text-white">
                    <span className="material-icons-round">close</span>
                </Link>
            </div>
        </nav>

        <main className="relative z-10 pt-24 pb-32 px-4 max-w-lg mx-auto">
            <div id="quote-container">
                <header className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        Easy Booking
                    </div>
                    <h1 className="text-4xl font-black italic text-white leading-[0.9] tracking-tight mb-4">
                        ORDER <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">YOUR NEXT</span> <br/>
                        <span className="text-stroke text-transparent">EXPERIENCE</span>
                    </h1>
                    <p className="text-gray-400 text-sm border-l-2 border-primary pl-3">
                        Tell us about your event. We'll curate the perfect menu.
                    </p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">Event Details</h3>
                        <div className="relative">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Event Type</label>
                            <select 
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="glass-input w-full rounded-2xl px-4 py-4 text-white appearance-none focus:ring-0 bg-dark/80 border-white/10"
                            >
                                <option className="bg-dark">House Party</option>
                                <option className="bg-dark">Corporate Lunch</option>
                                <option className="bg-dark">Birthday / Occasion</option>
                                <option className="bg-dark">Live Counter Request</option>
                            </select>
                            <span className="material-icons-round absolute right-4 top-[2.4rem] text-gray-500 pointer-events-none">expand_more</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Guest Count</label>
                                <input 
                                    name="guestCount"
                                    value={formData.guestCount}
                                    onChange={handleChange}
                                    className="glass-input w-full rounded-2xl px-4 py-4 text-white placeholder-gray-500 bg-dark/80 focus:ring-0 border-white/10" 
                                    placeholder="Min 10" 
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Date</label>
                                <input 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="glass-input w-full rounded-2xl px-4 py-4 text-white placeholder-gray-500 bg-dark/80 focus:ring-0 border-white/10" 
                                    type="date" 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 pt-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">Contact Information</h3>
                        <div className="relative">
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="glass-input w-full rounded-2xl px-4 py-4 text-white placeholder-gray-500 bg-dark/80 focus:ring-0 border-white/10" 
                                placeholder="Your Name" 
                                type="text"
                                required
                            />
                        </div>
                        <div className="relative">
                            <input 
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="glass-input w-full rounded-2xl px-4 py-4 text-white placeholder-gray-500 bg-dark/80 focus:ring-0 border-white/10" 
                                placeholder="Mobile Number" 
                                type="tel"
                                required
                            />
                        </div>
                        <div className="relative">
                            <textarea 
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                                className="glass-input w-full rounded-2xl px-4 py-4 text-white placeholder-gray-500 bg-dark/80 focus:ring-0 resize-none border-white/10" 
                                placeholder="Cuisine preferences (e.g. Indian Banquet, Party Snacks)" 
                                rows={3}
                            ></textarea>
                        </div>
                    </div>
                    <div className="pt-6">
                        <button className="w-full bg-gradient-to-r from-primary to-orange-600 text-white font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_20px_40px_rgba(255,87,34,0.4)] transition transform active:scale-95 flex items-center justify-center gap-3" type="submit">
                            PLACE ENQUIRY ON WHATSAPP <span className="material-icons-round">whatsapp</span>
                        </button>
                        <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">Available on Yumzy App</p>
                    </div>
                </form>
            </div>
        </main>
    </div>
  );
};