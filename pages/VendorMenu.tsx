import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { AppRoutes, MenuItem, VendorMenuData } from '../types';
import vendorData from '../data.json';
import { OptimizedImage } from '../components/OptimizedImage';
import { loadMenu, VENDOR_REGISTRY } from '../utils/vendorHelpers';

/* ── Types ── */
interface VendorInfo {
  name: string;
  category: string;
  description: string;
  image: string;
  distance_km: number;
  delivery_duration_min: number;
  is_veg: boolean;
  is_pure_veg?: boolean;
}

// Cart related types removed
const ADMIN_PHONE = '917396737700';

/* ── Helpers ── */
function extractMenuItems(data: VendorMenuData): { category: string; items: MenuItem[] }[] {
  const sections: { category: string; items: MenuItem[] }[] = [];
  if (!data?.data?.menuItems) return sections;

  for (const section of data.data.menuItems) {
    if (section.type === 'top-cards' && section.list) {
      const items = section.list.filter((i) => i.type === 'item');
      if (items.length > 0) {
        const seen = new Set<string>();
        const unique = items.filter((i) => {
          if (!i.name || seen.has(i.name)) return false;
          seen.add(i.name);
          return true;
        });
        sections.push({ category: '⭐ Bestsellers', items: unique });
      }
    } else if (section.type === 'menu' && section.list) {
      let currentCategory = 'Menu';
      let currentItems: MenuItem[] = [];
      const seenInCategory = new Set<string>();
      for (const entry of section.list) {
        if (entry.type === 'category' && entry.name) {
          if (currentItems.length > 0) {
            sections.push({ category: currentCategory, items: currentItems });
          }
          currentCategory = entry.name;
          currentItems = [];
          seenInCategory.clear();
        } else if (entry.type === 'item') {
          if (entry.name && !seenInCategory.has(entry.name)) {
            seenInCategory.add(entry.name);
            currentItems.push(entry);
          }
        }
      }
      if (currentItems.length > 0) {
        sections.push({ category: currentCategory, items: currentItems });
      }
    }
  }
  return sections;
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

/* ── Skeleton loader ── */
const MenuSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6 mt-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-2xl border border-border-custom bg-surface p-5 shadow-sm">
        <div className="flex gap-4">
          <div className="flex-grow space-y-3">
            <div className="h-4 w-3/4 bg-gray-500/20 rounded animate-pulse"></div>
            <div className="h-3 w-1/2 bg-gray-500/20 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-500/20 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-500/20 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

/* ── Toast notification ── */
const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div
    className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 pointer-events-none ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
  >
    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface backdrop-blur-xl text-content text-sm font-bold shadow-2xl border border-border-custom">
      <span className="material-icons-round text-green-500">check_circle</span>
      {message}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */
export const VendorMenu: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // Default to empty array if sections don't exist yet
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [vegOnly, setVegOnly] = useState(false);
  const [menuData, setMenuData] = useState<VendorMenuData | null>(null);
  const [menuSections, setMenuSections] = useState<{ category: string; items: MenuItem[] }[]>([]);
  const [loading, setLoading] = useState(true);

  // Removed Cart and Customer states
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const allVendors = (vendorData as any).restaurants as VendorInfo[];
  const registryEntry = slug ? VENDOR_REGISTRY[slug] : null;
  const vendorInfo = registryEntry ? allVendors.find((v) => v.name === registryEntry.infoName) : null;

  // Load menu data lazily
  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);
    setMenuSections([]);

    loadMenu(slug).then((data) => {
      if (!isMounted) return;

      if (data) {
        const sections = extractMenuItems(data);
        setMenuSections(sections);

        if (sections.length > 0) {
          setActiveCategory((prev) => (sections.some((s) => s.category === prev) ? prev : sections[0].category));
        }
      } else {
        setMenuSections([]);
      }

      setMenuData(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Removed the separate useEffect for setting activeCategory to avoid double-render

  useEffect(() => {
    if (vendorInfo) {
      document.title = `${vendorInfo.name.trim()} Menu | PartyCart`;
    }
  }, [vendorInfo]);

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      const offset = 180; // offset for sticky header + pills
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredSections = useMemo(() => {
    if (!vegOnly) return menuSections;
    return menuSections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.isVeg),
      }))
      .filter((s) => s.items.length > 0);
  }, [menuSections, vegOnly]);

  /* ── Contact helper ── */
  const contactOnWhatsApp = useCallback((itemName?: string) => {
    const vendorName = vendorInfo?.name.trim() || 'this vendor';
    let message = `Hi PartyCart! I'm interested in ordering from *${vendorName}*.`;
    if (itemName) {
      message += ` Specifically, I'm looking at *${itemName}*.`;
    }

    const msg = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, '_blank');
  }, [vendorInfo]);

  // Removed Cart functions and delivery forms
  /* ─── Not Found ─── */
  if (!registryEntry || !vendorInfo) {
    return (
      <div className="bg-theme min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons-round text-muted-custom text-7xl mb-4 block">storefront</span>
          <h2 className="text-2xl font-black text-content mb-2">Restaurant Not Found</h2>
          <p className="text-muted-custom mb-6">The menu you're looking for doesn't exist.</p>
          <Link
            to={AppRoutes.VENDORS}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:scale-105 transition"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme min-h-screen relative text-content selection:bg-primary/30 pb-32">
      {/* Floating WhatsApp button removed — replaced by sticky bottom order bar */}

      {/* ═══════════════════════════════════════
           VENDOR HERO HEADER
         ═══════════════════════════════════════ */}
      <section className="relative z-10">
        <div className="relative h-[220px] overflow-hidden">
          <div className="w-full h-full bg-[#0D0F1A]">
            <img
              src={vendorInfo.image}
              alt={vendorInfo.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {/* Hero Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0D0F1A]/95"></div>

          <Link
            to={AppRoutes.VENDORS}
            className="absolute top-28 left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/12 hover:bg-[#FF5C00]/20 hover:border-[#FF5C00] transition group"
          >
            <span className="material-icons-round text-xl">arrow_back</span>
          </Link>
        </div>

        <div className="relative z-20 max-w-[860px] mx-auto px-6 -mt-10">
          <div className="bg-white/[0.04] backdrop-blur-[12px] rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 flex-shrink-0 bg-[#13172A] shadow-xl">
                <img
                  src={vendorInfo.image}
                  alt={vendorInfo.name.trim()}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <h1 className="font-display text-[32px] sm:text-4xl text-white tracking-[1.5px] uppercase leading-none">
                    {vendorInfo.name.trim()}
                  </h1>
                  <div className="bg-[#FFB400] text-[#0D0F1A] px-3 py-1 rounded-lg font-body font-bold text-[13px] flex items-center gap-1.5 shadow-lg w-fit">
                    4.2 ★
                  </div>
                </div>
                <p className="font-body text-[#9A9DB0] text-sm leading-[1.7] max-w-2xl">{vendorInfo.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           MENU NAVIGATION (Sticky)
         ═══════════════════════════════════════ */}
      <div className="sticky top-20 z-40 bg-white/[0.03] backdrop-blur-xl border-b border-white/[0.08] py-4 mt-12">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="flex items-center gap-6 overflow-x-auto hide-scroll">
            <div className="flex items-center gap-3 flex-shrink-0 pr-4 border-r border-white/10">
              <div
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${vegOnly ? 'bg-[#22C55E]' : 'border-[1.5px] border-[#9A9DB0]'}`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all duration-300 ${vegOnly ? 'right-0.5 bg-white' : 'left-0.5 bg-[#9A9DB0]'}`}></div>
              </div>
              <span className="font-body text-[13px] text-[#9A9DB0] uppercase font-semibold tracking-wider">Veg</span>
            </div>

            {filteredSections.map((s) => (
              <button
                key={s.category}
                onClick={() => scrollToCategory(s.category)}
                className={`flex-shrink-0 px-4.5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === s.category
                  ? 'bg-[#FF5C00] text-white font-semibold'
                  : 'bg-transparent text-[#9A9DB0] hover:text-white'
                  }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
           MENU FEED
         ═══════════════════════════════════════ */}
      <section className="relative z-10 max-w-[860px] mx-auto px-6 pt-10 min-h-[50vh]">
        {loading ? (
          <MenuSkeleton />
        ) : (
          <div className="flex flex-col gap-10">
            {filteredSections.map((section, secIdx) => (
              <div
                key={section.category}
                ref={(el) => { categoryRefs.current[section.category] = el; }}
                className="scroll-mt-44"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display text-[22px] text-white tracking-widest uppercase">
                    {section.category}
                  </h2>
                  <span className="bg-[#FF5C00]/15 text-[#FF5C00] border border-[#FF5C00] px-2 py-0.5 rounded-[6px] font-body font-bold text-[12px]">
                    {section.items.length}
                  </span>
                </div>
                <div className="w-full h-px bg-white/[0.06] mb-4"></div>

                <div className="space-y-[10px]">
                  {section.items.map((item, idx) => (
                    <MenuItemCard
                      key={`${item.name}-${idx}`}
                      item={item}
                      onContact={() => contactOnWhatsApp(item.name || '')}
                      priority={secIdx === 0 && idx < 6}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredSections.length === 0 && (
              <div className="text-center py-20 bg-surface rounded-2xl border border-white/[0.06]">
                <span className="material-icons-round text-muted-custom text-6xl mb-4 block">soup_kitchen</span>
                <p className="text-muted-custom text-lg font-bold">No items found</p>
                <p className="text-muted-custom text-sm mt-1">Try turning off the veg filter</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Ambient background moved to bottom for better layering */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ── Single Order Button (Sticky Bottom Bar) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0D0F1A]/80 backdrop-blur-xl border-t border-white/[0.08] px-6 py-4 flex items-center justify-center gap-4">
        <button
          onClick={() => contactOnWhatsApp()}
          className="w-full max-w-[500px] py-4 rounded-2xl bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FF8C00] text-white font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,92,0,0.4)] hover:shadow-[0_0_40px_rgba(255,92,0,0.6)] hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" className="w-5 h-5 brightness-0 invert" />
          <span>Order via WhatsApp</span>
          <span className="material-icons-round text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MENU ITEM CARD (Memoized)
   ══════════════════════════════════════════════════ */
interface MenuItemCardProps {
  item: MenuItem;
  onContact: () => void;
  priority?: boolean;
}

const MenuItemCard = React.memo<MenuItemCardProps>(({ item, onContact, priority = false }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const hasImage = item.imageUrl || (item.image && item.image.url);
  const imgUrl = item.imageUrl || (item.image ? item.image.url : '');

  const isBestSeller = item.ribbon === 'Bestseller' || (item.rating && item.rating >= 4.5);

  return (
    <div className="group bg-[#13172A] border border-white/[0.06] rounded-xl p-4 sm:p-5 flex items-start gap-4 sm:gap-5 transition-all duration-300 hover:border-[#FF5C00]/40 hover:bg-[#FF5C00]/[0.04]">
      {/* ── Left Side: Details ── */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className={`w-4 h-4 rounded-[3px] border-[1.5px] flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-[#22C55E]' : 'border-[#FF4444]'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-[#22C55E]' : 'bg-[#FF4444]'}`} />
          </div>
          {isBestSeller && (
            <span className="text-[10px] font-bold text-[#FFB400] uppercase tracking-wider bg-[#FFB400]/10 px-2 py-0.5 rounded-full">
              Bestseller
            </span>
          )}
        </div>

        <h3 className="font-body font-semibold text-sm sm:text-base text-[#F5F5F0] mb-1 leading-snug">{item.name}</h3>
        <p className="font-body font-bold text-base sm:text-lg text-[#FF5C00] mb-2 sm:mb-3">{item.price ? formatPrice(item.price) : 'MRP'}</p>

        {item.description && (
          <div className="relative">
            <p className={`font-body text-[#7A7D94] text-[13px] leading-[1.6] ${!showFullDesc ? 'line-clamp-2' : ''}`}>
              {item.description}
            </p>
            {item.description.length > 80 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-[#FF5C00] text-[12px] font-semibold underline mt-1 block"
              >
                {showFullDesc ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Right Side: Image Only ── */}
      <div className="flex-shrink-0">
        <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden bg-[#1E2236] border border-white/5 shadow-inner">
          {hasImage && imgUrl ? (
            <img
              src={imgUrl}
              alt={item.name || ''}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#FF5C00]/50">
              <span className="material-icons-round text-2xl">restaurant</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
MenuItemCard.displayName = 'MenuItemCard';

export default VendorMenu;
