# PartyCart — High-Converting Catering Discovery & Ordering UI

PartyCart is a React + Vite web app focused on **party food discovery**, **vendor menu exploration**, and **WhatsApp-first lead conversion** for Hyderabad catering use cases.

This project is designed to help users quickly:
- discover vendors by category and diet,
- open detailed vendor menus,
- add items to cart,
- and place enquiries/orders over WhatsApp.

---

## Why this app matters

Party food ordering often drops users in the middle of the funnel (confusion, too many choices, weak CTAs). PartyCart addresses that with:
- clear category + diet filters,
- visual trust signals,
- prominent contact/WhatsApp prompts,
- fast lazy-loaded menu JSON chunks,
- mobile-friendly navigation and order paths.

---

## Core Features

- **Vendor discovery page** with:
  - category filters (Party Box / Live Counter / Catering),
  - diet filters (Veg / Non-Veg),
  - search + sorting.
- **Dynamic vendor menu pages**:
  - JSON-loaded vendor menus,
  - category jump navigation,
  - veg-only filtering,
  - cart with quantity controls,
  - WhatsApp order payload generation.
- **Conversion-focused UX**:
  - floating and docked CTAs,
  - direct call options,
  - quick social proof chips,
  - “instant help” routes from discovery flow.
- **Performance improvements**:
  - menu JSON lazy loading via `import.meta.glob`,
  - menu cache for repeat opens,
  - menu prefetch on vendor-card hover,
  - reduced repeated parsing in VendorMenu page.

---

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Routing:** React Router
- **Bundler:** Vite
- **Styling:** Tailwind-style utility classes in JSX + global CSS
- **Data:** Local JSON (`data.json`, `vendormenu/*.json`)

---

## Project Structure

```text
partycart/
├── App.tsx
├── pages/
│   ├── Home.tsx
│   ├── Vendors.tsx
│   ├── VendorMenu.tsx
│   ├── Contact.tsx
│   └── Quote.tsx
├── components/
│   ├── Navbar.tsx
│   ├── BottomNav.tsx
│   ├── ConversionDock.tsx
│   └── ...
├── utils/
│   ├── vendorHelpers.ts
│   └── ...
├── vendormenu/
│   └── *.json
├── data.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Data Model (Quick View)

### `data.json`
Top-level vendor cards list:
- `name`
- `category`
- `description`
- `image`
- `distance_km`
- `delivery_duration_min`
- `is_veg`
- `is_pure_veg`

### `vendormenu/*.json`
Per-vendor menu payload (lazy-loaded when user opens a vendor page).

---

## Conversion Optimization Plan (Practical)

If your goal is **more orders**, prioritize these:

1. **Track CTA events**
   - track clicks for WhatsApp, Call, View Menu, Add to Cart.
2. **A/B test hero CTA copy**
   - “Get Menu in 30 Sec” vs “Order Now”.
3. **Add urgency with honesty**
   - “Limited same-day slots” only when true.
4. **Improve trust block**
   - show real photos + ratings + fulfilled events count.
5. **Shorten quote flow**
   - reduce non-essential fields and ask details later on WhatsApp.
6. **Retarget high-intent users**
   - collect lightweight intent signals (menu opens/cart adds) for remarketing.

---

## Performance Notes

- Vendor menus are split into separate chunks and loaded on demand.
- Menus are cached after first load to improve repeat navigation.
- Prefetching is used where intent is strong (e.g., vendor card hover).

---

## Recommended Next Improvements

- Add **event analytics dashboard** (daily leads, top vendors, top dropped step).
- Add **schema.org structured data** for local business + menu pages.
- Add **server-side lead webhook** for CRM integration.
- Add **image compression pipeline** for vendor thumbnails.
- Add **PWA install prompt** for repeat ordering users.

---

## Deployment

This app is static-site friendly and can be deployed on:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting supporting SPA routing/hash routing

---

## Support

For business/operations updates (numbers, vendor updates, menu data), edit:
- `data.json`
- `vendormenu/*.json`
- CTA contact links in page/component files.

---

## License

Private/internal project unless otherwise specified.
