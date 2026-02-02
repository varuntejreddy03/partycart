import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

const menuData = {
  title: "What We Serve",
  categories: [
    {
      id: "breakfast",
      name: "Breakfast",
      icon: "🌅",
      tagline: "Pick from a variety of breakfast delicacies for your next party",
      items: [
        {
          name: "Continental",
          description: "Savoury platters with eggs, waffles, and treats to kickstart your day with a perfect English touch",
          keywords: ["eggs", "waffles", "English breakfast", "savoury"],
          cuisine_type: "Western"
        },
        {
          name: "Mughlai",
          description: "Hearty, meat-rich breakfast crafted by true Mughlai chefs with authentic spices and recipes",
          keywords: ["meat-rich", "authentic spices", "Mughlai chefs", "hearty"],
          cuisine_type: "Mughlai"
        },
        {
          name: "North Indian",
          description: "Plentiful spreads of rotis, curries and wholesome meals that bring North India to your plate",
          keywords: ["rotis", "curries", "wholesome", "North India"],
          cuisine_type: "North Indian"
        },
        {
          name: "South Indian",
          description: "Authentic dosas, idlis, poha and wholesome meals to give your mornings the perfect push",
          keywords: ["dosas", "idlis", "poha", "authentic"],
          cuisine_type: "South Indian"
        },
        {
          name: "Telugu",
          description: "Classic flavours of Telugu kitchens—upma, ghee idlis, ghee dosas and more, straight to your table",
          keywords: ["upma", "ghee idlis", "ghee dosas", "Telugu cuisine"],
          cuisine_type: "Telugu"
        },
        {
          name: "Prasadam Eats",
          description: "Tirupati-style vadas and pure veg delicacies, perfect for poojas and auspicious occasions",
          keywords: ["Tirupati", "vadas", "pure veg", "poojas", "auspicious"],
          cuisine_type: "Pure Vegetarian",
          special_occasions: ["pooja", "festivals", "religious ceremonies"]
        }
      ]
    },
    {
      id: "snacks",
      name: "Snacks",
      icon: "🍢",
      tagline: "Order snacks in kilos for happy hours, get-togethers & more",
      items: [
        {
          name: "Kebabs in Kilos",
          description: "Juicy coal-sigdi kebabs served by the kilo—ideal for evening banter and hearty get-togethers",
          keywords: ["kebabs", "juicy", "coal-sigdi", "evening snacks"],
          cuisine_type: "Indian",
          best_for: ["evening parties", "get-togethers"]
        },
        {
          name: "Indo-Chinese",
          description: "A spicy and zesty fusion of Indian flavours with Chinese classics for a crowd-pleasing snack",
          keywords: ["spicy", "zesty", "fusion", "crowd-pleasing"],
          cuisine_type: "Indo-Chinese Fusion"
        },
        {
          name: "Continental Bites",
          description: "Sandwiches, wraps and burgers made to match the perfect sunset vibe at your next gathering",
          keywords: ["sandwiches", "wraps", "burgers", "sunset vibe"],
          cuisine_type: "Western",
          best_for: ["casual gatherings", "evening parties"]
        },
        {
          name: "Mithai",
          description: "From laddus to double ka meeta, kheer and rabdi, our expert vendors craft authentic sweets for every celebration",
          keywords: ["laddus", "double ka meeta", "kheer", "rabdi", "sweets"],
          cuisine_type: "Indian Sweets",
          best_for: ["celebrations", "festivals", "special occasions"]
        }
      ]
    },
    {
      id: "lunch_dinner",
      name: "Lunch/Dinner",
      icon: "🍽️",
      tagline: "Order for all party sizes, from multi-cuisines",
      items: [
        {
          name: "Biryani in Kilos",
          description: "Wood-fired, handi-cooked biryanis sold by the kilo—perfect for plentiful parties and big feasts",
          keywords: ["biryani", "wood-fired", "handi", "feasts"],
          cuisine_type: "Indian",
          best_for: ["large parties", "big feasts"]
        },
        {
          name: "Home Kitchen",
          description: "Authentic homemade meals prepared by verified home chefs, bringing comfort to your celebrations",
          keywords: ["homemade", "authentic", "comfort food", "home chefs"],
          cuisine_type: "Multi-cuisine",
          vendor_type: "verified home chefs"
        },
        {
          name: "Kebabs & Curries",
          description: "Coal-sigdi kebabs paired with soulful Telugu curries, made to turn your occasion into a feast",
          keywords: ["kebabs", "Telugu curries", "coal-sigdi", "feast"],
          cuisine_type: "Telugu",
          pairing: "kebabs with curries"
        },
        {
          name: "Telugu Ruchulu",
          description: "From gongura chicken to ragi sangati and natukodi, savour the rich taste of Telugu traditions",
          keywords: ["gongura chicken", "ragi sangati", "natukodi", "Telugu traditions"],
          cuisine_type: "Traditional Telugu",
          special_dishes: ["gongura chicken", "ragi sangati", "natukodi"]
        },
        {
          name: "Ankapur Style Chicken",
          description: "The city's favourite meat—spicy Ankapur chicken and mutton combos served with authentic flair",
          keywords: ["Ankapur chicken", "mutton", "spicy", "city favourite"],
          cuisine_type: "Ankapur Style",
          specialty: "Hyderabad city favourite",
          meat_types: ["chicken", "mutton"]
        },
        {
          name: "Desi Khana",
          description: "A spread of North Indian delights—rich gravies, soft rotis, and all-time favourites for your party",
          keywords: ["rich gravies", "soft rotis", "North Indian", "all-time favourites"],
          cuisine_type: "North Indian"
        }
      ]
    }
  ]
};

