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

// Vendors with menus (clickable)
const VENDOR_SLUGS: Record<string, string> = {
  'Mughlai PartyCart ': 'mughlai-partycart',
  'KiloKart': 'kilokart',
  'Corporate Bites': 'corporate-bites',
  'Telugu Ruchulu': 'telugu-ruchulu',
  'Daru party': 'daru-party',
  'Godavari Ruchulu': 'godavari-ruchulu',
  'Ankapur Style Chicken': 'ankapur-style-chicken',
  'Indo Chinese Hub': 'indo-chinese-hub',
  'Grazing Table': 'grazing-table',
  'Live Kebab Station': 'live-kebab-station',
  'The Tea Party': 'the-tea-party',
  'Morning Kart [Breakfast]': 'morning-kart-breakfast',
  'Home Chef - Dakhni Style': 'home-chef-dakhni-style',
  'Indo-Chinese Live Counter': 'indo-chinese-live-counter',
  'Mocktails & Shakes Bar': 'mocktails-and-shakes-bar',
  'Telugu & Andhra Style Food': 'telugu-andhra-style-food',
  'Aarti Bhojan': 'aarti-bhojan',
  'Home Kitchen': 'home-kitchen',
  'Hyderabadi Shaadi Ka Khana': 'hyderabadi-shaadi-ka-khana',
  'Indo-china town': 'indo-china-town',
  'Telugu Pooja Vindu': 'telugu-pooja-vindu',
};

const topPicks = allVendors.slice(0, 8);

