# Apna Swad — Official Website & Online Booking

Website for **Apna Swad** (*हर स्वाद में कुछ खास!*), serving fresh Indo-Chinese (Chowmein, Chilli Potato, Fried Rice, Paneer Chilli), Momos, Spring Rolls, and Fast Food opposite High School, Rahika.

## Quick Customization

All shop contact details, phone/WhatsApp number, opening hours, and gallery photos live in one place:
- **`src/config/restaurant.ts`** — Update `phoneRaw`, `phoneDisplay`, `whatsappNumber`, `openingHours`, or `locationShort`.
- **`src/data/menu.ts`** — Update dish names, Half/Full prices, Veg/Non-Veg flags, or swap internet food image URLs with local images in `public/images/`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Deploy to Vercel

```bash
npm run build
vercel --prod
```
