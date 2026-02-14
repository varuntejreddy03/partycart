import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import vendorData from '../data.json';
import { OptimizedImage } from '../components/OptimizedImage';

/* ── Types ── */
interface MenuItem {
  type: string;
  name?: string;
  imageUrl?: string;
  description?: string;
  isVeg?: boolean;
  containsEgg?: boolean;
  price?: number;
  originalPrice?: number;
  rating?: number | null;
  ribbon?: string;
  outletName?: string;
  image?: { url: string; caption: string } | null;
  displayImage?: boolean;
  addons?: string[];
  availableForOrder?: boolean;
}

interface MenuSection {
  type: string;
  name?: string;
  layoutType?: number;
  list?: MenuItem[];
}

interface VendorMenuData {
  data: {
    categoryList: { key: string; value: number }[];
    menuItems: MenuSection[];
    addons: Record<string, {
      addonName: string;
      displayName: string;
      options: { optionName: string; cost: number; isVeg: boolean }[];
    }>;
  };
}

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
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

/* ── Slug → filename + data.json name mapping ── */
const VENDOR_REGISTRY: Record<string, { file: string; infoName: string }> = {
  'mughlai-partycart': { file: 'Mughlai PartyCartmenu', infoName: 'Mughlai PartyCart ' },
  'kilokart': { file: 'KiloKartmenu', infoName: 'KiloKart' },
  'corporate-bites': { file: 'corporate_bitesmenu', infoName: 'Corporate Bites' },
  'telugu-ruchulu': { file: 'Telugu_Ruchulumenu', infoName: 'Telugu Ruchulu' },
  'daru-party': { file: 'darupartymenu', infoName: 'Daru party' },
  'godavari-ruchulu': { file: 'godavariruchulumenu', infoName: 'Godavari Ruchulu' },
  'ankapur-style-chicken': { file: 'ankapur-style-chicken', infoName: 'Ankapur Style Chicken' },
  'indo-chinese-hub': { file: 'indo-chinese-hub', infoName: 'Indo Chinese Hub' },
  'grazing-table': { file: 'grazing-table', infoName: 'Grazing Table' },
  'live-kebab-station': { file: 'live-kebab-station', infoName: 'Live Kebab Station' },
  'the-tea-party': { file: 'the-tea-party', infoName: 'The Tea Party' },
  'morning-kart-breakfast': { file: 'morning-kart-breakfast', infoName: 'Morning Kart [Breakfast]' },
  'home-chef-dakhni-style': { file: 'home-chef---dakhni-style', infoName: 'Home Chef - Dakhni Style' },
  'indo-chinese-live-counter': { file: 'indo-chinese-live-counter', infoName: 'Indo-Chinese Live Counter' },
  'mocktails-and-shakes-bar': { file: 'mocktails-and-shakes-bar', infoName: 'Mocktails & Shakes Bar' },
  'telugu-andhra-style-food': { file: 'telugu-and-andhra-style-food', infoName: 'Telugu & Andhra Style Food' },
  'aarti-bhojan': { file: 'aarti-bhojan', infoName: 'Aarti Bhojan' },
  'home-kitchen': { file: 'home-kitchen', infoName: 'Home Kitchen' },
  'hyderabadi-shaadi-ka-khana': { file: 'hyderabadi-shaadi-ka-khana', infoName: 'Hyderabadi Shaadi Ka Khana' },
  'indo-china-town': { file: 'indo-china-town', infoName: 'Indo-china town' },
  'telugu-pooja-vindu': { file: 'telugu-pooja-vindu', infoName: 'Telugu Pooja Vindu' },
};

const ADMIN_PHONE = '917396737700';

/* ── Dynamic import cache ── */
const menuCache = new Map<string, VendorMenuData>();

async function loadMenu(slug: string): Promise<VendorMenuData | null> {
  if (menuCache.has(slug)) return menuCache.get(slug)!;
  const entry = VENDOR_REGISTRY[slug];
  if (!entry) return null;
  try {
    const mod = await import(`../vendormenu/${entry.file}.json`);
    const data = (mod.default || mod) as VendorMenuData;
    menuCache.set(slug, data);
    return data;
  } catch {
    return null;
  }
}

