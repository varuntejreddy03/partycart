import React from 'react';
import { Link } from 'react-router-dom';
import vendorJson from '../data.json';

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

// ── Vendor slug mapping (vendors with menu pages) ──
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

export const Vendors: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [activeDiet, setActiveDiet] = React.useState<string>('All Diet');
  const [sortBy, setSortBy] = React.useState<string>('popular');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Filter
  const filtered = React.useMemo(() => {
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

  return (
    <div className="bg-dark min-h-screen relative">
      {/* ═══ Ambient BG ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px]"></div>
      </div>

      {/* ═══════════════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 pt-28 pb-6 sm:pt-36 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            {allVendors.length} Vendors Live in Hyderabad
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic text-white leading-[0.95] tracking-tight mb-4">
            CATERING SERVICES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
              AROUND YOU
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
            Deals that sizzle hotter than your celebration. 🔥
          </p>

          {/* ── Search Bar ── */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search by cuisine, vendor or dish…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-6 rounded-2xl glass-input text-white placeholder-gray-500 text-sm font-medium"
            />
          </div>

          {/* ── Filter Pills (Desktop) ── */}
          <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
            <div className="w-px h-8 bg-white/10 self-center mx-1"></div>
            {DIET_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDiet(d)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeDiet === d
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

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="sm:hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold mb-4"
          >
            <span className="material-icons-round text-lg">tune</span> Filters & Sort
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           PROMO BANNER
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-orange-600 to-accent p-[1px]">
          <div className="relative bg-gradient-to-r from-primary/90 via-orange-600/90 to-accent/90 rounded-2xl px-6 py-5 sm:px-10 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <span className="material-icons-round text-white text-3xl">local_fire_department</span>
              </div>
              <div>
                <p className="text-white font-black text-lg sm:text-xl italic tracking-tight">
                  Book Now for This Weekend!
                </p>
                <p className="text-white/80 text-xs sm:text-sm">
                  Limited slots available • Valentine's Special combos live
                </p>
              </div>
            </div>
            <button
              className="relative z-10 flex-shrink-0 bg-white text-primary font-black text-sm px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Book Now →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           TRENDING THIS WEEK
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tight">
              Trending <span className="text-primary">This Week</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden sm:block">
            🔥 Hot picks
          </span>
        </div>
        <div className="flex gap-5 overflow-x-auto hide-scroll pb-2">
          {trendingVendors.map((v) => {
            const m = getVendorMeta(v.name);
            return (
              <div
                key={v.name}
                className="group flex-shrink-0 w-64 sm:w-72 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/90 text-white text-[10px] font-black uppercase backdrop-blur-sm flex items-center gap-1">
                      🔥 Trending
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1">
                    <span className="material-icons-round text-yellow-400 text-xs">star</span> {m.rating}
                  </div>
                </div>
                <div className="p-4 bg-surface/80">
                  <h3 className="text-sm font-bold text-white truncate mb-1">{v.name.trim()}</h3>

                  <p className="text-gray-500 text-[11px] truncate">{v.description}</p>
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
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm font-medium">
            Showing <span className="text-white font-bold">{filtered.length}</span> vendors
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-white/10 text-white text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           VENDOR CARDS GRID
         ═══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 sm:pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-icons-round text-gray-600 text-6xl mb-4 block">search_off</span>
            <p className="text-gray-500 text-lg font-bold">No vendors found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => {
              const m = getVendorMeta(v.name);
              const isTrending = trendingNames.has(v.name);
              return (
                <div
                  key={v.name}
                  className="group relative rounded-[20px] overflow-hidden border border-white/[0.06] hover:border-white/20 bg-surface/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>

                    {/* Top-left badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border backdrop-blur-sm ${categoryBadgeColor(
                          v.category
                        )}`}
                      >
                        {v.category}
                      </span>
                      {isTrending && (
                        <span className="px-2.5 py-1 rounded-lg bg-red-500/90 text-white text-[10px] font-black uppercase backdrop-blur-sm">
                          🔥 Hot
                        </span>
                      )}
                    </div>

                    {/* Top-right: veg badge */}
                    {(v.is_veg || v.is_pure_veg) && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-md bg-green-600/90 backdrop-blur-sm flex items-center justify-center border border-green-500/30">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                    )}

                    {/* Bottom overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1">
                          <span className="material-icons-round text-yellow-400 text-xs">star</span>
                          {m.rating}
                          <span className="text-gray-400 ml-0.5">({m.reviews})</span>
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {v.name.trim()}
                      </h3>
                    </div>



                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {v.description}
                    </p>

                    {/* Serves info */}
                    <div className="flex items-center gap-2 mb-4 text-[11px]">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                        <span className="material-icons-round text-xs text-primary">groups</span>
                        {v.category === 'Catering' ? 'Serves 30–100 guests' : 'Serves 10–20 guests'}
                      </span>
                    </div>

                    {/* CTA */}
                    {VENDOR_SLUGS[v.name] ? (
                      <Link
                        to={`/vendor/${VENDOR_SLUGS[v.name]}`}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-black uppercase tracking-wider text-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span className="material-icons-round text-sm">restaurant_menu</span>
                        View Menu
                      </Link>
                    ) : (
                      <button
                        className="w-full py-3 rounded-xl bg-white/10 text-gray-400 text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-default"
                        disabled
                      >
                        <span className="material-icons-round text-sm">restaurant_menu</span>
                        Menu Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
           MOBILE FILTER DRAWER
         ═══════════════════════════════════════════════ */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] sm:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl p-6 pb-10 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-black text-white mb-5">Filters & Sort</h3>

            {/* Categories */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Category</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Diet */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Diet</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {DIET_FILTERS.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDiet(d)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeDiet === d
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sort */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Sort By</p>
            <div className="space-y-2 mb-6">
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setSortBy(o.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${sortBy === o.value
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-wider text-sm"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
           STICKY MOBILE BOTTOM BAR
         ═══════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-surface/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 pb-safe flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex-1"
          >
            <span className="material-icons-round text-sm">tune</span> Filters
          </button>
          <button
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wider flex-[2] shadow-lg shadow-primary/30"
          >
            <span className="material-icons-round text-sm">shopping_cart</span> Order Now
          </button>
        </div>
      </div>
    </div>
  );
};
