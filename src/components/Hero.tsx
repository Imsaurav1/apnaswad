import { PhoneCall, CalendarCheck, MapPin, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref, getWhatsAppHref } from '../config/restaurant';

interface HeroProps {
  onOpenBooking: (mode?: 'table' | 'preorder') => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const quickWhatsApp = getWhatsAppHref(
    `Namaste ${RESTAURANT_CONFIG.ownerName} ji! I would like to book / order from ${RESTAURANT_CONFIG.name}.`
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#140F0D] text-white"
    >
      {/* Warm wok-ember radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-[460px] w-[460px] rounded-full bg-[#D92D20]/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-[380px] w-[380px] rounded-full bg-amber-500/15 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
        {/* Left column: Headline & Direct Call + Booking CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{RESTAURANT_CONFIG.openDays}</span>
            <span className="text-amber-500/60">•</span>
            <Clock className="h-3.5 w-3.5" />
            <span>{RESTAURANT_CONFIG.openingHours}</span>
          </div>

          <div className="space-y-3">
            <p className="font-hindi text-sm sm:text-base font-bold tracking-wide text-amber-400">
              {RESTAURANT_CONFIG.hindiTagline} — {RESTAURANT_CONFIG.subtitle}
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Hot Wok-Tossed{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Chinese &amp; Momos
              </span>
              , Made Fresh for You.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
              From smoky street-style <strong className="text-white">Chowmein</strong> and{' '}
              <strong className="text-white">Crispy Chilli Potato</strong> to crunchy{' '}
              <strong className="text-white">Fried Momos</strong> &amp;{' '}
              <strong className="text-white">Spring Rolls</strong> — reserve your evening seats,
              pre-order takeaway, or call{' '}
              <span className="text-amber-300 font-semibold">{RESTAURANT_CONFIG.ownerName}</span>{' '}
              directly in one tap.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 pt-1">
            <a
              href={getTelHref()}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#D92D20] to-[#B42318] px-6 py-4 text-base font-bold text-white shadow-xl shadow-red-950/50 ring-1 ring-white/15 hover:brightness-110 transition-all"
            >
              <PhoneCall className="h-5 w-5 animate-pulse" />
              <span>Call to Book: {RESTAURANT_CONFIG.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking('table')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-base font-extrabold text-[#1A1412] shadow-lg hover:bg-amber-300 transition-all cursor-pointer"
            >
              <CalendarCheck className="h-5 w-5" />
              <span>Book Online Now</span>
            </button>

            <a
              href={quickWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-semibold text-stone-100 hover:bg-white/10 transition-colors"
            >
              <span>WhatsApp Order</span>
              <ArrowRight className="h-4 w-4 text-amber-400" />
            </a>
          </div>

          {/* Location & Trust stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-stone-300">
              <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
              <span>{RESTAURANT_CONFIG.locationShort}</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-300">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Half Plates Starting ₹40</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-300">
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                ₹
              </span>
              <span>PhonePe QR &amp; Cash Accepted</span>
            </div>
          </div>
        </div>

        {/* Right column: Real Shop Photo Showcase */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-[#1F1714] shadow-2xl shadow-black/60">
              <img
                src="/images/shop-front-1.jpg"
                alt={RESTAURANT_CONFIG.shopPhotos[0].alt}
                className="h-[360px] sm:h-[430px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140F0D] via-transparent to-black/20" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-full bg-[#D92D20] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      Live Wok Kitchen
                    </span>
                    <p className="mt-1.5 font-display text-lg font-bold text-white">
                      {RESTAURANT_CONFIG.name} • {RESTAURANT_CONFIG.ownerName}
                    </p>
                    <p className="font-hindi text-xs text-amber-300">
                      {RESTAURANT_CONFIG.locationHindi}
                    </p>
                  </div>
                  <a
                    href="#menu"
                    className="shrink-0 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/25 transition-colors"
                  >
                    See Menu →
                  </a>
                </div>
              </div>
            </div>

            {/* Info strip below hero card (no overlap on any viewport) */}
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-amber-400/25 bg-[#1F1714]/95 px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 font-display font-extrabold text-sm">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Made Hot on Order</p>
                  <p className="text-[11px] text-stone-400">Zero wait with Online Pre-Order</p>
                </div>
              </div>
              <a
                href="#booking"
                className="shrink-0 rounded-xl bg-amber-400/15 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-400/25 transition-colors"
              >
                Pre-Order →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
