import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import vendorJson from '../data.json';
import { VENDOR_SLUGS, prefetchMenu } from '../utils/vendorHelpers';
import { ScrollAnimatedDiv } from '../components/ScrollAnimation';
import { TextReveal } from '../components/TextReveal';
import { OptimizedImage } from '../components/OptimizedImage';

type Restaurant = {
  name: string;
  category: string;
  description: string;
  image: string;
  distance_km: number;
  delivery_duration_min: number;
  link: string;
  is_veg: boolean;
  is_pure_veg?: boolean;
};

const allVendors: Restaurant[] = vendorJson.restaurants as Restaurant[];

const CATEGORIES = ['All', 'Party Box', 'Live Counter', 'Catering'] as const;
const DIET_FILTERS = ['All Diet', 'Veg', 'Non-Veg'] as const;
const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Nearest First', value: 'distance' },
  { label: 'Fastest Delivery', value: 'delivery' },
  { label: 'Best Rated', value: 'rated' },
] as const;

// Assign ratings + popularity deterministically
function getVendorMeta(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  const r = Math.abs(hash);
  return {
    rating: (3.8 + (r % 13) / 10).toFixed(1),
    reviews: 50 + (r % 200),
    popularity: r % 1000,
  };
}

// ── Trending badge logic ──
const trendingNames = new Set([
  'Mughlai PartyCart ',
  'Live Kebab Station',
  'Home Kitchen',
  'KiloKart',
]);

const categoryBadgeColor = (cat: string) => {
  switch (cat) {
    case 'Party Box':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'Live Counter':
      return 'bg-secondary/10 text-secondary border-secondary/20';
    case 'Catering':
      return 'bg-accent/10 text-accent border-accent/20';
    default:
      return 'bg-surface text-muted-custom border-border-custom';
  }
};

// Vendor Categorization matching Home Page logic
const VENDOR_SECTIONS = [
  {
    title: 'Breakfast',
    subtitle: 'Start your day with these favourites',
    vendorNames: [
      'Morning Kart [Breakfast]',
      'Corporate Bites',
      'Mughlai PartyCart ',
      'Ankapur Style Chicken',
      'Telugu Ruchulu',
      'Aarti Bhojan'
    ]
  },
  {
    title: 'Snacks & High Tea',
    subtitle: 'Perfect for evening gatherings and parties',
    vendorNames: [
      'Live Kebab Station',
      'Indo Chinese Hub',
      'The Tea Party',
      'Grazing Table',
      'Daru party',
      'Indo-Chinese Live Counter'
    ]
  },
  {
    title: 'Lunch / Dinner',
    subtitle: 'Heavier meals for main course feasts',
    vendorNames: [
      'Hyderabadi Shaadi Ka Khana',
      'Home Kitchen',
      'KiloKart',
      'Godavari Ruchulu',
      'Telugu & Andhra Style Food',
      'Indo-china town',
      'Home Chef - Dakhni Style'
    ]
  }
];

