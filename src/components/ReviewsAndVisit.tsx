import { MapPin, Clock, Star, PartyPopper, PhoneCall, ExternalLink } from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref } from '../config/restaurant';

const REVIEWS = [
  {
    name: 'Saurabh Jha',
    tag: 'Chowmein & Momos Fan',
    text: 'Best evening chowmein and crispy fried momos near Rahika High School. The red garlic chutney hits different!',
  },
  {
    name: 'Priya Kumari',
    tag: 'Family Takeaway',
    text: 'We always call Rohit bhaiya 15 minutes before reaching so our Chilli Potato and Spring Rolls are packed hot and fresh.',
  },
  {
    name: 'Vivek Yadav',
    tag: 'Birthday Group Order',
    text: 'Booked a 10-plate combo for friends after coaching. Great taste, super reasonable prices, and clean counter.',
  },
];

export function ReviewsAndVisit() {
  return (
    <section id="visit" className="border-t border-amber-900/10 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D92D20]">
                Loved by Locals
              </span>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-[#1A1412]">
                Why Rahika Keeps Coming Back
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 border border-amber-200">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>Freshly Made • Student &amp; Family Favourite</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-stone-200/80 bg-[#FFFBF5] p-6 shadow-sm"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">“{review.text}”</p>
                <div className="mt-4 pt-3 border-t border-amber-900/10">
                  <p className="font-display text-sm font-bold text-[#1A1412]">{review.name}</p>
                  <p className="text-xs text-stone-500">{review.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location + Party Catering Banner */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl border border-amber-900/15 bg-[#FFFBF5] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-[#B42318]">
                <MapPin className="h-3.5 w-3.5" />
                Visit Our Stall
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1A1412]">
                {RESTAURANT_CONFIG.locationShort}
              </h3>
              <p className="font-hindi text-base font-bold text-[#D92D20]">
                {RESTAURANT_CONFIG.locationHindi}
              </p>
              <p className="text-sm text-stone-600">
                {RESTAURANT_CONFIG.locationFull}. Easy to spot in the evening with our bright red
                &amp; yellow illuminated Apna Swad food cart.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-sm">
                <div className="rounded-2xl bg-white p-4 border border-stone-200/80">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-stone-500">
                    <Clock className="h-3.5 w-3.5 text-[#D92D20]" />
                    Opening Hours
                  </p>
                  <p className="mt-1 font-display font-bold text-[#1A1412]">
                    {RESTAURANT_CONFIG.openingHours}
                  </p>
                  <p className="text-xs text-stone-500">{RESTAURANT_CONFIG.openDays}</p>
                </div>

                <div className="rounded-2xl bg-white p-4 border border-stone-200/80">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-stone-500">
                    <PhoneCall className="h-3.5 w-3.5 text-[#D92D20]" />
                    Direct Phone
                  </p>
                  <p className="mt-1 font-display font-bold text-[#1A1412]">
                    {RESTAURANT_CONFIG.phoneDisplay}
                  </p>
                  <p className="text-xs text-stone-500">Prop: {RESTAURANT_CONFIG.ownerName}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={RESTAURANT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1A1412] px-5 py-3 text-sm font-bold text-white hover:bg-stone-800 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={getTelHref()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D92D20]/30 bg-red-50 px-5 py-3 text-sm font-bold text-[#B42318] hover:bg-red-100 transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call for Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#D92D20] to-[#991B1B] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-amber-300">
                <PartyPopper className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
                Planning a Party or Bulk Combo Order?
              </h3>
              <p className="text-sm text-red-100 leading-relaxed">
                Get special combo rates on bulk Chowmein, Fried Momos, Chilli Potato, Spring Rolls
                &amp; Burgers for birthdays, college treats, and family evenings.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={getTelHref()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-extrabold text-[#1A1412] hover:bg-amber-300 transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Rohit for Party Deals</span>
              </a>
              <a
                href="#booking"
                className="w-full inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
              >
                Book Group Table Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
