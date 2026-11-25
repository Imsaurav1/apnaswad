import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Chowmein & Noodles
  {
    id: 'veg-chowmein',
    name: 'Veg Hakka Chowmein',
    hindiName: 'वेज चाऊमीन',
    category: 'Chowmein & Noodles',
    description:
      'Street-style smoky wok-tossed noodles with crunchy cabbage, bell peppers, carrots, soy & desi chilli kick.',
    image:
      'https://images.pexels.com/photos/104884/pexels-photo-104884.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: true,
    priceHalf: 40,
    priceFull: 70,
    bestseller: true,
    spice: 'Medium',
  },
  {
    id: 'paneer-chowmein',
    name: 'Paneer Chowmein',
    hindiName: 'पनीर चाऊमीन',
    category: 'Chowmein & Noodles',
    description:
      'Golden-seared paneer cubes tossed with fiery Schezwan noodles, spring onions & aromatic garlic.',
    image:
      'https://images.unsplash.com/photo-1632440722248-abcc3214b298?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    priceHalf: 60,
    priceFull: 100,
    chefSpecial: true,
    spice: 'Medium',
  },
  {
    id: 'egg-chowmein',
    name: 'Egg Chowmein',
    hindiName: 'एग चाऊमीन',
    category: 'Chowmein & Noodles',
    description:
      'Fluffy scrambled eggs folded into sizzling high-flame chowmein with crushed black pepper and dark soy.',
    image:
      'https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    priceHalf: 50,
    priceFull: 90,
    spice: 'Medium',
  },
  {
    id: 'chicken-chowmein',
    name: 'Chicken Chowmein',
    hindiName: 'चिकन चाऊमीन',
    category: 'Chowmein & Noodles',
    description:
      'Tender marinated chicken strips wok-fried with classic street noodles, crisp veggies & spicy red sauce.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Chicken_Chow_Mein.JPG',
    isVeg: false,
    priceHalf: 70,
    priceFull: 120,
    bestseller: true,
    spice: 'Spicy',
  },

  // Momos
  {
    id: 'veg-steamed-momos',
    name: 'Veg Steamed Momos',
    hindiName: 'वेज स्टीम्ड मोमोज',
    category: 'Momos',
    description:
      'Soft, juicy hand-folded dumplings stuffed with spiced garden veggies, served with fiery red garlic chutney.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Steamed_Momos_-_KOLKATA.jpg',
    isVeg: true,
    priceHalf: 40,
    priceFull: 70,
    spice: 'Medium',
  },
  {
    id: 'veg-fried-momos',
    name: 'Crispy Fried Momos',
    hindiName: 'फ्राइड मोमोज',
    category: 'Momos',
    description:
      'Golden crisp fried momos dusted with chatpata masala and served hot with signature chilli & mayo dips.',
    image:
      'https://images.pexels.com/photos/33670191/pexels-photo-33670191/free-photo-of-artistic-presentation-of-momos-with-sauce.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: true,
    priceHalf: 50,
    priceFull: 80,
    bestseller: true,
    spice: 'Spicy',
  },
  {
    id: 'paneer-kurkure-momos',
    name: 'Kurkure Paneer Momos',
    hindiName: 'कुरकुरे पनीर मोमोज',
    category: 'Momos',
    description:
      'Extra-crunchy breaded outer shell loaded with soft spiced paneer filling—our evening crowd favourite.',
    image:
      'https://images.pexels.com/photos/34912738/pexels-photo-34912738/free-photo-of-delicious-chinese-dumplings-with-fresh-scallions.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: true,
    priceHalf: 70,
    priceFull: 120,
    chefSpecial: true,
    spice: 'Medium',
  },

  // Starters & Chilli
  {
    id: 'chilli-potato',
    name: 'Crispy Chilli Potato',
    hindiName: 'चिल्ली पोटैटो',
    category: 'Starters & Chilli',
    description:
      'Crunchy potato fingers glazed in tangy-spicy garlic chilli sauce, topped with toasted sesame & spring onion.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e6/Honey_chilli_potato.jpg',
    isVeg: true,
    priceHalf: 60,
    priceFull: 100,
    bestseller: true,
    spice: 'Spicy',
  },
  {
    id: 'honey-chilli-potato',
    name: 'Honey Chilli Potato',
    hindiName: 'हनी चिल्ली पोटैटो',
    category: 'Starters & Chilli',
    description:
      'Sweet-and-fiery glazed crispy fries tossed with honey, red chilli flakes & crunchy capsicum.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Crispy_honey_chilli_potato.JPG',
    isVeg: true,
    priceHalf: 70,
    priceFull: 120,
    spice: 'Medium',
  },
  {
    id: 'paneer-chilli',
    name: 'Paneer Chilli (Dry / Gravy)',
    hindiName: 'पनीर चिल्ली',
    category: 'Starters & Chilli',
    description:
      'Soft cottage cheese cubes stir-fried with green chillies, diced onions, capsicum & rich soy-garlic glaze.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f5/Chilli_Paneer.JPG',
    isVeg: true,
    priceHalf: 80,
    priceFull: 140,
    chefSpecial: true,
    spice: 'Spicy',
  },
  {
    id: 'veg-manchurian',
    name: 'Veg Manchurian',
    hindiName: 'वेज मंचूरियन',
    category: 'Starters & Chilli',
    description:
      'Crispy vegetable dumplings simmered in thick, zesty ginger-garlic Manchurian sauce.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Chilly_Paneer_01.jpg',
    isVeg: true,
    priceHalf: 60,
    priceFull: 100,
    spice: 'Medium',
  },

  // Fried Rice
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    hindiName: 'वेज फ्राइड राइस',
    category: 'Fried Rice',
    description:
      'Long-grain rice tossed over roaring flame with crisp veggies, spring onions & balanced Indo-Chinese seasoning.',
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    priceHalf: 50,
    priceFull: 90,
    spice: 'Mild',
  },
  {
    id: 'egg-fried-rice',
    name: 'Egg Fried Rice',
    hindiName: 'एग फ्राइड राइस',
    category: 'Fried Rice',
    description:
      'Fragrant wok-tossed rice with golden egg ribbons, garlic & soy—comforting and filling.',
    image:
      'https://images.pexels.com/photos/8895736/pexels-photo-8895736.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: false,
    priceHalf: 60,
    priceFull: 100,
    spice: 'Medium',
  },
  {
    id: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    hindiName: 'चिकन फ्राइड राइस',
    category: 'Fried Rice',
    description:
      'Generous chicken chunks tossed with smoky rice, roasted garlic & schezwan pepper.',
    image:
      'https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    priceHalf: 80,
    priceFull: 140,
    bestseller: true,
    spice: 'Spicy',
  },

  // Rolls & Burgers
  {
    id: 'veg-spring-roll',
    name: 'Veg Spring Roll',
    hindiName: 'वेज स्प्रिंग रोल',
    category: 'Rolls & Burgers',
    description:
      'Shatteringly crisp golden rolls packed with seasoned noodle-veggie filling, served with chilli dip.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Chinese_Vegetable_Spring_Roll.jpg',
    isVeg: true,
    priceFull: 50,
    spice: 'Mild',
  },
  {
    id: 'kurkure-spring-roll',
    name: 'Kurkure Spring Roll',
    hindiName: 'कुरकुरे स्प्रिंग रोल',
    category: 'Rolls & Burgers',
    description:
      'Crunchy coated spring roll with molten masala crunch—one of Apna Swad’s signature fast-food bites.',
    image:
      'https://images.pexels.com/photos/35407775/pexels-photo-35407775/free-photo-of-close-up-of-freshly-made-spring-rolls-on-a-tray.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: true,
    priceFull: 70,
    chefSpecial: true,
    spice: 'Medium',
  },
  {
    id: 'paneer-burger',
    name: 'Crispy Paneer Burger',
    hindiName: 'पनीर बर्गर',
    category: 'Rolls & Burgers',
    description:
      'Toasted sesame bun stacked with spiced paneer patty, fresh lettuce, onion rings & creamy tandoori mayo.',
    image:
      'https://images.unsplash.com/photo-1651981109119-47bb742c1576?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    priceFull: 65,
    bestseller: true,
    spice: 'Mild',
  },
  {
    id: 'veg-burger',
    name: 'Classic Veg Burger',
    hindiName: 'वेज बर्गर',
    category: 'Rolls & Burgers',
    description:
      'Crunchy aloo-veg tikki burger with melted cheese slice, tomato, crunchy onion & zesty burger sauce.',
    image:
      'https://images.pexels.com/photos/5179783/pexels-photo-5179783.jpeg?auto=compress&cs=tinysrgb&w=800',
    isVeg: true,
    priceFull: 45,
    spice: 'Mild',
  },
  {
    id: 'finger-fries',
    name: 'Masala Finger Fries',
    hindiName: 'फिंगर फ्राइज',
    category: 'Rolls & Burgers',
    description:
      'Hot, crispy golden french fries tossed in peri-peri & chaat masala, served with tomato ketchup.',
    image:
      'https://images.unsplash.com/photo-1586805608485-add336722759?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    priceFull: 50,
    spice: 'Mild',
  },
];

export const MENU_CATEGORIES = [
  'All',
  'Chowmein & Noodles',
  'Momos',
  'Starters & Chilli',
  'Fried Rice',
  'Rolls & Burgers',
] as const;
