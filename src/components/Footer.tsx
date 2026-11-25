import { Flame, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_CONFIG, getTelHref } from '../config/restaurant';

export function Footer() {
  return (
    <footer className="bg-[#140F0D] text-stone-400 pb-24 md:pb-10 pt-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D92D20] text-amber-300">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold text-white">
                {RESTAURANT_CONFIG.name}{' '}
                <span className="font-hindi text-sm text-amber-400">
                  ({RESTAURANT_CONFIG.hindiName})
                </span>
              </p>
              <p className="text-xs text-stone-400">{RESTAURANT_CONFIG.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-xs sm:text-sm">
            <a href={getTelHref()} className="inline-flex items-center gap-1.5 text-amber-300 font-semibold hover:underline">
              <Phone className="h-4 w-4" />
              {RESTAURANT_CONFIG.phoneDisplay}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#D92D20]" />
              {RESTAURANT_CONFIG.locationShort}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_CONFIG.name} • Prop: {RESTAURANT_CONFIG.ownerName}
          </p>
          <p className="font-hindi text-stone-400">{RESTAURANT_CONFIG.hindiTagline}</p>
        </div>
      </div>
    </footer>
  );
}
