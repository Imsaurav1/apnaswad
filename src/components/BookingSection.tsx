import { FormEvent, useEffect, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import {
  PhoneCall,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Utensils,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref, getWhatsAppHref } from '../config/restaurant';
import { BookingMode, BookingRecord, CartItem, SpiceLevel } from '../types';
import { OrderTicket } from './OrderTicket';

interface BookingSectionProps {
  mode: BookingMode;
  onModeChange: (mode: BookingMode) => void;
  cart: CartItem[];
  onUpdateQty: (menuItemId: string, portion: 'Half' | 'Full', delta: number) => void;
  onClearCart: () => void;
}

const TIME_SLOTS = [
  '4:30 PM',
  '5:30 PM',
  '6:30 PM',
  '7:30 PM',
  '8:30 PM',
  '9:30 PM',
];

const OCCASIONS = [
  'Evening Hangout',
  'Family Dine-In',
  'Birthday / Friends Party',
  'Quick Takeaway',
];

const STORAGE_KEY = 'apna_swad_bookings_v1';

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function BookingSection({
  mode,
  onModeChange,
  cart,
  onUpdateQty,
  onClearCart,
}: BookingSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [date, setDate] = useState(getTodayDateString);
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [guests, setGuests] = useState(4);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [spicePreference, setSpicePreference] = useState<SpiceLevel>('Medium');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [shareError, setShareError] = useState('');
  const ticketRef = useRef<HTMLDivElement>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BookingRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (cart.length > 0 && mode !== 'preorder') {
      // Keep user's explicit choice unless they clicked proceed
    }
  }, [cart.length, mode]);

  const cartTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT_CONFIG.phoneRaw);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  const handleShareOrder = async () => {
    if (!confirmedBooking || !ticketRef.current) return;
    setShareError('');

    try {
      const blob = await toBlob(ticketRef.current, {
        pixelRatio: 2,
        backgroundColor: '#FFF8ED',
      });
      if (!blob) throw new Error('Could not create the booking image.');

      const file = new File([blob], `Apna-Swad-${confirmedBooking.id}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Apna Swad Order #${confirmedBooking.id}`,
          text: 'Here is my order!',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Apna-Swad-${confirmedBooking.id}.png`;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareError('The ticket image could not be shared. Please try again.');
    }
  };

  const buildBookingMessage = (booking: BookingRecord): string => {
    const lines = [
      `*New ${booking.mode === 'table' ? 'Table / Party Booking' : 'Pre-Order Pickup'} — ${RESTAURANT_CONFIG.name}*`,
      `Booking ID: #${booking.id}`,
      `Name: ${booking.customerName}`,
      `Phone: ${booking.customerPhone}`,
      `Date: ${booking.date} at ${booking.timeSlot}`,
    ];

    if (booking.mode === 'table') {
      lines.push(`Guests: ${booking.guests ?? 2} | Occasion: ${booking.occasion ?? 'Dine-In'}`);
    } else if (booking.items && booking.items.length > 0) {
      lines.push('--- Ordered Dishes ---');
      booking.items.forEach((item) => {
        lines.push(
          `• ${item.name} (${item.portion}) x${item.quantity} = ₹${item.unitPrice * item.quantity}`
        );
      });
      lines.push(`*Estimated Total: ₹${booking.totalAmount ?? 0}*`);
    }

    lines.push(`Spice Level: ${booking.spicePreference}`);
    if (booking.notes) lines.push(`Notes: ${booking.notes}`);
    lines.push('Please confirm my booking. Thank you!');
    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setError('Please enter your name so Rohit knows who is booking.');
      return;
    }
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (mode === 'preorder' && cart.length === 0) {
      setError('Your Pre-Order basket is empty. Add dishes from the Menu above or switch to Table Booking.');
      return;
    }

    const record: BookingRecord = {
      id: `AS-${Math.floor(1000 + Math.random() * 9000)}`,
      mode,
      customerName: cleanName,
      customerPhone: cleanPhone.slice(-10),
      date,
      timeSlot,
      guests: mode === 'table' ? guests : undefined,
      occasion: mode === 'table' ? occasion : undefined,
      spicePreference,
      notes: notes.trim() || undefined,
      items: mode === 'preorder' ? [...cart] : undefined,
      totalAmount: mode === 'preorder' ? cartTotal : undefined,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [record, ...recentBookings].slice(0, 4);
    setRecentBookings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }

    setConfirmedBooking(record);
    if (mode === 'preorder') {
      onClearCart();
    }
  };

  return (
    <section id="booking" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          Online Booking &amp; Call
        </span>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#1A1412] sm:text-4xl">
          Book Your Table, Party Pack, or Quick Pickup
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600">
          Reserve ahead so your Chowmein, Momos &amp; Chilli Potato hit the hot wok right as you
          arrive — or tap to call Rohit directly.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Booking Form / Ticket */}
        <div className="lg:col-span-7 rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-xl shadow-amber-950/5">
          {confirmedBooking ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-5 border border-emerald-200">
                <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Booking Ticket Ready • #{confirmedBooking.id}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-emerald-950">
                    Thank you, {confirmedBooking.customerName}!
                  </h3>
                  <p className="mt-1 text-sm text-emerald-800">
                    Tap <strong>Share Order Image</strong> or <strong>Call Rohit Directly</strong>{' '}
                    below so the kitchen starts preparing on time.
                  </p>
                </div>
              </div>

              <OrderTicket confirmedBooking={confirmedBooking} ticketRef={ticketRef} />

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Booking Type</span>
                  <span className="font-bold text-[#1A1412]">
                    {confirmedBooking.mode === 'table' ? 'Table / Party Reserve' : 'Pre-Order Pickup'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date &amp; Slot</span>
                  <span className="font-bold text-[#1A1412]">
                    {confirmedBooking.date} • {confirmedBooking.timeSlot}
                  </span>
                </div>
                {confirmedBooking.guests && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Guests &amp; Occasion</span>
                    <span className="font-bold text-[#1A1412]">
                      {confirmedBooking.guests} Guests ({confirmedBooking.occasion})
                    </span>
                  </div>
                )}
                {confirmedBooking.items && confirmedBooking.items.length > 0 && (
                  <div className="border-t border-stone-200 pt-3 space-y-1.5">
                    <p className="font-bold text-stone-700">Items Pre-Ordered:</p>
                    {confirmedBooking.items.map((item) => (
                      <div
                        key={`${item.menuItemId}-${item.portion}`}
                        className="flex justify-between text-stone-700"
                      >
                        <span>
                          {item.name} ({item.portion}) × {item.quantity}
                        </span>
                        <span className="font-semibold">₹{item.unitPrice * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-stone-200 pt-2 font-display text-base font-extrabold text-[#D92D20]">
                      <span>Estimated Total</span>
                      <span>₹{confirmedBooking.totalAmount}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Spice Preference</span>
                  <span className="font-semibold">{confirmedBooking.spicePreference}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleShareOrder}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Share Order Image</span>
                </button>
                <a
                  href={getTelHref()}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D92D20] px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#B42318] transition-colors"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>Call {RESTAURANT_CONFIG.ownerName} Now</span>
                </a>
              </div>
              {shareError && <p role="alert" className="text-sm font-semibold text-red-700">{shareError}</p>}

              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="w-full rounded-xl border border-stone-200 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mode Switcher */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-stone-100 p-1.5">
                <button
                  type="button"
                  onClick={() => onModeChange('table')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    mode === 'table'
                      ? 'bg-white text-[#1A1412] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Utensils className="h-4 w-4 text-[#D92D20]" />
                  <span>Table / Party Booking</span>
                </button>
                <button
                  type="button"
                  onClick={() => onModeChange('preorder')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    mode === 'preorder'
                      ? 'bg-white text-[#1A1412] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 text-[#D92D20]" />
                  <span>
                    Pre-Order Pickup {cart.length > 0 ? `(${cart.reduce((s, c) => s + c.quantity, 0)})` : ''}
                  </span>
                </button>
              </div>

              {/* Pre-Order Cart Review */}
              {mode === 'preorder' && (
                <div className="rounded-2xl border border-amber-900/15 bg-[#FFFBF5] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-sm font-bold text-[#1A1412]">
                      Your Selected Dishes
                    </h3>
                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Clear
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-xs text-stone-600">
                        No dishes added yet. Pick your Chowmein, Momos or Burgers from the Menu!
                      </p>
                      <a
                        href="#menu"
                        className="mt-2 inline-block text-xs font-bold text-[#D92D20] underline"
                      >
                        Browse Menu ↑
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {cart.map((item) => (
                        <div
                          key={`${item.menuItemId}-${item.portion}`}
                          className="flex items-center justify-between gap-2 rounded-xl bg-white p-2.5 border border-stone-200/80 text-xs sm:text-sm"
                        >
                          <div>
                            <p className="font-bold text-[#1A1412]">{item.name}</p>
                            <p className="text-xs text-stone-500">
                              {item.portion} • ₹{item.unitPrice} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.menuItemId, item.portion, -1)}
                              className="rounded-lg border border-stone-200 p-1 hover:bg-stone-100 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.menuItemId, item.portion, 1)}
                              className="rounded-lg border border-stone-200 p-1 hover:bg-stone-100 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <span className="ml-2 font-bold text-[#1A1412] min-w-[44px] text-right">
                              ₹{item.unitPrice * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-amber-900/10 font-display text-base font-extrabold">
                        <span>Estimated Total</span>
                        <span className="text-[#D92D20]">₹{cartTotal}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Name & Mobile */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Aman Kumar"
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none focus:ring-2 focus:ring-red-500/15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10-digit WhatsApp / Call no."
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none focus:ring-2 focus:ring-red-500/15"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#D92D20]" />
                    <span>Visit / Pickup Date</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayDateString()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#D92D20]" />
                    <span>Evening Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests & Occasion for Table Booking */}
              {mode === 'table' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                      <Users className="h-3.5 w-3.5 text-[#D92D20]" />
                      <span>Number of Guests</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                      Occasion / Order Type
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none"
                    >
                      {OCCASIONS.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Spice Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">
                  Spice Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Medium', 'Spicy'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpicePreference(level)}
                      className={`rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                        spicePreference === level
                          ? 'border-[#D92D20] bg-red-50 text-[#B42318]'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {level === 'Spicy' ? 'Extra Spicy 🌶️' : level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-1.5">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Less oil, extra momo chutney, no onion/garlic, birthday pack..."
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm focus:border-[#D92D20] focus:outline-none"
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-semibold text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#D92D20] py-4 font-display text-base font-extrabold text-white shadow-lg shadow-red-900/20 hover:bg-[#B42318] transition-colors cursor-pointer"
              >
                {mode === 'table'
                  ? 'Generate Table Booking Pass →'
                  : 'Confirm Pre-Order Booking →'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Call Booking Card + Recent Tickets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#1A1412] via-[#2B1512] to-[#4A1410] p-6 sm:p-8 text-white shadow-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
              <PhoneCall className="h-3.5 w-3.5" />
              Instant Booking on Call
            </span>
            <h3 className="mt-3 font-display text-2xl font-extrabold">
              Want to Book in 10 Seconds? Call {RESTAURANT_CONFIG.ownerName} Directly!
            </h3>
            <p className="mt-2 text-sm text-stone-300 leading-relaxed">
              Prefer speaking directly for group seating, coaching treats, or instant takeaway parcel?
              Tap below to dial our kitchen counter right now.
            </p>

            <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                  Booking &amp; Call Hotline
                </p>
                <p className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {RESTAURANT_CONFIG.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-emerald-300 font-semibold">
                  WhatsApp: {RESTAURANT_CONFIG.whatsappDisplay}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getTelHref()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-extrabold text-[#1A1412] hover:bg-amber-300 transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Now</span>
              </a>
              <a
                href={getWhatsAppHref(
                  `Namaste ${RESTAURANT_CONFIG.ownerName} ji! I want to book / order from ${RESTAURANT_CONFIG.name}.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-xs text-stone-300 flex items-center justify-between">
              <span>Daily Hours: {RESTAURANT_CONFIG.openingHours}</span>
              <span className="text-amber-300 font-semibold">Zero Commission</span>
            </div>
          </div>

          {/* Recent Bookings Saved on Device */}
          {recentBookings.length > 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-stone-700">
                Your Recent Bookings
              </h4>
              <div className="mt-3 space-y-2.5">
                {recentBookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-2xl bg-stone-50 px-3.5 py-2.5 text-xs border border-stone-200/70"
                  >
                    <div>
                      <p className="font-bold text-[#1A1412]">
                        #{b.id} • {b.mode === 'table' ? `${b.guests} Guests` : 'Pre-Order'}
                      </p>
                      <p className="text-stone-500">
                        {b.date} at {b.timeSlot}
                      </p>
                    </div>
                    <a
                      href={getWhatsAppHref(buildBookingMessage(b))}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-emerald-50 px-2.5 py-1.5 font-bold text-emerald-700 hover:bg-emerald-100"
                    >
                      Resend WA
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
