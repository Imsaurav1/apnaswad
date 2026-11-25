import { PhoneCall, CalendarCheck } from 'lucide-react';
import { getTelHref } from '../config/restaurant';

interface MobileStickyBarProps {
  cartCount: number;
  onOpenBooking: (mode?: 'table' | 'preorder') => void;
}

export function MobileStickyBar({ cartCount, onOpenBooking }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={getTelHref()}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A1412] py-3 text-sm font-bold text-white"
        >
          <PhoneCall className="h-4 w-4 text-amber-400" />
          <span>Call to Book</span>
        </a>
        <button
          type="button"
          onClick={() => onOpenBooking(cartCount > 0 ? 'preorder' : 'table')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D92D20] py-3 text-sm font-bold text-white cursor-pointer"
        >
          <CalendarCheck className="h-4 w-4" />
          <span>{cartCount > 0 ? `Book (${cartCount})` : 'Book Online'}</span>
        </button>
      </div>
    </div>
  );
}
