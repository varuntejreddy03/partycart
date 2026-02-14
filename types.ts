export enum AppRoutes {
  HOME = '/',
  HOUSE_PARTIES = '/house-parties',
  CORPORATE = '/corporate',
  BULK = '/bulk',
  QUOTE = '/quote',
  CONTACT = '/contact',
  VENDORS = '/vendors',
  VENDOR_MENU = '/vendor/:slug',
}

export interface MenuItem {
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

export interface MenuSection {
  type: string;
  name?: string;
  layoutType?: number;
  list?: MenuItem[];
}

export interface VendorMenuData {
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