/* ── Helpers ── */
function extractMenuItems(data: VendorMenuData): { category: string; items: MenuItem[] }[] {
  const sections: { category: string; items: MenuItem[] }[] = [];
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
        sections.push({ category: '⭐ Recommended', items: unique });
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
            <div className="h-3 w-16 bg-white/10 rounded"></div>
            <div className="h-4 w-48 bg-white/10 rounded"></div>
            <div className="h-4 w-24 bg-white/10 rounded"></div>
            <div className="h-3 w-full bg-white/5 rounded"></div>
          </div>
          <div className="w-28 h-28 rounded-xl bg-white/5"></div>
        </div>
      </div>
    ))}
  </div>
);

/* ── Toast notification ── */
const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div
    className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
  >
    <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-600/90 backdrop-blur-xl text-white text-sm font-bold shadow-2xl shadow-green-600/30 border border-green-500/30">
      <span className="material-icons-round text-lg">check_circle</span>
      {message}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */
export const VendorMenu: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeCategory, setActiveCategory] = React.useState<string>('');
  const [vegOnly, setVegOnly] = React.useState(false);
  const [menuData, setMenuData] = React.useState<VendorMenuData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [cart, setCart] = React.useState<Map<string, CartItem>>(new Map());
  const [cartOpen, setCartOpen] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastVisible, setToastVisible] = React.useState(false);
  const categoryRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Customer details
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [deliveryDate, setDeliveryDate] = React.useState(getTomorrowDate());
  const [deliveryTime, setDeliveryTime] = React.useState('12:00');
  const [customerAddress, setCustomerAddress] = React.useState('');
  const [customerNote, setCustomerNote] = React.useState('');

  const allVendors = (vendorData as any).restaurants as VendorInfo[];
  const registryEntry = slug ? VENDOR_REGISTRY[slug] : null;
  const vendorInfo = registryEntry ? allVendors.find((v) => v.name === registryEntry.infoName) : null;

  // Load menu data lazily
  React.useEffect(() => {
    if (!slug) return;
    setLoading(true);
    loadMenu(slug).then((data) => {
      setMenuData(data);
      setLoading(false);
    });
  }, [slug]);

  const menuSections = React.useMemo(() => {
    if (!menuData) return [];
    return extractMenuItems(menuData);
  }, [menuData]);

  React.useEffect(() => {
    if (menuSections.length > 0 && !activeCategory) {
      setActiveCategory(menuSections[0].category);
    }
  }, [menuSections, activeCategory]);

  React.useEffect(() => {
    if (vendorInfo) {
      document.title = `${vendorInfo.name.trim()} Menu | PartyCart`;
    }
  }, [vendorInfo]);

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSections = React.useMemo(() => {
    if (!vegOnly) return menuSections;
    return menuSections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.isVeg),
      }))
      .filter((s) => s.items.length > 0);
  }, [menuSections, vegOnly]);

  /* ── Toast helper ── */
  const showToast = React.useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  }, []);

  /* ── Cart functions ── */
  const addToCart = React.useCallback((item: MenuItem) => {
    if (!item.name || !item.price) return;
    setCart((prev) => {
      const next = new Map<string, CartItem>(prev);
      const existing: CartItem | undefined = next.get(item.name!);
      if (existing) {
        next.set(item.name!, { name: existing.name, price: existing.price, isVeg: existing.isVeg, quantity: existing.quantity + 1 });
      } else {
        next.set(item.name!, {
          name: item.name!,
          price: item.price!,
          quantity: 1,
          isVeg: item.isVeg ?? false,
        });
      }
      return next;
    });
    showToast(`${item.name} added to cart`);
  }, [showToast]);

  const updateQuantity = React.useCallback((name: string, delta: number) => {
    setCart((prev) => {
      const next = new Map<string, CartItem>(prev);
      const existing: CartItem | undefined = next.get(name);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        next.delete(name);
      } else {
        next.set(name, { name: existing.name, price: existing.price, isVeg: existing.isVeg, quantity: newQty });
      }
      return next;
    });
  }, []);

  const clearCart = React.useCallback(() => {
    setCart(new Map());
    setCartOpen(false);
  }, []);

  const cartItems = React.useMemo(() => Array.from(cart.values()), [cart]);
  const cartCount = React.useMemo(() => cartItems.reduce((sum, i) => sum + i.quantity, 0), [cartItems]);
  const cartTotal = React.useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems]);

  const getItemQty = React.useCallback((name: string) => {
    return cart.get(name)?.quantity ?? 0;
  }, [cart]);

  /* ── Form validation ── */
  const isFormValid = customerName.trim().length >= 2 && customerPhone.trim().length >= 10 && deliveryDate && deliveryTime;

  /* ── WhatsApp order ── */
  const sendWhatsAppOrder = React.useCallback(() => {
    if (cartItems.length === 0) return;
    if (!isFormValid) return;

    const vendorName = vendorInfo?.name.trim() || 'Unknown';

    // Format delivery date nicely
    const dateObj = new Date(deliveryDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    // Format delivery time nicely
    const [h, m] = deliveryTime.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    const formattedTime = `${h12}:${m} ${ampm}`;

    const lines = [
      `*New Order - PartyCart*`,
      `*Restaurant:* ${vendorName}`,
      `________________`,
      ``,
      `*Customer:* ${customerName.trim()}`,
      `*Phone:* ${customerPhone.trim()}`,
      `*Delivery Date:* ${formattedDate}`,
      `*Delivery Time:* ${formattedTime}`,
      ...(customerAddress.trim() ? [`*Address:* ${customerAddress.trim()}`] : []),
      ...(customerNote.trim() ? [`*Note:* ${customerNote.trim()}`] : []),
      ``,
      `________________`,
      `*ORDER ITEMS:*`,
      ``,
      ...cartItems.map((item, i) =>
        `${i + 1}. ${item.isVeg ? '[Veg]' : '[Non-Veg]'} *${item.name}*\n   Qty: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
      ),
      ``,
      `________________`,
      `*Grand Total: ${formatPrice(cartTotal)}*`,
    ];
    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, '_blank');
  }, [cartItems, cartTotal, vendorInfo, customerName, customerPhone, deliveryDate, deliveryTime, customerAddress, customerNote, isFormValid]);

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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-orange-600 transition"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = filteredSections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="bg-dark min-h-screen relative text-white selection:bg-primary/30">
      {/* ── Toast (Portal) ── */}
      {ReactDOM.createPortal(
        <Toast message={toastMsg} visible={toastVisible} />,
        document.body
      )}

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[50vh] bg-primary/8 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vh] bg-accent/6 rounded-full blur-[120px]"></div>
      </div>

      {/* ═══════════════════════════════════════
           STICKY CART BAR (BOTTOM) — Zomato/Swiggy style (Portal)
         ═══════════════════════════════════════ */}
      {cartCount > 0 && !cartOpen && ReactDOM.createPortal(
        <div
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}
        >
          <div style={{ background: 'linear-gradient(to right, #FF5722, #ea580c)', boxShadow: '0 -4px 30px rgba(249,115,22,0.5)' }}>
            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
              <button
                onClick={() => setCartOpen(true)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', color: 'white', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <span className="material-icons-round" style={{ fontSize: '24px' }}>shopping_cart</span>
                    <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', color: '#FF5722', fontSize: '10px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cartCount}
                    </span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', opacity: 0.9, lineHeight: 1 }}>{cartCount} item{cartCount > 1 ? 's' : ''} added</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1.2 }}>{formatPrice(cartTotal)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'white', color: '#FF5722', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  View Cart
                  <span className="material-icons-round" style={{ fontSize: '16px' }}>arrow_forward</span>
                </div>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ═══════════════════════════════════════
           VENDOR HERO HEADER
         ═══════════════════════════════════════ */}
      <section className="relative z-10">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <img src={vendorInfo.image} alt={vendorInfo.name.trim()} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
          <Link
            to={AppRoutes.VENDORS}
            className="absolute top-32 sm:top-24 left-4 sm:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md text-white text-sm font-bold border border-white/10 hover:bg-black/70 transition"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back
          </Link>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/10 flex-shrink-0">
                <img src={vendorInfo.image} alt={vendorInfo.name.trim()} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">{vendorInfo.name.trim()}</h1>
                <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{vendorInfo.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase border ${vendorInfo.category === 'Party Box'
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : vendorInfo.category === 'Live Counter'
                      ? 'bg-secondary/20 text-secondary border-secondary/30'
                      : 'bg-accent/20 text-accent border-accent/30'
                    }`}>
                    {vendorInfo.category}
                  </span>
                  {(vendorInfo.is_veg || vendorInfo.is_pure_veg) && (
                    <span className="flex items-center gap-1.5 text-green-400 font-bold text-xs px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      Pure Veg
                    </span>
                  )}
                  {!loading && (
                    <span className="text-gray-500 text-xs">{totalItems} items on menu</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           VEG TOGGLE
         ═══════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${vegOnly
              ? 'bg-green-600/20 text-green-400 border-green-500/30'
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
          >
            <span className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${vegOnly ? 'border-green-500 bg-green-500' : 'border-gray-500'}`}>
              {vegOnly && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
            </span>
            Veg Only
          </button>
          {!loading && (
            <span className="text-gray-500 text-xs font-medium">{totalItems} items</span>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
           MENU LAYOUT
         ═══════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 sm:pb-24">
        {loading ? (
          <MenuSkeleton />
        ) : (
          <div className="flex gap-8">
            {/* ── Category sidebar (Desktop) ── */}
            <div className="hidden lg:block w-56 flex-shrink-0 sticky top-24 h-fit">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 px-3">Menu</h3>
              <nav className="space-y-1">
                {filteredSections.map((s) => (
                  <button
                    key={s.category}
                    onClick={() => scrollToCategory(s.category)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${activeCategory === s.category
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className="truncate">{s.category}</span>
                    <span className="text-[10px] text-gray-600 font-bold">{s.items.length}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* ── Mobile category pills ── */}
            <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-dark/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
              <div className="flex gap-2 overflow-x-auto hide-scroll">
                {filteredSections.map((s) => (
                  <button
                    key={s.category}
                    onClick={() => scrollToCategory(s.category)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeCategory === s.category
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-white/5 text-gray-400 border-white/10'
                      }`}
                  >
                    {s.category}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Items list ── */}
            <div className="flex-grow mt-14 lg:mt-0">
              {filteredSections.map((section) => (
                <div
                  key={section.category}
                  ref={(el) => { categoryRefs.current[section.category] = el; }}
                  className="mb-10 scroll-mt-36 content-visibility-auto"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white">{section.category}</h2>
                      <div className="w-10 h-0.5 bg-primary rounded-full mt-1"></div>
                    </div>
                    <span className="text-xs text-gray-600 font-bold">{section.items.length} items</span>
                  </div>

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
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredSections.length === 0 && (
                <div className="text-center py-20">
                  <span className="material-icons-round text-gray-600 text-6xl mb-4 block">no_food</span>
                  <p className="text-gray-500 text-lg font-bold">No items found</p>
                  <p className="text-gray-600 text-sm mt-1">Try turning off the veg filter</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
           CART DRAWER
           Mobile: bottom sheet | Desktop: side panel
         ═══════════════════════════════════════ */}
      {cartOpen && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }} onClick={() => setCartOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          {/* Mobile: Bottom sheet / Desktop: Right side panel */}
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[90vh] lg:max-h-none lg:top-0 lg:left-auto lg:right-0 lg:bottom-0 lg:w-[480px] bg-dark border-t lg:border-t-0 lg:border-l border-white/10 rounded-t-3xl lg:rounded-none overflow-hidden flex flex-col animate-slide-up lg:animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle (mobile) + Header */}
            <div className="sticky top-0 bg-dark/95 backdrop-blur-xl z-10 border-b border-white/5">
              <div className="flex justify-center pt-3 pb-2 lg:hidden">
                <div className="w-10 h-1 rounded-full bg-white/20"></div>
              </div>
              <div className="flex items-center justify-between px-5 sm:px-6 pb-4 lg:pt-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">Your Order</h2>
                  <p className="text-gray-500 text-xs mt-0.5">{vendorInfo.name.trim()} · {cartCount} item{cartCount > 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition"
                  >
                    <span className="material-icons-round text-sm">delete_outline</span>
                    Clear
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white transition"
                  >
                    <span className="material-icons-round text-lg">close</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable content: Cart items + Customer form */}
            <div className="flex-grow overflow-y-auto">
              {/* ── Cart Items ── */}
              <div className="px-5 sm:px-6 py-4 space-y-2.5">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-surface/60 border border-white/[0.06]">
                    <span className={`w-3.5 h-3.5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </span>

                    <div className="flex-grow min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{formatPrice(item.price)} each</p>
                    </div>

                    <div className="flex items-center gap-0 rounded-lg border border-primary/30 overflow-hidden bg-white/5 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary hover:bg-primary/10 transition"
                      >
                        <span className="material-icons-round text-sm">{item.quantity === 1 ? 'delete' : 'remove'}</span>
                      </button>
                      <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white text-xs sm:text-sm font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary hover:bg-primary/10 transition"
                      >
                        <span className="material-icons-round text-sm">add</span>
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-black text-white w-16 sm:w-20 text-right flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Delivery Details ── */}
              <div className="px-5 sm:px-6 pb-4">
                <div className="border-t border-white/5 pt-5">
                  <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                    <span className="material-icons-round text-primary text-lg">person</span>
                    Delivery Details
                  </h3>

                  <div className="space-y-3">
                    {/* Name */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">Your Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
                      />
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">
                          <span className="material-icons-round text-[12px] mr-0.5 align-middle">calendar_today</span>
                          Delivery Date *
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">
                          <span className="material-icons-round text-[12px] mr-0.5 align-middle">schedule</span>
                          Delivery Time *
                        </label>
                        <input
                          type="time"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">Delivery Address</label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Enter delivery address"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
                      />
                    </div>

                    {/* Special Note */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-1 block">Special Instructions</label>
                      <textarea
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        placeholder="Any special requests? (e.g. less spicy, extra sauce)"
                        rows={2}
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer: Total + WhatsApp CTA ── */}
            <div className="sticky bottom-0 bg-dark/95 backdrop-blur-xl border-t border-white/10 px-5 sm:px-6 py-4 sm:py-5 space-y-3">
              {/* Summary */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Order Total</p>
                  <p className="text-xl sm:text-2xl font-black text-white">{formatPrice(cartTotal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] sm:text-xs text-gray-500">{cartCount} item{cartCount > 1 ? 's' : ''}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{vendorInfo.name.trim()}</p>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={sendWhatsAppOrder}
                disabled={!isFormValid}
                className={`w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 ${isFormValid
                  ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {isFormValid ? 'Send Order via WhatsApp' : 'Fill details to order'}
              </button>

              {!isFormValid && (
                <p className="text-center text-yellow-500/70 text-[10px] sm:text-[11px]">
                  <span className="material-icons-round text-[12px] align-middle mr-0.5">info</span>
                  Please fill in name, phone, date & time to place order
                </p>
              )}
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
}

const MenuItemCard = React.memo<MenuItemCardProps>(({ item, qty, onAdd, onUpdateQty }) => {
  const hasImage = item.imageUrl || (item.image && item.image.url);
  const imgUrl = item.imageUrl || (item.image ? item.image.url : '');

  // Stable handlers prevents re-renders of list
  const handleAdd = React.useCallback(() => onAdd(item), [onAdd, item]);
  const handleInc = React.useCallback(() => onUpdateQty(item.name || '', 1), [onUpdateQty, item.name]);
  const handleDec = React.useCallback(() => onUpdateQty(item.name || '', -1), [onUpdateQty, item.name]);

  const isBestSeller = item.ribbon === 'Bestseller' || (item.rating && item.rating >= 4.5);

  return (
    <div className={`group relative rounded-2xl border bg-surface/40 backdrop-blur-sm p-3 sm:p-4 transition-all duration-300 hover:bg-surface/60 ${qty > 0 ? 'border-primary/50 ring-1 ring-primary/20 bg-primary/[0.04]' : 'border-white/[0.06] hover:border-primary/30'
      }`}>

      {/* Best Seller Badge */}
      {isBestSeller && (
        <div className="absolute -top-3 -left-2 z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center gap-1 animate-pulse-slow">
            <span className="material-icons-round text-[10px]">stars</span>
            {item.ribbon || 'Top Pick'}
          </span>
        </div>
      )}

      <div className="flex gap-3 sm:gap-5">
        {/* Left: Item info */}
        <div className="flex-grow min-w-0 py-1">
          <div className="flex items-center gap-2 mb-1.5 wrap">
            <span className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-green-500' : 'border-red-500'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            {item.rating && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-1.5 rounded-full border border-yellow-500/20">
                <span className="material-icons-round text-[10px]">star</span>
                {item.rating}
              </span>
            )}
            {item.containsEgg && <span className="text-[9px] font-bold text-gray-500 border border-gray-700 px-1 rounded uppercase bg-white/5">Egg</span>}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-300">{item.name}</h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm sm:text-base font-black text-white decoration-slice">
              {item.price ? formatPrice(item.price) : ''}
            </span>
            {item.originalPrice && item.originalPrice > (item.price || 0) && (
              <span className="text-xs text-gray-500 line-through decoration-white/20">{formatPrice(item.originalPrice)}</span>
            )}
          </div>

          {item.description && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
              {item.description}
            </p>
          )}
        </div>

        {/* Right: Image + Add/Qty controls */}
        <div className="flex-shrink-0 w-28 sm:w-32 flex flex-col items-center gap-3">
          {hasImage && imgUrl ? (
            <div className="w-full aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5 bg-surface relative group-hover:scale-[1.02] transition-transform duration-300">
              <OptimizedImage
                src={imgUrl}
                alt={item.name || ''}
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] sm:aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <span className="material-icons-round text-gray-700 text-3xl">restaurant</span>
            </div>
          )}

          {/* Add / Quantity controls - Optimized UI */}
          <div className="relative -mt-6 w-[90%] z-10">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="w-full h-10 sm:h-9 rounded-lg bg-surface border border-primary/30 text-primary text-xs sm:text-sm font-black uppercase shadow-xl hover:bg-primary hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center gap-1 backdrop-blur-md"
              >
                ADD
                <span className="material-icons-round text-sm font-bold">add</span>
              </button>
            ) : (
              <div className="w-full h-10 sm:h-9 flex items-center justify-between rounded-lg bg-primary text-white shadow-xl overflow-hidden ring-1 ring-primary/50">
                <button
                  onClick={handleDec}
                  className="w-10 sm:w-9 h-full flex items-center justify-center hover:bg-black/20 active:bg-black/30 transition"
                >
                  <span className="material-icons-round text-sm">{qty === 1 ? 'delete' : 'remove'}</span>
                </button>
                <span className="text-xs font-black min-w-[20px] text-center">{qty}</span>
                <button
                  onClick={handleInc}
                  className="w-10 sm:w-9 h-full flex items-center justify-center hover:bg-black/20 active:bg-black/30 transition"
                >
                  <span className="material-icons-round text-sm">add</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
MenuItemCard.displayName = 'MenuItemCard';
