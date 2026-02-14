
import { VendorMenuData } from '../types';

/* ── Vendor slug mapping (vendors with menu pages) ── */
export const VENDOR_REGISTRY: Record<string, { file: string; infoName: string }> = {
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

export const VENDOR_SLUGS: Record<string, string> = {
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

/* ── Dynamic import cache ── */
const menuCache = new Map<string, VendorMenuData>();

export async function loadMenu(slug: string): Promise<VendorMenuData | null> {
  if (menuCache.has(slug)) return menuCache.get(slug)!;
  const entry = VENDOR_REGISTRY[slug];
  if (!entry) return null;
  try {
    // Vite handles this dynamic import effectively
    const mod = await import(`../vendormenu/${entry.file}.json`);
    const data = (mod.default || mod) as VendorMenuData;
    menuCache.set(slug, data);
    return data;
  } catch (error) {
    console.warn(`Failed to load menu for ${slug}:`, error);
    return null;
  }
}

// Prefetch: triggers the download but doesn't wait for it
export function prefetchMenu(slug: string) {
  if (menuCache.has(slug)) return;
  const entry = VENDOR_REGISTRY[slug];
  if (!entry) return;

  // Create a low priority request
  const link = document.createElement('link');
  link.rel = 'prefetch';
  // Note: this assumes the build output path, which is tricky in dev mode.
  // Instead, let's just use the loadMenu function but let it run detached.
  loadMenu(slug).then(() => {
    // Cache populated silently
  }).catch(() => { });
}