export const Bulk: React.FC = () => {
  return (
    <div className="bg-[#0A0F1A] min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40vh] h-[40vh] bg-secondary/10 rounded-full blur-[80px]"></div>
      </div>

      <section className="relative pt-28 pb-16 px-4 z-10 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Chef On Demand
        </div>
        <h1 className="text-6xl font-black italic text-white leading-[0.85] tracking-tighter mb-8">
            LIVE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">COUNTERS</span> <br/>
            BY <span className="text-stroke text-transparent">KILO</span>
        </h1>
        <p className="text-gray-400 text-lg border-l-4 border-primary pl-4 max-w-xs mb-10 leading-relaxed">
            Order meat by the kilo. Cooked live at your party by elite chefs for a premium experience.
        </p>
        <div className="flex flex-col gap-4 max-w-md">
            <Link to={AppRoutes.QUOTE} className="flex items-center justify-center gap-2 w-full py-5 bg-white text-dark font-black rounded-2xl uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_35px_rgba(255,87,34,0.6)] hover:-translate-y-0.5 transition-all duration-300">
                Book Live Counter <span className="material-symbols-outlined">outdoor_grill</span>
            </Link>
            <a href="https://play.google.com/store/search?q=yumzy&c=apps&hl=en-IN" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-white/10 transition">
                <span className="material-symbols-outlined text-secondary">smartphone</span> Yumzy App
            </a>
        </div>
      </section>

      <section className="relative py-12 px-4 z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black italic mb-8 uppercase tracking-tighter text-white">THE <span className="text-primary">EXPERIENCE</span></h2>
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl h-64 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <img alt="Corporate Bulk" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" src="https://partycart.in/wp-content/uploads/2025/09/live.jpg"/>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg shadow-secondary/20">Elite Chefs</span>
                    <h3 className="text-3xl font-black text-white italic">Live Cooking</h3>
                    <p className="text-gray-300 text-xs mt-1">Cooked just the way your guests like it, right at the venue.</p>
                </div>
            </div>
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl h-64 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <img alt="Celebration Bulk" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" src="https://partycart.in/wp-content/uploads/2025/09/freepik__candid-photography-with-natural-textures-and-highl__82969.png"/>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg shadow-secondary/20">Custom</span>
                    <h3 className="text-3xl font-black text-white italic">Meat by Kilo</h3>
                    <p className="text-gray-300 text-xs mt-1">Select your cuts and quantity. We handle the rest.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-surface/30 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black italic text-white mb-12 text-center uppercase tracking-tighter">
                HOW IT <span className="text-secondary">WORKS</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
                 <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20"></div>
                <div className="relative flex gap-8 md:block md:text-center">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:mx-auto md:mb-6 bg-primary text-white font-black text-xl flex items-center justify-center rounded-2xl rotate-3 shadow-[0_0_20px_rgba(255,87,34,0.4)]">
                        1
                    </div>
                    <div className="pt-1">
                        <h3 className="text-xl font-bold text-white mb-2">Select Meat</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Choose your preferred meats and quantity by the kilo on the app.</p>
                    </div>
                </div>
                <div className="relative flex gap-8 md:block md:text-center">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:mx-auto md:mb-6 bg-secondary text-white font-black text-xl flex items-center justify-center rounded-2xl -rotate-3 shadow-[0_0_20px_rgba(0,200,83,0.4)]">
                        2
                    </div>
                    <div className="pt-1">
                        <h3 className="text-xl font-bold text-white mb-2">We Send Chefs</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Our elite chefs arrive at your party location with all necessary equipment.</p>
                    </div>
                </div>
                <div className="relative flex gap-8 md:block md:text-center">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:mx-auto md:mb-6 bg-accent text-white font-black text-xl flex items-center justify-center rounded-2xl rotate-6 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                        3
                    </div>
                    <div className="pt-1">
                        <h3 className="text-xl font-bold text-white mb-2">Live Cooking</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Enjoy fresh, hot food cooked live exactly to your guests' taste.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW MENU SECTION */}
      <section className="relative py-24 px-4 z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
             <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -z-10"></div>
             <span className="bg-[#0A0F1A] px-6 relative inline-block">
                <h2 className="text-4xl md:text-5xl font-black italic text-white mb-2 uppercase tracking-tighter">
                    {menuData.title}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"></div>
            </span>
        </div>

        <div className="space-y-24">
            {menuData.categories.map((category) => (
                <div key={category.id} className="relative">
                     <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-8 border-b border-white/10 pb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-2 md:mb-0 shadow-lg border border-white/5">
                             {category.icon}
                        </div>
                        <div>
                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tight leading-none mb-2">{category.name}</h3>
                            <p className="text-gray-400 text-sm font-medium tracking-wide">{category.tagline}</p>
                        </div>
                     </div>
                     
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.items.map((item, idx) => (
                            <div key={idx} className="glass-card rounded-[1.5rem] hover:bg-white/5 transition duration-500 group border border-white/5 hover:border-white/20 hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition duration-500"></div>
                                
                                <div className="p-6 flex flex-col flex-grow relative z-20">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-xl font-black italic text-white group-hover:text-primary transition-colors">{item.name}</h4>
                                        {item.cuisine_type && (
                                             <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">{item.cuisine_type}</span>
                                        )}
                                    </div>
                                     <p className="text-gray-400 text-xs leading-relaxed mb-6">{item.description}</p>
                                     <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.keywords?.slice(0, 3).map((keyword, kIdx) => (
                                            <span key={kIdx} className="px-2 py-1 rounded-md bg-white/5 text-[9px] uppercase font-bold text-gray-500 border border-white/5 tracking-wider">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            ))}
        </div>
      </section>

      <section className="relative py-12 bg-gradient-to-r from-primary to-orange-600 bg-noise z-20 border-y border-white/10">
        <div className="grid grid-cols-2 gap-y-8 px-6 text-center max-w-7xl mx-auto md:grid-cols-4">
            <div>
                <p className="text-4xl font-black text-white">50<span className="text-xs align-top">+</span></p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Chefs</p>
            </div>
            <div>
                <p className="text-4xl font-black text-white">20<span className="text-xs align-top">+</span></p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Cuisines</p>
            </div>
            <div>
                <p className="text-4xl font-black text-white">100%</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Fresh Meat</p>
            </div>
            <div>
                <p className="text-4xl font-black text-white">4.9</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Rating</p>
            </div>
        </div>
      </section>
    </div>
  );
};