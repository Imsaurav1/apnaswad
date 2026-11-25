import { Phone, ShoppingBag, CalendarCheck, Flame } from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref } from '../config/restaurant';

interface NavbarProps {
  cartCount: number;
  onOpenBooking: (mode?: 'table' | 'preorder') => void;
}

export function Navbar({ cartCount, onOpenBooking }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-900/10 bg-[#FFFBF5]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D92D20] to-[#991B1B] text-amber-300 shadow-md shadow-red-900/20 ring-2 ring-amber-400/50 transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-amber-300/25" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#1A1412]">
                {RESTAURANT_CONFIG.name}
              </span>
              <span className="hidden sm:inline-block font-hindi text-xs font-bold text-[#D92D20]">
                {RESTAURANT_CONFIG.hindiName}
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500">
              {RESTAURANT_CONFIG.locationShort}
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-700">
          <a href="#menu" className="hover:text-[#D92D20] transition-colors">
            Menu
          </a>
          <a href="#our-shop" className="hover:text-[#D92D20] transition-colors">
            Our Stall
          </a>
          <a href="#booking" className="hover:text-[#D92D20] transition-colors">
            Online Booking
          </a>
          <a href="#visit" className="hover:text-[#D92D20] transition-colors">
            Location
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={getTelHref()}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D92D20]/25 bg-red-50 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#B42318] hover:bg-red-100 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Call: {RESTAURANT_CONFIG.phoneRaw}</span>
            <span className="sm:hidden">Call Now</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking(cartCount > 0 ? 'preorder' : 'table')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D92D20] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-900/20 hover:bg-[#B42318] transition-all cursor-pointer"
          >
            {cartCount > 0 ? (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Order ({cartCount})</span>
              </>
            ) : (
              <>
                <CalendarCheck className="h-4 w-4" />
                <span>Book Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
