import { useState } from "react";
import Navbar from "./Navbar";
import CartModal from "./CartModal";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Lightbox from "./Lightbox";

export default function ProductPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <div className="min-h-screen bg-white font-kumbh relative">
      {/* Navbar: Sepet butonu toggle fonksiyonunu kontrol eder */}
      <div className="relative">
        <Navbar onCartClick={toggleCart} />
        {isCartOpen && <CartModal />}
      </div>

      <main className="max-w-7xl mx-auto md:px-12 lg:px-24">
        {/* Responsive Düzen: Mobilde sütun, Masaüstünde 2 sütunlu ızgara */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-32 md:py-20">
          
          {/* Sol Sütun: Görsel Galerisi */}
          <section>
            <ProductGallery handleLightbox={openLightbox} />
          </section>

          {/* Sağ Sütun: Ürün Bilgileri ve Satın Alma */}
          <section>
            <ProductInfo />
          </section>
        </div>
      </main>

      {isLightboxOpen && (
        <div className="hidden md:block">
          <Lightbox onClose={closeLightbox} />
        </div>
      )}
    </div>
  );
}