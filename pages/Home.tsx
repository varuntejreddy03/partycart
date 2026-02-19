import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { ScrollAnimatedDiv } from '../components/ScrollAnimation';
import { TextReveal } from '../components/TextReveal';
import vendorJson from '../data.json';

type Restaurant = {
  name: string;
  category: string;
  description: string;
  image: string;
  distance_km: number;
  delivery_duration_min: number;
  is_veg: boolean;
  is_pure_veg?: boolean;
};

const allVendors = (vendorJson as any).restaurants as Restaurant[];

// Categories Data
const CATEGORIES = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    subtitle: 'Pick from a variety of breakfast delicasies for your next party',
    items: [
      {
        title: 'Continental',
        description: 'Savoury platters with eggs, waffles, and treats to kickstart your day with a perfect English touch',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/6f310a10-5d5a-11f0-90b1-d5e84dccc451/club-sandwich-with-orange-juice-black-glass-table.jpg' // Corporate Bites
      },
      {
        title: 'Mughlai',
        description: 'Hearty, meat-rich breakfast crafted by true Mughlai chefs with authentic spices and recipes.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/1a159ab0-baf6-11f0-83f5-877378295a33/5569728749c8a15e10a4bd308469b013.jpg' // Mughlai
      },
      {
        title: 'North Indian',
        description: 'Plentiful spreads of rotis, curries and wholesome meals that bring North India to your plate.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/52d111a0-5cb3-11f0-aa53-ab8b35060ee7/indian-hindu-veg-thali-food-platter-selective-focus%20%282%29.jpg' // Ankapur (looks indian)
      },
      {
        title: 'South Indian',
        description: 'Authentic dosas, idlis, poha and wholesome meals to give your mornings the perfect push.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/dec00a20-93b0-11f0-87c7-2df735b9b78b/breakfst.jpg' // Morning Kart
      },
      {
        title: 'Telugu',
        description: 'Classic flavours of Telugu kitchens—upma, ghee idlis, ghee dosas and more, straight to your table.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/a5d23930-5cb1-11f0-aa53-ab8b35060ee7/traditional-south-indian-meal-food-served-big-banana-leaf-food-platter-complete-thali-selective-focus%20%284%29.jpg' // Telugu Ruchulu
      },
      {
        title: 'Prasadam Eats',
        description: 'Tirupati-style vadas and pure veg delicacies, perfect for poojas and auspicious occasions.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/a1b72620-6ddd-11f0-8e4d-b9aea8cefd13/kerala-festival-rituals-vishu-festival-vishukkani-vishu-sight.jpg' // Aarti Bhojan
      }
    ]
  },
  {
    id: 'snacks',
    title: 'Snacks',
    subtitle: 'Order snacks in kilos for happy hours, get-togethers & more',
    items: [
      {
        title: 'Kebabs in Kilos',
        description: 'Juicy coal-sigdi kebabs served by the kilo—ideal for evening banter and hearty get-togethers.',
        image: 'https://laalsadev.sgp1.digitaloceanspaces.com/yumzy-v2-app/image-upload/InappAssets/Generic/Outlet_Inside_Livecounters.gif' // Live Kebab
      },
      {
        title: 'Indo-Chinese',
        description: 'A spicy and zesty fusion of Indian flavours with Chinese classics for a crowd-pleasing snack.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/53540e10-5e44-11f0-93ab-eb8319be7304/high-angle-thanksgiving-dinner-arrangement.jpg' // Indo Chinese Hub
      },
      {
        title: 'Continental Bites',
        description: 'Sandwiches, wraps and burgers made to match the perfect sunset vibe at your next gathering.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/6f310a10-5d5a-11f0-90b1-d5e84dccc451/club-sandwich-with-orange-juice-black-glass-table.jpg' // Coprorate bites
      },
      {
        title: 'Mithai',
        description: 'From laddus to double ka meeta, kheer and rabdi, our expert vendors craft authentic sweets for every celebration.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/017329b0-a349-11f0-ad6a-9d62ece71b41/tea%20party.png' // Tea party (maybe?)
      }
    ]
  },
  {
    id: 'lunch-dinner',
    title: 'Lunch/Dinner',
    subtitle: 'Order for all party sizes, from multi-cuisines',
    items: [
      {
        title: 'Biryani in Kilos',
        description: 'Wood-fired, handi-cooked biryanis sold by the kilo—perfect for plentiful parties and big feasts.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/91ad9a60-6f91-11f0-9fad-59d987d88733/top-view-eid-al-fitr-celebration-with-delicious-food%20%284%29.jpg' // Hyderabadi Shaadi
      },
      {
        title: 'Home Kitchen',
        description: 'Authentic homemade meals prepared by verified home chefs, bringing comfort to your celebrations.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/701b6720-5cb7-11f0-aa53-ab8b35060ee7/traditional-south-indian-meal-food-served-big-banana-leaf-food-platter-complete-thali-selective-focus%20%282%29.jpg' // Home Kitchen
      },
      {
        title: 'Kebabs & Curries',
        description: 'Coal-sigdi kebabs paired with soulful Telugu curries, made to turn your occasion into a feast.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/23f28390-5cb4-11f0-aa53-ab8b35060ee7/top-view-delicious-chicken-skewers-wooden-board-other-stuffs-black-table.jpg' // KiloKart
      },
      {
        title: 'Telugu Ruchulu',
        description: 'From gongura chicken to ragi sangati and natukodi, savour the rich taste of Telugu traditions.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/a5d23930-5cb1-11f0-aa53-ab8b35060ee7/traditional-south-indian-meal-food-served-big-banana-leaf-food-platter-complete-thali-selective-focus%20%284%29.jpg' // Telugu Ruchulu
      },
      {
        title: 'Ankapur Style Chicken',
        description: 'The city’s favourite meat—spicy Ankapur chicken and mutton combos served with authentic flair.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/52d111a0-5cb3-11f0-aa53-ab8b35060ee7/indian-hindu-veg-thali-food-platter-selective-focus%20%282%29.jpg' // Ankapur
      },
      {
        title: 'Desi Khana',
        description: 'A spread of North Indian delights—rich gravies, soft rotis, and all-time favourites for your party.',
        image: 'https://listing.sgp1.digitaloceanspaces.com/outlet_images/04a66870-fb52-11f0-bb0e-5fdd1b58b425/godavari%20ruchulu.png' // Godavari (placeholder)
      }
    ]
  }
];

