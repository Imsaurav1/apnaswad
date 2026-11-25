import { useMemo, useState } from 'react';
import { Search, Plus, Minus, Flame, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { CartItem, MenuCategory, MenuItem } from '../types';
import { VegBadge } from './VegBadge';
import { FoodImage } from './FoodImage';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem, portion: 'Half' | 'Full') => void;
  onUpdateQty: (menuItemId: string, portion: 'Half' | 'Full', delta: number) => void;
  onProceedToBooking: () => void;
}

export function MenuSection({
  cart,
  onAddToCart,
  onUpdateQty,
  onProceedToBooking,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortions, setSelectedPortions] = useState<Record<string, 'Half' | 'Full'>>({});

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (vegOnly && !item.isVeg) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.hindiName && item.hindiName.includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, vegOnly, searchQuery]);

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalCartValue = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const getPortion = (item: MenuItem): 'Half' | 'Full' => {
    if (!item.priceHalf) return 'Full';
    return selectedPortions[item.id] ?? 'Full';
  };

  const getCartQuantity = (menuItemId: string, portion: 'Half' | 'Full') => {
    return cart.find((c) => c.menuItemId === menuItemId && c.portion === portion)?.quantity ?? 0;
  };

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B42318]">
            <Flame className="h-3.5 w-3.5" />
            Our Signature Menu
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#1A1412] sm:text-4xl">
            Fresh Chinese &amp; Fast Food Classics
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm sm:text-base text-stone-600">
            Add items to build a quick <strong className="text-[#1A1412]">Pre-Order Pickup</strong>{' '}
            or browse prices before calling Rohit.
          </p>
        </div>

        {/* Search & Veg Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chowmein, momos..."
              className="w-full sm:w-60 rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1A1412] placeholder:text-stone-400 focus:border-[#D92D20] focus:outline-none focus:ring-2 focus:ring-red-500/15"
            />
          </div>

          <button
            type="button"
            onClick={() => setVegOnly((v) => !v)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
              vegOnly
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <VegBadge isVeg />
            <span>Veg Only</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {MENU_CATEGORIES.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-[#1A1412] text-white shadow-md'
                  : 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="font-display text-lg font-bold text-stone-800">No dishes match your filter</p>
          <p className="mt-1 text-sm text-stone-500">
            Try clearing your search or switching back to All categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setVegOnly(false);
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-[#D92D20] px-4 py-2 text-sm font-bold text-white hover:bg-[#B42318] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const portion = getPortion(item);
            const activePrice = portion === 'Half' && item.priceHalf ? item.priceHalf : item.priceFull;
            const qty = getCartQuantity(item.id, portion);

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-amber-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/10"
              >
                {/* Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                    <div className="rounded-lg bg-white/95 p-1 shadow-sm">
                      <VegBadge isVeg={item.isVeg} />
                    </div>
                    {item.bestseller && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-extrabold text-[#1A1412] shadow">
                        <Sparkles className="h-3 w-3" />
                        Bestseller
                      </span>
                    )}
                    {item.chefSpecial && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#D92D20] px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                        Chef Special
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg font-extrabold leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    <span className="rounded-xl bg-black/65 px-2.5 py-1 font-display text-base font-extrabold text-amber-300 backdrop-blur-sm">
                      ₹{activePrice}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {item.hindiName && (
                        <span className="font-hindi font-semibold text-stone-500">
                          {item.hindiName}
                        </span>
                      )}
                      {item.spice && (
                        <span className="ml-auto rounded-md bg-orange-50 px-2 py-0.5 font-semibold text-orange-700">
                          {item.spice === 'Spicy' ? '🌶️ Spicy' : item.spice}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
                  </div>

                  {/* Portion Selector & Add Button */}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                    {item.priceHalf ? (
                      <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPortions((prev) => ({ ...prev, [item.id]: 'Half' }))
                          }
                          className={`rounded-lg px-2.5 py-1.5 transition-all cursor-pointer ${
                            portion === 'Half'
                              ? 'bg-white text-[#1A1412] shadow-sm'
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          Half ₹{item.priceHalf}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPortions((prev) => ({ ...prev, [item.id]: 'Full' }))
                          }
                          className={`rounded-lg px-2.5 py-1.5 transition-all cursor-pointer ${
                            portion === 'Full'
                              ? 'bg-white text-[#1A1412] shadow-sm'
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          Full ₹{item.priceFull}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-stone-500">
                        Regular Plate • ₹{item.priceFull}
                      </span>
                    )}

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => onAddToCart(item, portion)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#D92D20] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#B42318] transition-colors cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#1A1412] px-2 py-1 text-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, portion, -1)}
                          aria-label="Decrease quantity"
                          className="rounded-lg p-1 hover:bg-white/15 cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[18px] text-center text-xs font-bold">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, portion, 1)}
                          aria-label="Increase quantity"
                          className="rounded-lg p-1 hover:bg-white/15 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pre-Order Basket Banner */}
      {totalCartItems > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-[#1A1412] p-5 sm:p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-[#1A1412]">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold">
                {totalCartItems} {totalCartItems === 1 ? 'dish' : 'dishes'} in your Pre-Order Basket
              </p>
              <p className="text-sm text-stone-300">
                Estimated Total: <span className="font-bold text-amber-300">₹{totalCartValue}</span>{' '}
                • Pay at counter via Cash or PhonePe
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onProceedToBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D92D20] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#B42318] transition-colors cursor-pointer"
          >
            <span>Complete Pre-Order Booking</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
