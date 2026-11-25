import { useState } from 'react';
import { MapPin, PhoneCall, CheckCircle2, Maximize2, X } from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref } from '../config/restaurant';

export function ShopGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="our-shop" className="bg-[#1A1412] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Story */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              Our Real Kitchen • Rahika
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Meet <span className="text-amber-400">{RESTAURANT_CONFIG.name}</span> — Honest Street
              Taste by {RESTAURANT_CONFIG.ownerName}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-300">
              Every evening opposite Rahika High School, our glowing red-and-gold wok station lights
              up with sizzling noodles, steaming momos, crispy chilli potatoes, and hot burgers. No
              pre-cooked leftovers — everything is tossed fresh when you order or arrive.
            </p>

            <ul className="space-y-3 text-sm text-stone-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Clean open-kitchen cart — watch your food cooked live</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Quick PhonePe QR &amp; cash counter checkout</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Dine-in seating nearby + fast packed takeaway parcels</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={getTelHref()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D92D20] px-5 py-3 text-sm font-bold text-white hover:bg-[#B42318] transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {RESTAURANT_CONFIG.phoneRaw}</span>
              </a>
              <a
                href={RESTAURANT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Open Landmark Map</span>
              </a>
            </div>
          </div>

          {/* Two Real Photos Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {RESTAURANT_CONFIG.shopPhotos.map((photo, idx) => (
              <div
                key={photo.src}
                className="group relative overflow-hidden rounded-3xl border border-amber-400/20 bg-[#251C18] shadow-xl"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="block w-full text-left cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-72 sm:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-black/55 p-2 text-white backdrop-blur-sm opacity-90 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Photo {idx + 1} • Real Stall
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{photo.caption}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full overflow-hidden rounded-3xl border border-white/15 bg-[#1A1412]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo preview"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={RESTAURANT_CONFIG.shopPhotos[lightboxIndex].src}
              alt={RESTAURANT_CONFIG.shopPhotos[lightboxIndex].alt}
              className="max-h-[80vh] w-full object-contain bg-black"
            />
            <div className="p-4 text-center text-sm font-medium text-stone-200">
              {RESTAURANT_CONFIG.shopPhotos[lightboxIndex].caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
