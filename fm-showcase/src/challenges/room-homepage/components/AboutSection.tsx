// Görsel Importları
import imgAboutDark from "../images/image-about-dark.jpg";
import imgAboutLight from "../images/image-about-light.jpg";

export default function AboutSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] font-spartan">
      
      {/* 1. SOL GÖRSEL: Koyu tema */}
      <div className="h-full">
        <img 
          src={imgAboutDark} 
          alt="Dark furniture interior" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 2. ORTA İÇERİK: Metin alanı */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-12 bg-white">
        <h2 className="text-sm lg:text-base font-bold uppercase tracking-[0.3em] text-room-black mb-4">
          About our furniture
        </h2>
        <p className="text-room-grey-500 text-[15px] leading-relaxed font-medium">
          Our multifunctional collection blends design and function to suit your individual taste.
          Make each room unique, or pick a cohesive theme that best express your interests and what
          inspires you. Find the furniture pieces you need, from traditional to contemporary styles
          or anything in between. Product specialists are available to help you create your dream space.
        </p>
      </div>

      {/* 3. SAĞ GÖRSEL: Açık tema */}
      <div className="h-full">
        <img 
          src={imgAboutLight} 
          alt="Light furniture interior" 
          className="w-full h-full object-cover" 
        />
      </div>

    </section>
  );
}