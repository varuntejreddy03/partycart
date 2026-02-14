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
      return 'bg-primary/20 text-primary border-primary/30';
    case 'Live Counter':
      return 'bg-secondary/20 text-secondary border-secondary/30';
    case 'Catering':
      return 'bg-accent/20 text-accent border-accent/30';
    default:
      return 'bg-white/10 text-white border-white/20';
  }
};

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
    <div className="bg-dark min-h-screen relative pb-24">
      {/* ═══ Ambient BG ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ═══════════════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 pt-28 pb-6 sm:pt-36 sm:pb-10">
        <ScrollAnimatedDiv className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-lg shadow-accent/5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            {allVendors.length} Vendors Live in Hyderabad
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic text-white leading-[0.95] tracking-tight mb-4">
            <TextReveal text="CATERING SERVICES" delay={0.1} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient block mt-2">
              <TextReveal text="AROUND YOU" className="text-transparent bg-clip-text" delay={0.5} />
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            Deals that sizzle hotter than your celebration. 🔥
          </p>

          {/* ── Search Bar ── */}
          <div className="max-w-2xl mx-auto relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg"></div>
            <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search by cuisine, vendor or dish…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-6 rounded-2xl glass-input text-white placeholder-gray-500 text-sm font-medium relative z-10 focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
            />
          </div>

          {/* ── Filter Pills (Desktop & Mobile Scroll) ── */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 overflow-x-auto hide-scroll pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}

            {/* Divider visible on desktop, hidden on very small screens if wrapping occurs differently */}
            <div className="hidden sm:block w-px h-6 bg-white/10 self-center mx-1"></div>

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
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
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
            <h2 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tight">
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
                className="snap-center group flex-shrink-0 w-72 sm:w-80 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer bg-surface/30 backdrop-blur-md animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-44 overflow-hidden bg-neutral-900">
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
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1 border border-white/10 z-10">
                    <span className="material-icons-round text-yellow-400 text-xs">star</span> {m.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white truncate mb-1 group-hover:text-primary transition-colors">{v.name.trim()}</h3>
                  <p className="text-gray-400 text-xs truncate mb-3">{v.description}</p>
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
        <ScrollAnimatedDiv delay={200} className="flex items-center justify-between bg-surface/30 backdrop-blur-md rounded-2xl p-4 border border-white/5">
          <p className="text-gray-400 text-sm font-medium">
            Showing <span className="text-white font-bold">{filtered.length}</span> vendors
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface/50 border border-white/10 text-white text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer appearance-none transition-colors hover:bg-white/10"
              style={{ backgroundImage: 'none' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-dark text-gray-300">
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
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <span className="material-icons-round text-gray-600 text-6xl mb-4 block">search_off</span>
            <p className="text-gray-500 text-lg font-bold">No vendors found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v, i) => {
              const m = getVendorMeta(v.name);
              const isTrending = trendingNames.has(v.name);
              const slug = VENDOR_SLUGS[v.name];

              return (
                <div
                  key={v.name} // Simple div wrapper to avoid animation overhead on the grid cell itself
                  className="h-full animate-fade-in-up"
                  style={{ animationDelay: `${i < 6 ? i * 50 : 0}ms` }} // Only stagger the first few
                >
                  <div
                    onMouseEnter={() => {
                      if (slug) prefetchMenu(slug);
                    }}
                    className="group relative h-full rounded-[24px] overflow-hidden border border-white/[0.06] hover:border-white/20 bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col will-change-transform"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-neutral-900">
                      {/* Using standard img with loading="lazy" is often faster for initial paint than complex wrappers if not needed */}
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top-left badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border backdrop-blur-md shadow-lg ${categoryBadgeColor(v.category)}`}>
                          {v.category}
                        </span>
                        {isTrending && (
                          <span className="px-2.5 py-1 rounded-lg bg-red-500/90 text-white text-[10px] font-black uppercase backdrop-blur-md shadow-lg">
                            🔥 Hot
                          </span>
                        )}
                      </div>

                      {/* Top-right: veg badge */}
                      {(v.is_veg || v.is_pure_veg) && (
                        <div className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-green-600/90 backdrop-blur-md flex items-center justify-center border border-green-500/30 shadow-lg z-10">
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                      )}

                      {/* Bottom overlay for Rating */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/10 shadow-lg">
                          <span className="material-icons-round text-yellow-400 text-xs">star</span>
                          {m.rating}
                          <span className="text-gray-400 ml-0.5 font-medium">({m.reviews})</span>
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors duration-200 mb-2">
                          {v.name.trim()}
                        </h3>

                        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow font-medium">
                          {v.description}
                        </p>

                        {/* Serves info */}
                        <div className="flex items-center gap-3 mb-5 text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/5 font-semibold">
                            <span className="material-icons-round text-sm text-primary">groups</span>
                            {v.category === 'Catering' ? '30–100 Guests' : '10–20 Guests'}
                          </span>
                        </div>

                        {/* CTA */}
                        {slug ? (
                          <Link
                            to={`/vendor/${slug}`}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-black uppercase tracking-wider text-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group-hover:from-orange-500 group-hover:to-primary"
                          >
                            <span className="material-icons-round text-sm">restaurant_menu</span>
                            View Menu
                          </Link>
                        ) : (
                          <button
                            className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-not-allowed opacity-70"
                            disabled
                          >
                            <span className="material-icons-round text-sm">lock</span>
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
           MOBILE FILTER DRAWER (Premium)
         ═══════════════════════════════════════════════ */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] sm:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"></div>
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-white/10 rounded-t-[2rem] p-6 pb-12 animate-slideUp shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8"></div>

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white italic">FILTERS & SORT</h3>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveDiet('All Diet');
                  setSortBy('popular');
                }}
                className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">Category</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Diet */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">Diet Preference</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {DIET_FILTERS.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDiet(d)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${activeDiet === d
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sort */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">Sort Order</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setSortBy(o.value)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold uppercase border transition-all text-center ${sortBy === o.value
                    ? 'bg-primary/20 text-white border-primary/50'
                    : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-orange-600 text-white font-black uppercase tracking-wider text-sm shadow-xl shadow-primary/20"
            >
              Show {filtered.length} Vendors
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
