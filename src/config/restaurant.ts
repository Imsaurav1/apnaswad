export const RESTAURANT_CONFIG = {
  name: 'Apna Swad',
  hindiName: 'अपना स्वाद',
  subtitle: 'Chinese • Italian • Fast Food & More',
  hindiTagline: 'हर स्वाद में कुछ खास!',
  ownerName: 'Rohit Sahu',

  phoneRaw: '8676072182',
  phoneDisplay: '+91 86760 72182',
  whatsappNumber: '918676072182',

  locationShort: 'Opposite High School, Rahika',
  locationHindi: 'रहिका, हाई स्कूल के सामने',
  locationFull: 'Opposite Rahika High School, Rahika, Madhubani, Bihar',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rahika+High+School+Madhubani+Bihar',

  openingHours: '4:00 PM – 10:30 PM',
  openDays: 'Open Daily (Mon – Sun)',
  paymentMethods: ['PhonePe / UPI QR', 'Cash'],

  shopPhotos: [
    {
      src: '/images/shop-front-1.jpg',
      alt: 'Apna Swad fast food cart illuminated at evening in Rahika with Rohit preparing fresh Chinese dishes',
      caption: 'Live Wok Kitchen — Freshly Tossed Every Evening',
    },
    {
      src: '/images/shop-front-2.jpg',
      alt: 'Apna Swad stall front view opposite Rahika High School showing full menu board and clean counter',
      caption: 'Opposite High School, Rahika — Easy Pickup & Hangout',
    },
  ],
} as const;

export function getTelHref(phone = RESTAURANT_CONFIG.phoneRaw): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+91${digits}`;
  return `tel:+${digits}`;
}

export function getWhatsAppHref(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
}
