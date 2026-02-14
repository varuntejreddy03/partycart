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

interface CartItem {
  id: string; // unique key for map
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

const ADMIN_PHONE = '916309855320';

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
      <div key={i} className="rounded-2xl border border-white/[0.06] bg-surface/40 p-5">
        <div className="flex gap-4">
          <div className="flex-grow space-y-3">
            <div className="h-4 w-3/4 bg-white/10 rounded"></div>
            <div className="h-3 w-1/2 bg-white/5 rounded"></div>
            <div className="h-8 w-24 bg-white/5 rounded mt-2"></div>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white/5"></div>
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
    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface/80 backdrop-blur-xl text-white text-sm font-bold shadow-2xl border border-white/10">
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
  const [loading, setLoading] = useState(true);

  // Cart Map: itemId -> CartItem
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());
  const [cartOpen, setCartOpen] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(getTomorrowDate());
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  const allVendors = (vendorData as any).restaurants as VendorInfo[];
  const registryEntry = slug ? VENDOR_REGISTRY[slug] : null;
  const vendorInfo = registryEntry ? allVendors.find((v) => v.name === registryEntry.infoName) : null;

  // Load menu data lazily
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    loadMenu(slug).then((data) => {
      // Calculate sections immediately to set active category without an extra render cycle
      if (data) {
        const sections = extractMenuItems(data);
        if (sections.length > 0) {
          setActiveCategory(sections[0].category);
        }
      }
      setMenuData(data);
      setLoading(false);
    });
  }, [slug]);

  const menuSections = useMemo(() => {
    if (!menuData) return [];
    return extractMenuItems(menuData);
  }, [menuData]);

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

  /* ── Toast helper ── */
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, []);

  /* ── Cart functions ── */
  const addToCart = useCallback((item: MenuItem) => {
    if (!item.name || !item.price) return;

    setCart((prev) => {
      const next = new Map<string, CartItem>(prev);
      const existing = next.get(item.name!);

      if (existing) {
        next.set(item.name!, { ...existing, quantity: existing.quantity + 1 });
      } else {
        next.set(item.name!, {
          id: item.name!,
          name: item.name!,
          price: item.price!,
          quantity: 1,
          isVeg: item.isVeg ?? false,
        });
      }
      return next;
    });
    showToast(`${item.name} added`);
  }, [showToast]);

  const updateQuantity = useCallback((itemName: string, delta: number) => {
    setCart((prev) => {
      const next = new Map<string, CartItem>(prev);
      const existing = next.get(itemName);
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        next.delete(itemName);
      } else {
        next.set(itemName, { ...existing, quantity: newQty });
      }
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart(new Map());
      setCartOpen(false);
    }
  }, []);

  const cartItems = useMemo(() => Array.from(cart.values()), [cart]);
  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems]);

  const getItemQty = useCallback((name: string) => {
    return cart.get(name)?.quantity ?? 0;
  }, [cart]);

  /* ── Form validation ── */
  const isFormValid = customerName.trim().length >= 2 && customerPhone.trim().length >= 10 && deliveryDate;

  /* ── WhatsApp order ── */
  const sendWhatsAppOrder = useCallback(() => {
    if (cartItems.length === 0) return;
    if (!isFormValid) {
      alert('Please fill in all delivery details first!');
      return;
    }

    const vendorName = vendorInfo?.name.trim() || 'Unknown';
    const dateObj = new Date(deliveryDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    const lines = [
      `*New Order via PartyCart*`,
      `*Restaurant:* ${vendorName}`,
      `____________________`,
      ``,
      `*Customer:* ${customerName.trim()}`,
      `*Phone:* ${customerPhone.trim()}`,
      `*Date:* ${formattedDate}`,
      ...(customerAddress.trim() ? [`*Address:* ${customerAddress.trim()}`] : []),
      ...(customerNote.trim() ? [`*Note:* ${customerNote.trim()}`] : []),
      ``,
      `____________________`,
      `*ORDER DETAILS:*`,
      ``,
      ...cartItems.map((item, i) =>
        `${i + 1}. ${item.isVeg ? '🟢' : '🔴'} *${item.name}*\n   ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
      ),
      ``,
      `____________________`,
      `*GRAND TOTAL: ${formatPrice(cartTotal)}*`,
    ];

    // Open WhatsApp
    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, '_blank');
  }, [cartItems, cartTotal, vendorInfo, customerName, customerPhone, deliveryDate, customerAddress, customerNote, isFormValid]);

  /* ─── Not Found ─── */
  if (!registryEntry || !vendorInfo) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons-round text-gray-600 text-7xl mb-4 block">storefront</span>
          <h2 className="text-2xl font-black text-white mb-2">Restaurant Not Found</h2>
          <p className="text-gray-500 mb-6">The menu you're looking for doesn't exist.</p>
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
    <div className="bg-dark min-h-screen relative text-white selection:bg-primary/30 pb-32">
      {/* ── Toast (Portal) ── */}
      {ReactDOM.createPortal(
        <Toast message={toastMsg} visible={toastVisible} />,
        document.body
      )}

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ═══════════════════════════════════════
           STICKY CART BAR (BOTTOM)
         ═══════════════════════════════════════ */}
      {cartCount > 0 && !cartOpen && ReactDOM.createPortal(
        <div className="fixed bottom-4 left-4 right-4 z-[90] animate-slideUp">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full max-w-2xl mx-auto flex items-center justify-between p-4 bg-gradient-to-r from-primary to-orange-600 text-white rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ring-1 ring-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-bold opacity-90">{cartCount} ITEM{cartCount > 1 ? 'S' : ''}</span>
              <span className="text-lg font-black">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm group">
              View Cart <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform">shopping_bag</span>
            </div>
          </button>
        </div>,
        document.body
      )}

      {/* ═══════════════════════════════════════
           VENDOR HERO HEADER
         ═══════════════════════════════════════ */}
      <section className="relative z-10">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          {/* Use standard img for hero for instant LCP and reliability */}
          <div className="w-full h-full bg-neutral-900">
            <img
              src={vendorInfo.image}
              alt={vendorInfo.name}
              className="w-full h-full object-cover opacity-80"
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-dark"></div>

          <Link
            to={AppRoutes.VENDORS}
            className="absolute top-28 left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition hover:-translate-x-1"
          >
            <span className="material-icons-round text-xl">arrow_back</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl border border-white/10 shadow-2xl bg-surface/40">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-surface/50 flex-shrink-0 -mt-12 sm:mt-0">
                <img
                  src={vendorInfo.image}
                  alt={vendorInfo.name.trim()}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="sync"
                />
              </div>
              <div className="flex-grow pt-1">
                <h1 className="text-3xl sm:text-4xl font-black text-white italic tracking-tight mb-2 leading-none shadow-black drop-shadow-lg">
                  {vendorInfo.name.trim()}
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed max-w-lg mb-4 line-clamp-2 font-medium">{vendorInfo.description}</p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 flex items-center gap-1.5">
                    <span className="material-icons-round text-sm text-yellow-400">star</span>
                    4.2 Rating
                  </span>
                  {(vendorInfo.is_veg || vendorInfo.is_pure_veg) && (
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-bold text-green-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Pure Veg
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           MENU NAVIGATION (Sticky)
         ═══════════════════════════════════════ */}
      <div className="sticky top-20 z-40 bg-dark/95 backdrop-blur-xl border-b border-white/5 py-3 mt-8 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto hide-scroll pb-1">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 ${vegOnly
                ? 'bg-green-600/20 text-green-400 border-green-500/30 ring-1 ring-green-500/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
            >
              <div className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${vegOnly ? 'border-green-500' : 'border-gray-500'}`}>
                {vegOnly && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
              </div>
              VEG
            </button>

            <div className="w-px h-6 bg-white/10 mx-1 flex-shrink-0"></div>

            {filteredSections.map((s) => (
              <button
                key={s.category}
                onClick={() => scrollToCategory(s.category)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${activeCategory === s.category
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
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
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 min-h-[50vh]">
        {loading ? (
          <MenuSkeleton />
        ) : (
          <div className="flex gap-10">
            {/* Desktop Sidebar (Optional - kept hidden for cleaner focus, or can be enabled for large screens) */}

            <div className="flex-grow space-y-12">
              {filteredSections.map((section, secIdx) => (
                <div
                  key={section.category}
                  ref={(el) => { categoryRefs.current[section.category] = el; }}
                  className="scroll-mt-40"
                /* Removed animate-fade-in-up and animationDelay to fix scrolling 'lag' */
                >
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
                    {section.category}
                    <span className="text-sm font-bold text-gray-600 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                      {section.items.length}
                    </span>
                  </h2>

                  <div className="space-y-4">
                    {section.items.map((item, idx) => {
                      const qty = getItemQty(item.name || '');
                      return (
                        <MenuItemCard
                          key={`${item.name}-${idx}`}
                          item={item}
                          qty={qty}
                          onAdd={addToCart}
                          onUpdateQty={updateQuantity}
                          priority={secIdx === 0 && idx < 6} // Prioritize first few items
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredSections.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                  <span className="material-icons-round text-gray-600 text-6xl mb-4 block">soup_kitchen</span>
                  <p className="text-gray-500 text-lg font-bold">No items found</p>
                  <p className="text-gray-600 text-sm mt-1">Try turning off the veg filter</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
           CART DRAWER (Mobile + Desktop)
         ═══════════════════════════════════════ */}
      {cartOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100]" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

          <div
            className="absolute bottom-0 left-0 right-0 sm:top-0 sm:left-auto sm:right-0 sm:bottom-0 sm:w-[500px] bg-surface border-t sm:border-t-0 sm:border-l border-white/10 rounded-t-[2rem] sm:rounded-none flex flex-col shadow-2xl animate-slideUp sm:animate-slide-left h-[85vh] sm:h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-surface/50 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-black text-white">Your Order</h2>
                <p className="text-xs text-gray-400 font-medium mt-1">{vendorInfo.name.trim()} · {cartCount} items</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCart}
                  className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition"
                >
                  <span className="material-icons-round text-lg">delete_sweep</span>
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                >
                  <span className="material-icons-round text-white">close</span>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center bg-dark rounded-xl border border-white/10 h-9 overflow-hidden">
                      <button onClick={() => updateQuantity(item.name, -1)} className="w-9 h-full flex items-center justify-center text-primary hover:bg-white/5 transition">
                        <span className="material-icons-round text-base">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} className="w-9 h-full flex items-center justify-center text-primary hover:bg-white/5 transition">
                        <span className="material-icons-round text-base">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="material-icons-round text-primary text-xl">person_pin</span>
                  Delivery Details
                </h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition [color-scheme:dark]"
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Delivery Address (Optional)"
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Special Note (Optional)"
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-surface/50 backdrop-blur-md">
              <div className="flex justify-between items-end mb-4">
                <span className="text-gray-400 text-sm font-medium">Grand Total</span>
                <span className="text-3xl font-black text-white">{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={sendWhatsAppOrder}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${isFormValid
                  ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[#25D366]/20'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" className="w-6 h-6" />
                {isFormValid ? 'Confirm Order on WhatsApp' : 'Enter Details to Order'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MENU ITEM CARD (Memoized)
   ══════════════════════════════════════════════════ */
interface MenuItemCardProps {
  item: MenuItem;
  qty: number;
  onAdd: (item: MenuItem) => void;
  onUpdateQty: (name: string, delta: number) => void;
  priority?: boolean;
}

const MenuItemCard = React.memo<MenuItemCardProps>(({ item, qty, onAdd, onUpdateQty, priority = false }) => {
  const hasImage = item.imageUrl || (item.image && item.image.url);
  const imgUrl = item.imageUrl || (item.image ? item.image.url : '');

  // Stable handlers prevents re-renders of list
  const handleAdd = useCallback(() => onAdd(item), [onAdd, item]);
  const handleInc = useCallback(() => onUpdateQty(item.name || '', 1), [onUpdateQty, item.name]);
  const handleDec = useCallback(() => onUpdateQty(item.name || '', -1), [onUpdateQty, item.name]);

  const isBestSeller = item.ribbon === 'Bestseller' || (item.rating && item.rating >= 4.5);

  return (
    <div className={`group relative rounded-2xl border bg-surface/40 backdrop-blur-sm p-4 transition-all duration-300 hover:bg-surface/60 ${qty > 0 ? 'border-primary/50 bg-primary/[0.04]' : 'border-white/[0.06] hover:border-white/20'
      }`}>

      {/* Ribbon */}
      {isBestSeller && (
        <div className="absolute -top-3 -left-2 z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center gap-1 animate-pulse-slow">
            <span className="material-icons-round text-[10px]">stars</span>
            Bestseller
          </span>
        </div>
      )}

      <div className="flex gap-4">
        {/* Info */}
        <div className="flex-grow min-w-0 py-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            </span>
            {item.rating && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-1.5 rounded-full border border-yellow-500/20">
                <span className="material-icons-round text-[10px]">star</span>
                {item.rating}
              </span>
            )}
            {item.containsEgg && (
              <span className="text-[9px] font-bold text-gray-500 border border-gray-600 px-1 rounded uppercase bg-white/5">Egg</span>
            )}
          </div>

          <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors">{item.name}</h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-base font-black text-white">{item.price ? formatPrice(item.price) : 'MRP'}</span>
            {item.originalPrice && item.originalPrice > (item.price || 0) && (
              <span className="text-xs text-gray-500 line-through decoration-white/20">{formatPrice(item.originalPrice)}</span>
            )}
          </div>

          {item.description && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 opacity-80">{item.description}</p>
          )}
        </div>

        {/* Right side Image + Button */}
        <div className="flex-shrink-0 w-28 sm:w-32 flex flex-col items-center gap-3">
          <div className="w-full aspect-square relative">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/5">
              {hasImage && imgUrl ? (
                <img
                  src={imgUrl}
                  alt={item.name || ''}
                  className="w-full h-full object-cover"
                  loading={priority ? "eager" : "lazy"}
                  decoding={priority ? "sync" : "async"}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  <span className="material-icons-round text-3xl">restaurant</span>
                </div>
              )}
            </div>

            {/* Button Overlay */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] z-10 shadow-xl">
              {qty === 0 ? (
                <button
                  onClick={handleAdd}
                  className="w-full h-9 rounded-lg bg-surface border border-primary/30 text-primary text-xs font-black uppercase hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1 backdrop-blur-md shadow-lg"
                >
                  ADD
                </button>
              ) : (
                <div className="w-full h-9 flex items-center justify-between rounded-lg bg-primary text-white overflow-hidden shadow-lg ring-2 ring-primary/50">
                  <button onClick={handleDec} className="w-9 h-full flex items-center justify-center hover:bg-black/20 text-white">
                    <span className="material-icons-round text-sm">remove</span>
                  </button>
                  <span className="text-xs font-black">{qty}</span>
                  <button onClick={handleInc} className="w-9 h-full flex items-center justify-center hover:bg-black/20 text-white">
                    <span className="material-icons-round text-sm">add</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
MenuItemCard.displayName = 'MenuItemCard';

export default VendorMenu;
