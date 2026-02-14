import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { ScrollAnimatedDiv } from '../components/ScrollAnimation';
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Now Live in Hyderabad • {allVendors.length}+ Restaurants
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic text-white leading-[0.9] tracking-tight mb-6">
                DISCOVER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">RESTAURANTS</span> <br />
                <span className="text-stroke text-transparent relative text-4xl sm:text-5xl md:text-6xl block mt-2">
                  NEAR YOU
                  <span className="absolute -top-6 -right-8 material-icons-round text-accent text-5xl rotate-12 opacity-80">restaurant</span>
                </span>
              </h1>
              <p className="mt-6 text-xl sm:text-2xl font-black text-white leading-snug">
                Hyderabad's Premium Party Food Provider
              </p>
              <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-lg leading-relaxed border-l-4 border-primary pl-4 italic">
                You host the party. We'll handle the food.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={AppRoutes.VENDORS} className="flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Browse Restaurants <span className="material-icons-round">arrow_forward</span>
                </Link>
                <Link to={AppRoutes.CONTACT} className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition backdrop-blur-md">
                  <span className="material-icons-round text-secondary">support_agent</span> Contact Us
                </Link>
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[60px] animate-pulse-slow"></div>
              <div className="relative w-full aspect-square max-w-md lg:max-w-full rotate-3 transition hover:rotate-0 duration-500">
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 transform translate-x-4 translate-y-4"></div>
                <img alt="Delicious Food" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10 brightness-110" src="https://partycart.in/wp-content/uploads/2025/09/group-people-are-preparing-food-table-1-scaled.jpg" />
                <div className="absolute -bottom-6 -left-6 z-20 bg-surface border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 glass-card">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <span className="material-icons-round text-green-500">verified_user</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Hygiene Checked</p>
                    <p className="text-xl font-black text-white">Trusted Vendors</p>
                  </div>
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPicks.map((v) => {
              const slug = VENDOR_SLUGS[v.name];
              return (
                <Link
                  key={v.name}
                  to={slug ? `/vendor/${slug}` : AppRoutes.VENDORS}
                  className="group block relative rounded-3xl overflow-hidden shadow-2xl transition transform hover:-translate-y-2 border border-white/[0.06] hover:border-white/20"
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
                    <span className="material-icons-round text-5xl text-primary opacity-80 group-hover:opacity-100 transition">search</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">1</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Browse</h3>
                <p className="text-gray-400 text-sm px-4">Explore top restaurants and home chefs near you. Filter by cuisine, price, or diet.</p>
              </div>
              <div className="group text-center md:mt-12">
                <div className="relative inline-block mb-6 transition transform group-hover:scale-110 duration-300">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-surface to-dark border border-white/10 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                    <span className="material-icons-round text-5xl text-secondary opacity-80 group-hover:opacity-100 transition">restaurant_menu</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">2</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Order</h3>
                <p className="text-gray-400 text-sm px-4">Pick your dishes, customize portions, and place your order with ease.</p>
              </div>
              <div className="group text-center">
                <div className="relative inline-block mb-6 transition transform group-hover:scale-110 duration-300">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-surface to-dark border border-white/10 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                    <span className="material-icons-round text-5xl text-accent opacity-80 group-hover:opacity-100 transition">local_shipping</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-white font-black flex items-center justify-center rounded-lg shadow-lg rotate-12 z-20">3</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enjoy</h3>
                <p className="text-gray-400 text-sm px-4">Fresh food delivered to your doorstep. Hot, hygienic, and on time.</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimatedDiv>

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

/* ── Custom Video Component ── */
const VideoCard: React.FC<{
  src: string;
  poster?: string;
  caption: string;
  isPlaying: boolean;
  onPlay: () => void;
}> = ({ src, caption, isPlaying, onPlay }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [showControls, setShowControls] = React.useState(true);

  React.useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      // If currently playing, pausing implies we are just stopping this one. 
      // The parent handles 'onPlay' to set exclusive playing. 
      // But here we need a way to say "stop". 
      // Actually, simplest is: Clicking toggles. Parent sets state.
      // But to keep it simple, if we click, we trigger onPlay (which sets this as active).
      // If it's ALREADY active, we might want to pause it? 
      // Let's stick to "Click to Play". To pause, maybe click again?
      // For now, let's just use the mute button for audio and allow interaction to pause.
      // Actually, user asked: "one video play two pause".
      // So if I click this, it becomes the 'playing' one.
      onPlay();
    } else {
      onPlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden bg-dark border border-white/10 shadow-2xl transition-all duration-500 ${isPlaying ? 'ring-2 ring-primary/50 scale-[1.02]' : 'hover:border-primary/30'}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={onPlay}
    >
      {/* Frame / Glass Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10"></div>

      {/* Video */}
      <div className="relative aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />

        {/* Dark Gradient Overlay (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

        {/* Custom Controls Overlay */}
        <div className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'}`}>
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition">
              <span className="material-icons-round text-4xl text-white">play_arrow</span>
            </div>
          )}
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition"
        >
          <span className="material-icons-round text-xl">{isMuted ? 'volume_off' : 'volume_up'}</span>
        </button>

        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-4 z-40 text-center">
          <p className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md">{caption}</p>
        </div>
      </div>
    </div>
  );
};

const VideoShowcase: React.FC = () => {
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
  const videos = [
    { src: "/videos/office-party.mp4", caption: "Office Party Sorted! 🥂" },
    { src: "/videos/rajapushpa-smiles.mp4", caption: "Serving Smiles at Rajapushpa 😍" },
    { src: "/videos/grazing-table.mp4", caption: "The Grazing Table Experience ✨" }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {videos.map((v, i) => (
        <VideoCard
          key={i}
          {...v}
          isPlaying={playingIndex === i}
          onPlay={() => setPlayingIndex(playingIndex === i ? null : i)} // Toggle: Click active -> pause, Click inactive -> play
        />
      ))}
    </div>
  );
};