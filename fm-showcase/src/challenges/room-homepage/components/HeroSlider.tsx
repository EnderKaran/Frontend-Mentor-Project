import { useState, useEffect, useCallback } from "react";

// Görsel Importları
import hero1Desktop from "../images/desktop-image-hero-1.jpg";
import hero1Mobile from "../images/mobile-image-hero-1.jpg";
import hero2Desktop from "../images/desktop-image-hero-2.jpg";
import hero2Mobile from "../images/mobile-image-hero-2.jpg";
import hero3Desktop from "../images/daesktop-image-hero-3.jpg";
import hero3Mobile from "../images/mobile-image-hero-3.jpg";
import iconAngleLeft from "../images/icon-angle-left.svg";
import iconAngleRight from "../images/icon-angle-right.svg";
import iconArrow from "../images/icon-arrow.svg";

const SLIDES = [
  {
    id: 1,
    title: "Discover innovative ways to decorate",
    description: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    desktopImg: hero1Desktop,
    mobileImg: hero1Mobile,
  },
  {
    id: 2,
    title: "We are available all across the globe",
    description: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    desktopImg: hero2Desktop,
    mobileImg: hero2Mobile,
  },
  {
    id: 3,
    title: "Manufactured with the best materials",
    description: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    desktopImg: hero3Desktop,
    mobileImg: hero3Mobile,
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigasyon Fonksiyonları
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Klavye Navigasyonu (Requirement: mouse or keyboard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-[60vh] lg:min-h-[534px] font-spartan">
      {/* SOL: Resim Alanı */}
      <div className="relative overflow-hidden">
        <picture key={currentIndex}>
          <source media="(min-width: 1024px)" srcSet={currentSlide.desktopImg} />
          <img 
            src={currentSlide.mobileImg} 
            alt={currentSlide.title} 
            className="w-full h-full object-cover animate-in fade-in duration-700" 
          />
        </picture>

        {/* Navigasyon Okları */}
        <div className="absolute bottom-0 right-0 lg:-right-[160px] flex bg-black z-10 lg:w-[160px]">
          <button 
            onClick={prevSlide}
            className="flex-1 p-6 lg:p-8 hover:bg-room-grey-800 transition-colors focus-visible:outline-none focus-visible:bg-room-grey-800"
            aria-label="Previous slide"
          >
            <img src={iconAngleLeft} alt="" className="mx-auto" />
          </button>
          <button 
            onClick={nextSlide}
            className="flex-1 p-6 lg:p-8 hover:bg-room-grey-800 transition-colors focus-visible:outline-none focus-visible:bg-room-grey-800"
            aria-label="Next slide"
          >
            <img src={iconAngleRight} alt="" className="mx-auto" />
          </button>
        </div>
      </div>

      {/* SAĞ: İçerik Alanı */}
      <div className="flex flex-col justify-center px-8 py-16 lg:px-24 bg-white lg:min-h-[534px]">
        <div key={currentIndex} className="animate-in slide-in-from-right-8 fade-in duration-500">
          <h1 className="text-[2.5rem] lg:text-[3rem] font-bold text-room-black leading-[0.9] lg:leading-[1] mb-6 tracking-[-2px]">
            {currentSlide.title}
          </h1>
          <p className="text-room-grey-500 text-[16px] leading-[1.4] mb-10 font-medium">
            {currentSlide.description}
          </p>
          <button className="flex items-center gap-8 uppercase tracking-[0.8em] font-bold text-room-black hover:text-room-grey-500 transition-all group">
            Shop Now
            <img src={iconArrow} alt="" className="group-hover:opacity-50 group-hover:translate-x-4 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}