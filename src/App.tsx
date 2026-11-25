import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtiesStrip } from './components/SpecialtiesStrip';
import { MenuSection } from './components/MenuSection';
import { ShopGallery } from './components/ShopGallery';
import { BookingSection } from './components/BookingSection';
import { ReviewsAndVisit } from './components/ReviewsAndVisit';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingMode, CartItem, MenuItem } from './types';

export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingMode, setBookingMode] = useState<BookingMode>('table');

  const handleAddToCart = (item: MenuItem, portion: 'Half' | 'Full') => {
    const unitPrice = portion === 'Half' && item.priceHalf ? item.priceHalf : item.priceFull;
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.menuItemId === item.id && c.portion === portion
      );
      if (existing) {
        return prev.map((c) =>
          c.menuItemId === item.id && c.portion === portion
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          portion,
          unitPrice,
          quantity: 1,
          isVeg: item.isVeg,
        },
      ];
    });
  };

  const handleUpdateQty = (
    menuItemId: string,
    portion: 'Half' | 'Full',
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.menuItemId === menuItemId && c.portion === portion
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const handleClearCart = () => setCart([]);

  const scrollToBooking = (mode?: BookingMode) => {
    if (mode) setBookingMode(mode);
    const el = document.getElementById('booking');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF5]">
      <Navbar cartCount={totalCartCount} onOpenBooking={scrollToBooking} />
      <main className="flex-1">
        <Hero onOpenBooking={scrollToBooking} />
        <SpecialtiesStrip />
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
          onProceedToBooking={() => scrollToBooking('preorder')}
        />
        <ShopGallery />
        <BookingSection
          mode={bookingMode}
          onModeChange={setBookingMode}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onClearCart={handleClearCart}
        />
        <ReviewsAndVisit />
      </main>
      <Footer />
      <MobileStickyBar cartCount={totalCartCount} onOpenBooking={scrollToBooking} />
    </div>
  );
}

export default App;