export const Vendors: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDiet, setActiveDiet] = useState<string>('All Diet');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter
  const filtered = useMemo(() => {
    let list = [...allVendors];
    if (activeCategory !== 'All') list = list.filter((v) => v.category === activeCategory);
    if (activeDiet === 'Veg') list = list.filter((v) => v.is_veg || v.is_pure_veg);
    if (activeDiet === 'Non-Veg') list = list.filter((v) => !v.is_veg && !v.is_pure_veg);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }
    // Sort
    const meta = (v: Restaurant) => getVendorMeta(v.name);
    switch (sortBy) {
      case 'distance':
        list.sort((a, b) => a.distance_km - b.distance_km);
        break;
      case 'delivery':
        list.sort((a, b) => a.delivery_duration_min - b.delivery_duration_min);
        break;
      case 'rated':
        list.sort((a, b) => parseFloat(meta(b).rating) - parseFloat(meta(a).rating));
        break;
      default:
        list.sort((a, b) => meta(b).popularity - meta(a).popularity);
    }
    return list;
  }, [activeCategory, activeDiet, sortBy, searchQuery]);

  const trendingVendors = allVendors.filter((v) => trendingNames.has(v.name));

  return (
    <div className="bg-theme min-h-screen relative pb-24">
      {/* ═══ Ambient BG ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ═══════════════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-12 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl text-primary/10 rotate-12 animate-float pointer-events-none hidden lg:block select-none material-icons-round">event</div>
        <div className="absolute top-40 right-10 text-8xl text-secondary/10 -rotate-12 animate-float pointer-events-none hidden lg:block select-none material-icons-round" style={{ animationDelay: '1s' }}>lunch_dining</div>

        <ScrollAnimatedDiv className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface border border-border-custom text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-primary/10 animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            {allVendors.length} Premium Vendors Live
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black italic text-content leading-none tracking-tighter mb-6 drop-shadow-sm">
            <span className="block mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>DISCOVER</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_auto] animate-gradient block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              THE BEST FLAVOURS
            </span>
          </h1>

          <p className="text-muted-custom text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Book Hyderabad's top-rated caterers and home chefs for your next big celebration.
            <span className="text-content font-bold"> 100% Verified & Hygiene Checked.</span>
          </p>

          {/* Search Bar - Enhanced */}
          <div className="max-w-3xl mx-auto relative mb-12 group perspective-1000 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-[2rem] opacity-30 group-hover:opacity-50 blur-xl transition duration-500"></div>

            <div className="relative bg-surface border border-border-custom p-2 rounded-[2rem] shadow-2xl flex items-center gap-4 transition-transform group-hover:scale-[1.01]">
              <div className="pl-6 text-primary">
                <span className="material-icons-round text-3xl">search</span>
              </div>
              <input
                type="text"
                placeholder="Search for biryani, kebabs, or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-content text-lg font-medium placeholder-muted-custom focus:ring-0 px-2 py-4"
              />
              <div className="hidden sm:flex pr-2">
                <button className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-wider text-sm shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* ── Filter Pills (Desktop & Mobile Scroll) ── */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 overflow-x-auto hide-scroll pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                  : 'bg-surface text-muted-custom border-border-custom hover:bg-surface/80 hover:text-content'
                  }`}
              >
                {cat}
              </button>
            ))}

            {/* Divider visible on desktop, hidden on very small screens if wrapping occurs differently */}
            <div className="hidden sm:block w-px h-6 bg-border-custom self-center mx-1"></div>

            {DIET_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDiet(d)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeDiet === d
                  ? d === 'Veg'
                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/30'
                    : d === 'Non-Veg'
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                      : 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                  : 'bg-surface text-muted-custom border-border-custom hover:bg-surface/80 hover:text-content'
                  }`}
              >
                {d === 'Veg' && '🟢 '}
                {d === 'Non-Veg' && '🔴 '}
                {d}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle (Floating Action Button style for cleaner UI) */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="sm:hidden fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center animate-bounce-subtle hover:scale-110 active:scale-95 transition-transform"
            aria-label="Filters"
          >
            <span className="material-icons-round text-2xl">tune</span>
          </button>
        </ScrollAnimatedDiv>
      </section>

      {/* ═══════════════════════════════════════════════
           TRENDING THIS WEEK (Horizontal Scroll)
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <ScrollAnimatedDiv delay={100} className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black italic text-content uppercase tracking-tight">
              Trending <span className="text-primary">This Week</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden sm:block">
            🔥 Hot picks
          </span>
        </ScrollAnimatedDiv>

        <div className="flex gap-5 overflow-x-auto hide-scroll pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {trendingVendors.map((v, i) => {
            const m = getVendorMeta(v.name);
            return (
              <div
                key={v.name}
                className="snap-center group flex-shrink-0 w-72 sm:w-80 rounded-3xl overflow-hidden border border-border-custom hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer bg-surface backdrop-blur-md animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-44 overflow-hidden bg-surface">
                  <img
                    src={v.image}
                    alt={v.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Trending Badge */}
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/90 text-white text-[10px] font-black uppercase backdrop-blur-sm flex items-center gap-1 shadow-lg">
                      🔥 Trending
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/10 z-10">
                    <span className="material-icons-round text-yellow-400 text-xs">star</span> {m.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-content truncate mb-1 group-hover:text-primary transition-colors">{v.name.trim()}</h3>
                  <p className="text-muted-custom text-xs truncate mb-3">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SORT BAR + RESULT COUNT
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <ScrollAnimatedDiv delay={200} className="flex items-center justify-between bg-surface backdrop-blur-md rounded-2xl p-4 border border-border-custom shadow-sm">
          <p className="text-muted-custom text-sm font-medium">
            Showing <span className="text-content font-bold">{filtered.length}</span> vendors
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-muted-custom text-xs font-bold uppercase tracking-wider">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-border-custom text-content text-xs font-bold rounded-2xl px-4 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer appearance-none transition-colors hover:bg-surface/80"
              style={{ backgroundImage: 'none' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-surface text-content">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </ScrollAnimatedDiv>
      </section>

      {/* ═══════════════════════════════════════════════
           VENDOR CARDS GRID
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
        {activeCategory === 'All' && searchQuery === '' ? (
          <>
            {/* Show Categorized Sections when no specific filter is active */}
            {VENDOR_SECTIONS.map((section, idx) => {
              const sectionVendors = allVendors.filter(v => section.vendorNames.includes(v.name));
              if (sectionVendors.length === 0) return null;

              return (
                <div key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex flex-col md:flex-row items-end gap-3 mb-8 border-b border-border-custom pb-4">
                    <h2 className="text-3xl md:text-4xl font-black italic text-content uppercase tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-muted-custom text-sm md:text-base mb-1 md:mb-1.5 italic font-medium">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectionVendors.map((v) => {
                      const m = getVendorMeta(v.name);
                      const isTrending = trendingNames.has(v.name);
                      const slug = VENDOR_SLUGS[v.name];

                      return (
                        <div key={v.name} className="h-full">
                          <div
                            onMouseEnter={() => {
                              if (slug) prefetchMenu(slug);
                            }}
                            className="group relative block w-full rounded-[2.5rem] overflow-hidden isolate shadow-lg md:shadow-2xl shadow-black/10 md:shadow-black/20 md:hover:shadow-primary/20 md:hover:-translate-y-2 transition-transform duration-300 h-[450px] md:h-[500px] will-change-transform"
                          >
                            {/* Image BG */}
                            <img
                              src={v.image}
                              alt={v.name}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                            />

                            {/* Gradient Mesh */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10 opacity-60"></div>

                            {/* Top Badges */}
                            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase border backdrop-blur-md shadow-lg ${categoryBadgeColor(v.category)}`}>
                                {v.category}
                              </span>
                              {isTrending && (
                                <span className="px-3 py-1.5 rounded-full bg-red-500 text-white text-[10px] font-black uppercase backdrop-blur-md shadow-lg flex items-center gap-1">
                                  <span className="material-icons-round text-[10px]">local_fire_department</span> Hot
                                </span>
                              )}
                            </div>

                            {/* Veg Indicator */}
                            {(v.is_veg || v.is_pure_veg) && (
                              <div className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-green-500 z-20 shadow-lg" title="Pure Veg">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              </div>
                            )}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                              <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                                {/* Title & Rating Row */}
                                <div className="flex justify-between items-end mb-2">
                                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-md leading-none max-w-[80%]">
                                    {v.name.trim()}
                                  </h3>
                                  <div className="flex flex-col items-end">
                                    <span className="flex items-center gap-1.5 bg-yellow-500 text-black px-2.5 py-1 rounded-lg font-black text-xs shadow-lg">
                                      {m.rating} <span className="material-icons-round text-[10px]">star</span>
                                    </span>
                                    <span className="text-[10px] text-gray-300 font-medium mt-1">({m.reviews})</span>
                                  </div>
                                </div>

                                {/* Description */}
                                <div className="bg-black/30 md:backdrop-blur-md md:bg-white/10 p-4 rounded-2xl border border-white/5 md:border-white/10 shadow-inner mb-6 md:group-hover:bg-white/20 transition-colors">
                                  <p className="text-gray-100 text-xs font-medium line-clamp-2 leading-relaxed">
                                    {v.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                                      <span className="material-icons-round text-primary text-sm">groups</span>
                                      {v.category === 'Catering' ? '30–100 Guests' : '10–20 Guests'}
                                    </span>
                                  </div>
                                </div>

                                {/* CTA Area - Only shows nicely on hover/focus interactions conceptually, but here we keep it visible for mobile UX */}
                                {slug ? (
                                  <Link
                                    to={`/vendor/${slug}`}
                                    className="w-full py-4 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest text-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(255,183,0,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
                                  >
                                    View Menu <span className="material-icons-round md-18">arrow_forward</span>
                                  </Link>
                                ) : (
                                  <button
                                    className="w-full py-4 rounded-full bg-white/10 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 cursor-not-allowed"
                                    disabled
                                  >
                                    <span className="material-icons-round text-sm">lock</span> Coming Soon
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          /* Normal Filtered Grid (Fall back to this if user uses filters) */
          filtered.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <span className="material-icons-round text-muted-custom text-6xl mb-4 block">search_off</span>
              <p className="text-muted-custom text-lg font-bold">No vendors found</p>
              <p className="text-muted-custom text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((v, i) => {
                const m = getVendorMeta(v.name);
                const isTrending = trendingNames.has(v.name);
                const slug = VENDOR_SLUGS[v.name];

                return (
                  <div
                    key={v.name}
                    className="h-full animate-fade-in-up"
                    style={{ animationDelay: `${i < 6 ? i * 50 : 0}ms` }}
                  >
                    <div
                      onMouseEnter={() => {
                        if (slug) prefetchMenu(slug);
                      }}
                      className="group relative block w-full rounded-[2.5rem] overflow-hidden isolate shadow-lg md:shadow-2xl shadow-black/10 md:shadow-black/20 md:hover:shadow-primary/20 md:hover:-translate-y-2 transition-transform duration-300 h-[450px] md:h-[500px] will-change-transform"
                    >
                      {/* Image BG */}
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                      />

                      {/* Gradient Mesh */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10 opacity-60"></div>

                      {/* Top Badges */}
                      <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase border backdrop-blur-md shadow-lg ${categoryBadgeColor(v.category)}`}>
                          {v.category}
                        </span>
                        {isTrending && (
                          <span className="px-3 py-1.5 rounded-full bg-red-500 text-white text-[10px] font-black uppercase backdrop-blur-md shadow-lg flex items-center gap-1">
                            <span className="material-icons-round text-[10px]">local_fire_department</span> Hot
                          </span>
                        )}
                      </div>

                      {/* Veg Indicator */}
                      {(v.is_veg || v.is_pure_veg) && (
                        <div className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-green-500 z-20 shadow-lg" title="Pure Veg">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                      )}

                      {/* Content Overlay */}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                        <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                          {/* Title & Rating Row */}
                          <div className="flex justify-between items-end mb-2">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-md leading-none max-w-[80%]">
                              {v.name.trim()}
                            </h3>
                            <div className="flex flex-col items-end">
                              <span className="flex items-center gap-1.5 bg-yellow-500 text-black px-2.5 py-1 rounded-lg font-black text-xs shadow-lg">
                                {m.rating} <span className="material-icons-round text-[10px]">star</span>
                              </span>
                              <span className="text-[10px] text-gray-300 font-medium mt-1">({m.reviews})</span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="bg-black/30 md:backdrop-blur-md md:bg-white/10 p-4 rounded-2xl border border-white/5 md:border-white/10 shadow-inner mb-6 md:group-hover:bg-white/20 transition-colors">
                            <p className="text-gray-100 text-xs font-medium line-clamp-2 leading-relaxed">
                              {v.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                                <span className="material-icons-round text-primary text-sm">groups</span>
                                {v.category === 'Catering' ? '30–100 Guests' : '10–20 Guests'}
                              </span>
                            </div>
                          </div>

                          {/* CTA Area */}
                          {slug ? (
                            <Link
                              to={`/vendor/${slug}`}
                              className="w-full py-4 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest text-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(255,183,0,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              View Menu <span className="material-icons-round md-18">arrow_forward</span>
                            </Link>
                          ) : (
                            <button
                              className="w-full py-4 rounded-full bg-white/10 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 cursor-not-allowed"
                              disabled
                            >
                              <span className="material-icons-round text-sm">lock</span> Coming Soon
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </section>

      {/* ═══════════════════════════════════════════════
           MOBILE FILTER DRAWER (Premium)
         ═══════════════════════════════════════════════ */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] sm:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"></div>
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border-custom rounded-t-[2rem] p-6 pb-12 animate-slideUp shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-8"></div>

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-content italic">FILTERS & SORT</h3>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveDiet('All Diet');
                  setSortBy('popular');
                }}
                className="text-primary text-xs font-bold uppercase tracking-wider hover:text-content transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <p className="text-xs font-bold text-muted-custom uppercase tracking-widest mb-4 pl-1">Category</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-surface text-muted-custom border-border-custom'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Diet */}
            <p className="text-xs font-bold text-muted-custom uppercase tracking-widest mb-4 pl-1">Diet Preference</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {DIET_FILTERS.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDiet(d)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${activeDiet === d
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-surface text-muted-custom border-border-custom'
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sort */}
            <p className="text-xs font-bold text-muted-custom uppercase tracking-widest mb-4 pl-1">Sort Order</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setSortBy(o.value)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold uppercase border transition-all text-center ${sortBy === o.value
                    ? 'bg-primary/20 text-content border-primary/50'
                    : 'bg-surface text-muted-custom border-border-custom'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-yellow-600 text-white font-black uppercase tracking-wider text-sm shadow-xl shadow-primary/20"
            >
              Show {filtered.length} Vendors
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
