import { useState } from "react";

// Ürün görselleri dizisi
const images = [
  { id: 1, main: "/images/image-product-1.jpg", thumb: "/images/image-product-1-thumbnail.jpg" },
  { id: 2, main: "/images/image-product-2.jpg", thumb: "/images/image-product-2-thumbnail.jpg" },
  { id: 3, main: "/images/image-product-3.jpg", thumb: "/images/image-product-3-thumbnail.jpg" },
  { id: 4, main: "/images/image-product-4.jpg", thumb: "/images/image-product-4-thumbnail.jpg" },
];

interface GalleryProps {
  handleLightbox?: () => void;
}

export default function ProductGallery({ handleLightbox }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mobilde resim değiştirme fonksiyonları
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-8 w-full md:max-w-[445px]">
      {/* Ana Görsel Bölümü */}
      <div className="relative overflow-hidden md:rounded-2xl group">
        <img
          src={images[currentIndex].main}
          alt="Product"
          className="w-full h-auto cursor-pointer"
          onClick={handleLightbox}
        />

        {/* Mobil Navigasyon Okları (Sadece mobilde görünür) */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:hidden">
          <button 
            onClick={prevImage}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors"
          >
            <img src="/images/icon-previous.svg" alt="Previous" className="h-3" />
          </button>
          <button 
            onClick={nextImage}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors"
          >
            <img src="/images/icon-next.svg" alt="Next" className="h-3" />
          </button>
        </div>
      </div>

      {/* Küçük Resimler (Thumbnails - Sadece masaüstünde görünür) */}
      <div className="hidden md:flex justify-between gap-4">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all ${
              currentIndex === index ? "border-orange-500" : "border-transparent"
            }`}
          >
            {/* Aktif resim için beyaz katman/overlay */}
            <div className={`absolute inset-0 bg-white/50 transition-opacity ${
              currentIndex === index ? "opacity-100" : "opacity-0 hover:opacity-30"
            }`} />
            <img src={img.thumb} alt={`Thumbnail ${img.id}`} className="w-[88px] h-[88px]" />
          </button>
        ))}
      </div>
    </div>
  );
}