export const Home: React.FC = () => {
  return (
    <>
      {/* ═══════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              {/* WhatsApp Floating Icon */}
              <a
                href="https://wa.me/916309855320?text=Hi%20PartyCart!%20I'm%20interested%20in%20booking%20a%20party%20food%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce-subtle"
                aria-label="Chat on WhatsApp"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
              </a>

              <ScrollAnimatedDiv delay={200}>
                <div className="relative inline-block">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic text-white leading-none tracking-tight mb-8">
                    <span className="block mb-2"><TextReveal text="DISCOVER" delay={0.2} /></span>

                    {/* RESTAURANTS - Gradient Fix: Using slide-up instead of split text for robust gradient support */}
                    <span className="block h-[1.1em] overflow-hidden mb-3">
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
                        RESTAURANTS
                      </span>
                    </span>

                    <span className="text-stroke text-transparent relative text-4xl sm:text-5xl md:text-6xl block">
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
                <p className="mt-6 text-xl sm:text-2xl font-black text-white leading-snug">
                  Hyderabad's Premium Party Food Provider
                </p>
                <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-lg leading-relaxed border-l-4 border-primary pl-4 italic">
                  You host the party. We'll handle the food.
                </p>
              </ScrollAnimatedDiv>
              <ScrollAnimatedDiv delay={400} className="mt-10 flex flex-wrap gap-4">
                <Link to={AppRoutes.VENDORS} className="flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Browse Restaurants <span className="material-icons-round">arrow_forward</span>
                </Link>
                <Link to={AppRoutes.CONTACT} className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition backdrop-blur-md">
                  <span className="material-icons-round text-secondary">support_agent</span> Contact Us
                </Link>
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
                  className="absolute -bottom-8 -left-4 z-20 bg-surface/80 backdrop-blur-xl border border-white/20 p-4 pr-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 animate-bounce-subtle"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <span className="material-icons-round text-green-400 text-2xl">verified_user</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider">Safety First</p>
                    <p className="text-xl font-black text-white">100% Verified</p>
                  </div>
                </div>

                {/* Badge 2: Rating (New) */}
                <div
                  className="absolute top-10 -right-8 z-20 bg-surface/80 backdrop-blur-xl border border-white/20 p-3 px-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col items-center animate-bounce-subtle"
                  style={{ animationDelay: '0s' }}
                >
                  <span className="text-3xl font-black text-yellow-400">4.9 <span className="text-lg">★</span></span>
                  <p className="text-xs text-gray-300 font-bold uppercase tracking-wider">User Rating</p>
                </div>
              </div>
            </ScrollAnimatedDiv>
          </div>
        </div>
      </ScrollAnimatedDiv>

      {/* ═══════════════════════════════════════
           STATS BANNER
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-12 bg-gradient-to-r from-primary to-orange-600 bg-noise transform -skew-y-2 z-20 border-y border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform skew-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white mb-1">{allVendors.length}<span className="text-yellow-300">+</span></p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Restaurants</p>
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
           TOP PICKS / RESTAURANTS NEAR YOU
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic text-white mb-4">TOP <span className="text-primary">RESTAURANTS</span></h2>
              <p className="text-gray-400 max-w-md">Handpicked restaurants delivering exceptional food for every occasion.</p>
            </div>
            <Link to={AppRoutes.VENDORS} className="inline-flex items-center gap-2 text-accent font-bold hover:text-white transition">
              View All Restaurants <span className="material-icons-round">east</span>
            </Link>
          </div>

          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 snap-x snap-mandatory hide-scroll -mx-4 px-4 lg:mx-0 lg:px-0">
            {topPicks.map((v) => {
              const slug = VENDOR_SLUGS[v.name];
              return (
                <Link
                  key={v.name}
                  to={slug ? `/vendor/${slug}` : AppRoutes.VENDORS}
                  className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2 border border-white/[0.06] hover:border-white/20 min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition"></div>
                  <img
                    alt={v.name.trim()}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-700"
                    src={v.image}
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md border ${v.category === 'Party Box'
                      ? 'bg-primary/20 text-primary border-primary/30'
                      : v.category === 'Live Counter'
                        ? 'bg-secondary/20 text-secondary border-secondary/30'
                        : 'bg-accent/20 text-accent border-accent/30'
                      }`}>
                      {v.category}
                    </span>
                  </div>
                  {v.is_veg && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-[10px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Veg
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{v.name.trim()}</h3>
                    <p className="text-gray-300 text-xs line-clamp-1 mb-3">{v.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* "See all" CTA */}
          <div className="text-center mt-12">
            <Link
              to={AppRoutes.VENDORS}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition backdrop-blur-md"
            >
              See All {allVendors.length} Restaurants <span className="material-icons-round">arrow_forward</span>
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
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimatedDiv className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic text-white mb-2">
              HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-green-300 animate-gradient">WORKS</span>
            </h2>
            <p className="text-gray-400 font-medium">3 simple steps to your perfect party</p>
          </ScrollAnimatedDiv>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40%] left-[16%] right-[16%] h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent border-t border-dashed border-white/20 -z-10"></div>

            {/* Step 1 */}
            <ScrollAnimatedDiv delay={100} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-surface text-white font-black flex items-center justify-center rounded-xl border border-white/10 shadow-lg z-20">
                <span className="text-primary text-xl">01</span>
              </div>
              <div className="mt-6 mb-6 relative h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-all duration-500"></div>
                <span className="material-icons-round text-7xl text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">search</span>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">Browse Menu</h3>
              <p className="text-gray-400 text-center leading-relaxed text-sm">Explore top-rated restaurants and exclusive home chefs near you.</p>
            </ScrollAnimatedDiv>

            {/* Step 2 */}
            <ScrollAnimatedDiv delay={300} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-surface text-white font-black flex items-center justify-center rounded-xl border border-white/10 shadow-lg z-20">
                <span className="text-secondary text-xl">02</span>
              </div>
              <div className="mt-6 mb-6 relative h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary/20 blur-[40px] rounded-full group-hover:bg-secondary/30 transition-all duration-500"></div>
                <span className="material-icons-round text-7xl text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">restaurant_menu</span>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">Build Your Cart</h3>
              <p className="text-gray-400 text-center leading-relaxed text-sm">Add items from multiple vendors or choose a pre-set party box.</p>
            </ScrollAnimatedDiv>

            {/* Step 3 */}
            <ScrollAnimatedDiv delay={500} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-surface text-white font-black flex items-center justify-center rounded-xl border border-white/10 shadow-lg z-20">
                <span className="text-accent text-xl">03</span>
              </div>
              <div className="mt-6 mb-6 relative h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-accent/20 blur-[40px] rounded-full group-hover:bg-accent/30 transition-all duration-500"></div>
                <span className="material-icons-round text-7xl text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">celebration</span>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">Party Time</h3>
              <p className="text-gray-400 text-center leading-relaxed text-sm">We deliver fresh, hygienic food right to your doorstep. You enjoy!</p>
            </ScrollAnimatedDiv>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           TESTIMONIALS
         ═══════════════════════════════════════ */}
      <ScrollAnimatedDiv className="relative py-20 bg-surface/50 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic text-white mb-4">WHAT OUR <span className="text-primary">CUSTOMERS SAY</span></h2>
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
        <div className="absolute inset-0 bg-dark z-0">
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-black rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.5)] transition transform hover:-translate-y-1 active:scale-95 group"
            >
              <span className="material-icons-round text-2xl group-hover:rotate-12 transition">photo_camera</span>
              Follow on Instagram
            </a>
          </div>

          <div className="relative glass-card bg-white/5 border border-white/10 p-8 sm:p-14 rounded-[3rem] overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-12 -mt-12 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -ml-12 -mb-12 pointer-events-none"></div>

            <span className="material-icons-round text-white/5 text-9xl absolute -top-6 -left-6 rotate-12 pointer-events-none select-none">restaurant</span>
            <span className="material-icons-round text-white/5 text-9xl absolute -bottom-6 -right-6 -rotate-12 pointer-events-none select-none">celebration</span>

            <div className="relative z-10">
              <h2 className="text-5xl sm:text-7xl font-black italic text-white mb-6 tracking-tight leading-[0.9]">
                HUNGRY? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">ORDER NOW</span>
              </h2>
              <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-xl mx-auto font-medium">
                Explore 21+ restaurants and home chefs. <br className="hidden sm:block" />
                Fresh food, delivered fast.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={AppRoutes.VENDORS} className="bg-white text-dark text-lg font-black py-4 px-12 rounded-full shadow-2xl hover:shadow-white/20 transition transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                  Browse Restaurants <span className="material-icons-round">arrow_forward</span>
                </Link>
                <Link to={AppRoutes.CONTACT} className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-white/20 transition flex items-center justify-center gap-2">
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
        <h3 className="text-2xl font-black text-white italic">WATCH <span className="text-primary">PARTYCAM</span></h3>
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