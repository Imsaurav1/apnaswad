import { Flame, PhoneCall, QrCode, Users } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Flame,
    title: 'Fresh High-Flame Wok',
    desc: 'Every plate of Chowmein, Fried Rice & Chilli Potato is tossed live in front of you.',
  },
  {
    icon: PhoneCall,
    title: 'Direct Call Booking',
    desc: 'Call Rohit directly anytime for quick pickup, table hold, or bulk orders.',
  },
  {
    icon: Users,
    title: 'Friends & Party Packs',
    desc: 'Hosting a birthday treat or coaching farewell? Book group combos online.',
  },
  {
    icon: QrCode,
    title: 'PhonePe / UPI Ready',
    desc: 'Pay smoothly via PhonePe QR at the counter or cash after your meal.',
  },
];

export function SpecialtiesStrip() {
  return (
    <section className="border-b border-amber-900/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {HIGHLIGHTS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#D92D20] ring-1 ring-red-100">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-[#1A1412]">{item.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