// ... (imports remain)
// Remove useState for activeTab if it's the only state used.

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('breakfast');

  // Swipe Logic (using refs for synchronous tracking)
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = CATEGORIES.findIndex(c => c.id === activeTab);
      let nextIndex = currentIndex;

      if (isLeftSwipe) {
        // Swipe Left -> Next Tab
        nextIndex = (currentIndex + 1) % CATEGORIES.length;
      } else {
        // Swipe Right -> Previous Tab
        nextIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
      }
      setActiveTab(CATEGORIES[nextIndex].id);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative pt-20 pb-12 sm:pt-32 sm:pb-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20 text-center lg:text-left">
              {/* Mobile Mobile Blob Background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 lg:hidden pointer-events-none"></div>
              {/* WhatsApp Floating Icon */}
              <a
                href="https://wa.me/917396737700?text=Hi%20PartyCart!%20I'm%20interested%20in%20booking%20a%20party%20food%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed right-5 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce-subtle lg:hidden" style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
                aria-label="Chat on WhatsApp"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
              </a>

              <ScrollAnimatedDiv delay={200}>
                <div className="relative inline-block">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic text-content leading-none tracking-tight mb-4">
                    <span className="block mb-1"><TextReveal text="DISCOVER" delay={0.2} /></span>

                    <span className="block h-[1.1em] overflow-hidden mb-2">
                      <span
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient"
                        style={{
                          animation: 'slideUp 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards',
                          animationDelay: '0.4s',
                          opacity: 0,
                          transform: 'translateY(100%)',
                          lineHeight: 1
                        }}
                      >
                        FOOD
                      </span>
                    </span>

                    <span className="text-stroke text-transparent relative text-3xl sm:text-5xl md:text-6xl block">
                      <TextReveal text="NEAR YOU" delay={0.8} />
                      <span
                        className="absolute -top-6 -right-12 material-icons-round text-accent text-6xl rotate-12 opacity-80 drop-shadow-lg hidden sm:inline-block"
                        style={{ animation: 'float 4s ease-in-out infinite' }}
                      >
                        restaurant
                      </span>
                    </span>
                  </h1>
                </div>
              </ScrollAnimatedDiv>
              <ScrollAnimatedDiv delay={300}>
                <p className="mt-4 text-xl sm:text-2xl font-black text-content leading-snug mx-auto lg:mx-0 max-w-md lg:max-w-none">
                  Hyderabad's Premium Party Food Provider
                </p>
                <p className="mt-3 text-base sm:text-lg text-muted-custom max-w-lg leading-relaxed border-l-4 border-primary pl-4 italic mx-auto lg:mx-0 text-left lg:text-left inline-block lg:block">
                  You host the party. We'll handle the food.
                </p>
              </ScrollAnimatedDiv>
              <ScrollAnimatedDiv delay={400} className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to={AppRoutes.VENDORS} className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-yellow-500 text-white font-bold rounded-full hover:shadow-lg transition transform hover:scale-105 shadow-primary/30 min-w-[160px] sm:min-w-[200px] justify-center text-sm md:text-base">
                  Explore Menu <span className="material-icons-round">arrow_forward</span>
                </Link>
                <Link to={AppRoutes.CONTACT} className="flex items-center gap-2 px-6 py-3.5 bg-surface border border-border-custom text-content font-bold rounded-full hover:bg-surface/80 transition backdrop-blur-md min-w-[160px] sm:min-w-[200px] justify-center text-sm md:text-base">
                  <span className="material-icons-round text-secondary">support_agent</span> Enquire Now
                </Link>
              </ScrollAnimatedDiv>

              <ScrollAnimatedDiv delay={500} className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-custom bg-surface px-3 py-1.5 sm:px-4 sm:py-2 font-bold text-muted-custom shadow-sm">
                  <span className="material-icons-round text-xs sm:text-sm text-primary">verified</span>
                  20+ Cuisines
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-custom bg-surface px-3 py-1.5 sm:px-4 sm:py-2 font-bold text-muted-custom shadow-sm">
                  <span className="material-icons-round text-xs sm:text-sm text-secondary">schedule</span>
                  Same-Day Slots
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-custom bg-surface px-3 py-1.5 sm:px-4 sm:py-2 font-bold text-muted-custom shadow-sm">
                  <span className="material-icons-round text-xs sm:text-sm text-accent">payments</span>
                  Bulk Pricing
                </span>
              </ScrollAnimatedDiv>
            </div>

            {/* Enhanced Hero Image */}
            <ScrollAnimatedDiv delay={500} className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-[80px] animate-pulse-slow"></div>

              <div
                className="relative w-full aspect-square max-w-md lg:max-w-full transition-all duration-700"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                {/* Decorative border frame */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/20 transform translate-x-5 translate-y-5 z-0"></div>

                {/* Main Image */}
                <img
                  alt="Delicious Food"
                  className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl relative z-10 brightness-110 border border-white/10"
                  src="https://partycart.in/wp-content/uploads/2025/09/group-people-are-preparing-food-table-1-scaled.jpg"
                />

                {/* Badge 1: Trusted Vendors */}
                <div
                  className="absolute -bottom-8 -left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border-custom p-4 pr-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-subtle"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="bg-green-500/10 p-3 rounded-xl">
                    <span className="material-icons-round text-green-600 dark:text-green-400 text-2xl">verified_user</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-custom font-bold uppercase tracking-wider">Safety First</p>
                    <p className="text-xl font-black text-content">100% Verified</p>
                  </div>
                </div>

                {/* Badge 2: Rating */}
                <div
                  className="absolute top-10 -right-8 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border-custom p-3 px-5 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-subtle"
                  style={{ animationDelay: '0s' }}
                >
                  <span className="text-3xl font-black text-yellow-500 drop-shadow-sm">4.9 <span className="text-lg">★</span></span>
                  <p className="text-[10px] text-muted-custom font-bold uppercase tracking-wider">User Rating</p>
                </div>
              </div>
            </ScrollAnimatedDiv>
          </div>
        </div>
      </ScrollAnimatedDiv>

      {/* ═══════════════════════════════════════
           STATS BANNER
         ═══════════════════════════════════════ */}
      {/* ═══════════════════════════════════════
           STATS BANNER
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-12 bg-gradient-to-r from-primary to-yellow-500 bg-noise transform -skew-y-2 z-20 border-y border-white/10 shadow-[0_0_40px_rgba(255,183,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform skew-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">{allVendors.length}<span className="text-yellow-300">+</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Options</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">500<span className="text-yellow-300">+</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">4.9<span className="text-yellow-300">★</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">30<span className="text-yellow-300">min</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Avg Delivery</p>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>
      {/* ═══════════════════════════════════════
           WHAT WE SERVE SECTION (Categories - Sequential)
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black italic text-content mb-4">WHAT <span className="text-primary">WE SERVE</span></h2>
            <p className="text-muted-custom max-w-xl mx-auto text-lg">Explore our wide range of party delicacies, perfect for every occasion.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 border ${activeTab === cat.id
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                  : 'bg-surface text-muted-custom border-border-custom hover:bg-surface/80 hover:text-content hover:-translate-y-1'
                  }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            {CATEGORIES.map((cat) => (
              activeTab === cat.id && (
                <div key={cat.id} className="animate-fade-in relative z-10 space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-black text-content italic opacity-90">{cat.subtitle}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scroll md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
                    {cat.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={AppRoutes.VENDORS}
                        className="group relative block w-[85vw] sm:w-[350px] shrink-0 rounded-[2rem] overflow-hidden isolate snap-center aspect-[4/5] md:aspect-[3/4] shadow-lg md:shadow-2xl shadow-black/10 transition-transform duration-300 active:scale-95 md:active:scale-100"
                      >
                        {/* Image BG */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 ease-out will-change-transform"
                          loading="lazy"
                          decoding="async"
                        />

                        {/* Gradient Mesh - Simplified for Mobile */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                        {/* Floating Top Badge */}
                        <div className="absolute top-5 right-5 z-20">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center md:group-hover:bg-primary md:group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <span className="material-icons-round text-white text-lg md:text-xl -rotate-45 md:group-hover:rotate-0 transition-transform">arrow_forward</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                          <div className="transform transition-transform duration-500 md:group-hover:translate-y-0">
                            <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-2 md:mb-3 drop-shadow-lg text-white">
                              {item.title}
                            </h3>

                            <p className="text-gray-300 text-xs md:text-sm font-medium line-clamp-2 mb-4 leading-relaxed bg-black/20 md:backdrop-blur-md p-3 rounded-xl border border-white/5">
                              {item.description}
                            </p>

                            <div className="flex items-center gap-3 opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity">
                              <span className="h-8 md:h-10 px-4 md:px-6 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-wider flex items-center shadow-lg md:group-hover:bg-primary md:group-hover:text-white transition-colors duration-300">
                                View Menu
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to={AppRoutes.VENDORS} className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-border-custom text-content font-bold rounded-full hover:bg-surface/80 transition backdrop-blur-md group shadow-md">
              View Complete Menu <span className="material-icons-round group-hover:translate-x-1 transition-transform">east</span>
            </Link>
          </div>
        </div>
      </ScrollAnimatedDiv>


      {/* ═══════════════════════════════════════
           HOW IT WORKS
         ═══════════════════════════════════════ */}
      {/* ═══════════════════════════════════════
           HOW IT WORKS
         ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Gradients - Optimized for Mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimatedDiv className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black italic text-content mb-4 tracking-tight">
              HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500 animate-gradient">WORKS</span>
            </h2>
            <p className="text-muted-custom font-medium max-w-xl mx-auto text-lg">Your perfect party feast in 3 simple steps.</p>
          </ScrollAnimatedDiv>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-border-custom to-transparent border-t border-dashed border-gray-300/30 -z-10"></div>

            {/* Step 1 */}
            <ScrollAnimatedDiv delay={100} className="group relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                {/* Large Watermark Number */}
                {/* Icon Container */}
                <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-surface/50 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center group-hover:-translate-y-3 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="material-icons-round text-5xl text-content drop-shadow-sm group-hover:scale-110 transition-transform duration-300">search</span>
                </div>
              </div>
              <h3 className="text-2xl font-black italic text-content mb-3 group-hover:text-primary transition-colors">Browse Menu</h3>
              <p className="text-muted-custom leading-relaxed px-4">Discover curated menus from Hyderabad's top-rated chefs and restaurants.</p>
            </ScrollAnimatedDiv>

            {/* Step 2 */}
            <ScrollAnimatedDiv delay={300} className="group relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                {/* Large Watermark Number */}
                {/* Icon Container */}
                <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-surface/50 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center group-hover:-translate-y-3 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="material-icons-round text-5xl text-content drop-shadow-sm group-hover:scale-110 transition-transform duration-300">restaurant_menu</span>
                </div>
              </div>
              <h3 className="text-2xl font-black italic text-content mb-3 group-hover:text-secondary transition-colors">Build Your Cart</h3>
              <p className="text-muted-custom leading-relaxed px-4">Mix and match items from multiple vendors to create your dream feast.</p>
            </ScrollAnimatedDiv>

            {/* Step 3 */}
            <ScrollAnimatedDiv delay={500} className="group relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                {/* Large Watermark Number */}
                {/* Icon Container */}
                <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-surface/50 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center group-hover:-translate-y-3 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="material-icons-round text-5xl text-content drop-shadow-sm group-hover:scale-110 transition-transform duration-300">celebration</span>
                </div>
              </div>
              <h3 className="text-2xl font-black italic text-content mb-3 group-hover:text-accent transition-colors">Party Time</h3>
              <p className="text-muted-custom leading-relaxed px-4">We deliver fresh, hygienic food right to your doorstep. You take the credit!</p>
            </ScrollAnimatedDiv>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           TESTIMONIALS
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-20 bg-surface overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic text-content mb-4">WHAT OUR <span className="text-primary">CUSTOMERS SAY</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <TestimonialsCarousel />
          </div>

          {/* ═══════════════════════════════════════
                 VIDEO SHOWCASE (Custom Player)
               ═══════════════════════════════════════ */}
          <VideoShowcase />
        </div>
      </ScrollAnimatedDiv>

      {/* ═══════════════════════════════════════
           FINAL CTA (Instagram Button Moved Here)
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-surface z-0">
          <div className="absolute inset-0 bg-noise opacity-30"></div>
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Instagram Button - Themed */}
          <div className="mb-16">
            <a
              href="https://www.instagram.com/partycart_yumzy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-yellow-500 text-white font-black rounded-full shadow-[0_10px_30px_rgba(255,183,0,0.3)] hover:shadow-[0_20px_40px_rgba(255,183,0,0.5)] transition transform hover:-translate-y-1 active:scale-95 group"
            >
              <span className="material-icons-round text-2xl group-hover:rotate-12 transition">photo_camera</span>
              Follow on Instagram
            </a>
          </div>

          <div className="relative glass-card bg-surface border border-border-custom px-4 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-12 -mt-12 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -ml-12 -mb-12 pointer-events-none"></div>

            <span className="material-icons-round text-white/5 text-9xl absolute -top-6 -left-6 rotate-12 pointer-events-none select-none">restaurant</span>
            <span className="material-icons-round text-white/5 text-9xl absolute -bottom-6 -right-6 -rotate-12 pointer-events-none select-none">celebration</span>

            <div className="relative z-10 p-8 sm:p-14">
              <h2 className="text-5xl sm:text-7xl font-black italic text-content mb-6 tracking-tight leading-[0.9]">
                HUNGRY? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">ORDER NOW</span>
              </h2>
              <p className="text-muted-custom text-lg sm:text-xl mb-10 max-w-xl mx-auto font-medium">
                Explore 21+ restaurants and home chefs. <br className="hidden sm:block" />
                Fresh food, delivered fast.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={AppRoutes.VENDORS} className="bg-primary text-white text-lg font-black py-4 px-12 rounded-full shadow-2xl hover:shadow-primary/30 transition transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                  Browse Restaurants <span className="material-icons-round">arrow_forward</span>
                </Link>
                <Link to={AppRoutes.CONTACT} className="bg-surface backdrop-blur-md border border-border-custom text-content text-lg font-bold py-4 px-10 rounded-full hover:bg-surface/80 transition flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-icons-round">support_agent</span> Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>
    </>
  );
};

/* ── Custom Video Component (Reels Style) ── */
const VideoReelCard: React.FC<{
  video: { src: string; caption: string; poster?: string };
  isActive: boolean;
  onActivate: () => void;
}> = ({ video, isActive, onActivate }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    if (isActive) {
      if (videoRef.current?.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      onActivate();
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-black aspect-[9/16] shadow-2xl transition-all duration-500 cursor-pointer ${isActive ? 'ring-2 ring-primary scale-[1.02] z-10' : 'opacity-80 scale-95 hover:opacity-100'}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

      {/* Play/Pause Icon Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="material-icons-round text-4xl text-white">play_arrow</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition"
        >
          <span className="material-icons-round text-xl">{isMuted ? 'volume_off' : 'volume_up'}</span>
        </button>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5 z-30 text-left">
        <p className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">{video.caption}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="material-icons-round text-[14px] text-white">local_fire_department</span>
          </div>
          <span className="text-xs text-white/90 font-medium">Trending now</span>
        </div>
      </div>
    </div>
  );
};

const VideoShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const videos = [
    { src: "/videos/office-party.mp4", caption: "Office Parties Done Right! 🥂" },
    { src: "/videos/rajapushpa-smiles.mp4", caption: "Serving Smiles at Rajapushpa 😍" },
    { src: "/videos/grazing-table.mp4", caption: "The Ultimate Grazing Table ✨" }
  ];

  // Intersection Observer for Auto-Play on Scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6, root: null, rootMargin: '0px' }
    );

    const cards = containerRef.current?.querySelectorAll('.video-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-16 relative">
      <div className="flex items-center justify-between mb-8 px-4">
        <h3 className="text-2xl font-black text-content italic">WATCH <span className="text-primary">PARTYCAM</span></h3>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Moments</span>
      </div>

      {/* Mobile: Horizontal Snap Scroll / Desktop: Grid */}
      <div
        ref={containerRef}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 pb-8 hide-scroll"
      >
        {videos.map((v, i) => (
          <div
            key={i}
            data-index={i}
            className="video-card min-w-[85vw] md:min-w-0 snap-center"
          >
            <VideoReelCard
              video={v}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
