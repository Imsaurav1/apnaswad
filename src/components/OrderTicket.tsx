import type { Ref } from 'react';
import { CalendarDays, Clock3, MapPin, Utensils } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import type { BookingRecord } from '../types';

interface OrderTicketProps {
  confirmedBooking: BookingRecord;
  ticketRef: Ref<HTMLDivElement>;
}

export function OrderTicket({ confirmedBooking, ticketRef }: OrderTicketProps) {
  const booking = confirmedBooking;

  return (
    <div
      id="order-ticket"
      ref={ticketRef}
      className="overflow-hidden rounded-3xl border border-amber-900/15 bg-[#FFF8ED] text-[#1A1412] shadow-sm"
    >
      <div className="bg-[#D92D20] px-6 py-5 text-white sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-200">
              Apna Swad • Fresh &amp; Desi
            </p>
            <h3 className="mt-1 font-display text-2xl font-extrabold">Your booking ticket</h3>
          </div>
          <div className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-100">Ticket</p>
            <p className="font-display text-sm font-extrabold">#{booking.id}</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
          {booking.mode === 'table' ? 'Table / Party Booking' : 'Pre-Order Pickup'}
        </p>
        <p className="mt-1 font-display text-2xl font-extrabold">Namaste, {booking.customerName}!</p>
        <p className="mt-1 text-sm text-stone-600">Your details are ready to share with the kitchen.</p>

        <div className="mt-5 grid gap-3 rounded-2xl border border-amber-900/10 bg-white/70 p-4 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#D92D20]" />
            <div><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Date</p><p className="text-sm font-bold">{booking.date}</p></div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#D92D20]" />
            <div><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Time</p><p className="text-sm font-bold">{booking.timeSlot}</p></div>
          </div>
          {booking.mode === 'table' && (
            <div className="flex items-start gap-2.5 sm:col-span-2">
              <Utensils className="mt-0.5 h-4 w-4 shrink-0 text-[#D92D20]" />
              <div><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Party</p><p className="text-sm font-bold">{booking.guests} guests • {booking.occasion}</p></div>
            </div>
          )}
        </div>

        {booking.items && booking.items.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-stone-500">Your order</p>
            <div className="mt-2 space-y-2">
              {booking.items.map((item) => (
                <div key={`${item.menuItemId}-${item.portion}`} className="flex justify-between gap-4 text-sm">
                  <span>{item.name} · {item.portion} × {item.quantity}</span>
                  <span className="font-bold">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-dashed border-amber-900/20 pt-3 font-display text-base font-extrabold">
              <span>Estimated total</span><span className="text-[#D92D20]">₹{booking.totalAmount ?? 0}</span>
            </div>
          </div>
        )}

        {(booking.notes || booking.spicePreference) && (
          <div className="mt-4 rounded-xl bg-amber-100/70 px-4 py-3 text-xs text-stone-700">
            <span className="font-bold">Kitchen note:</span> {booking.spicePreference} spice{booking.notes ? ` · ${booking.notes}` : ''}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 border-t border-dashed border-amber-900/20 pt-4 text-xs text-stone-600">
          <MapPin className="h-4 w-4 shrink-0 text-[#D92D20]" />
          <span>{RESTAURANT_CONFIG.name} · Call {RESTAURANT_CONFIG.ownerName} at {RESTAURANT_CONFIG.phoneDisplay}</span>
        </div>
      </div>
    </div>
  );
}
