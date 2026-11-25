export type MenuCategory =
  | 'All'
  | 'Chowmein & Noodles'
  | 'Momos'
  | 'Starters & Chilli'
  | 'Fried Rice'
  | 'Rolls & Burgers';

export type SpiceLevel = 'Mild' | 'Medium' | 'Spicy';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: Exclude<MenuCategory, 'All'>;
  description: string;
  image: string;
  isVeg: boolean;
  priceHalf?: number;
  priceFull: number;
  bestseller?: boolean;
  chefSpecial?: boolean;
  spice?: SpiceLevel;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  portion: 'Half' | 'Full';
  unitPrice: number;
  quantity: number;
  isVeg: boolean;
}

export type BookingMode = 'table' | 'preorder';

export interface BookingRecord {
  id: string;
  mode: BookingMode;
  customerName: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  guests?: number;
  occasion?: string;
  spicePreference: SpiceLevel;
  notes?: string;
  items?: CartItem[];
  totalAmount?: number;
  createdAt: string;
}
