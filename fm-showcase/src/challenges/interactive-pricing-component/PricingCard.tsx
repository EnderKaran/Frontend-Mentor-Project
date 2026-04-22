import { useState } from "react";

// Veri yapısı ve kademeler
interface PriceStep {
  pageviews: string;
  monthlyPrice: number;
}

const pricingData: PriceStep[] = [
  { pageviews: "10K", monthlyPrice: 8 },
  { pageviews: "50K", monthlyPrice: 12 },
  { pageviews: "100K", monthlyPrice: 16 },
  { pageviews: "500K", monthlyPrice: 24 },
  { pageviews: "1M", monthlyPrice: 36 },
];

export default function PricingCard() {
  const [sliderIndex, setSliderIndex] = useState(2); // Varsayılan 100K
  const [isYearly, setIsYearly] = useState(false);

  const currentStep = pricingData[sliderIndex];
  
  // Yıllık faturalandırmada %25 indirim uygula
  const finalPrice = isYearly 
    ? currentStep.monthlyPrice * 0.75 
    : currentStep.monthlyPrice;

  const sliderPercentage = (sliderIndex / (pricingData.length - 1)) * 100;

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-[540px] w-full font-manrope">
      
      {/* Üst Bölüm: Grid ile Responsive Sıralama */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-y-8 md:gap-y-0 mb-10">
        
        {/* 1. Pageviews: Mobilde en üstte */}
        <h2 className="text-[var(--price-slate-400)] font-extrabold tracking-[2px] text-xs md:text-sm uppercase text-center md:text-left order-1">
          {currentStep.pageviews} Pageviews
        </h2>
        
        {/* 2. Slider: Masaüstünde tam genişlik, Mobilde ortada */}
        <div className="md:col-span-2 order-2 md:order-3 md:mt-10">
          <input
            type="range"
            min="0"
            max="4"
            value={sliderIndex}
            onChange={(e) => setSliderIndex(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--price-green-400)]"
            style={{
              background: `linear-gradient(to right, var(--price-green-100) ${sliderPercentage}%, var(--price-slate-200) ${sliderPercentage}%)`
            }}
          />
        </div>

        {/* 3. Price: Mobilde slider'ın altında, Masaüstünde sağda */}
        <div className="flex items-center justify-center md:justify-end gap-2 order-3 md:order-2">
          <span className="text-[var(--price-slate-800)] font-extrabold text-4xl md:text-[44px]">
            ${finalPrice.toFixed(2)}
          </span>
          <span className="text-[var(--price-slate-400)] font-medium">/ month</span>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4 mb-10 text-[12px] text-[var(--price-slate-400)] font-medium md:mr-4">
        <span>Monthly Billing</span>
        <button 
          onClick={() => setIsYearly(!isYearly)}
          className={`w-11 h-6 rounded-full p-1 transition-colors relative ${isYearly ? 'bg-[var(--price-green-400)]' : 'bg-[var(--price-slate-300)]'} hover:bg-[var(--price-green-100)]`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
        <div className="flex items-center gap-2">
          <span>Yearly Billing</span>
          {/* İndirim rozeti mobilde kısalır */}
          <span className="bg-[var(--price-orange-100)] text-[var(--price-orange-400)] text-[10px] px-2 py-0.5 rounded-full font-bold">
            -25% <span className="hidden md:inline">discount</span>
          </span>
        </div>
      </div>

      <hr className="border-slate-100 -mx-8 md:-mx-12 mb-10" />

      {/* Alt Bölüm: Özellikler ve CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <ul className="flex flex-col gap-3 text-[var(--price-slate-400)] text-sm font-medium">
          <li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="/images/icon-check.svg" alt="" className="w-3 h-2" /> Unlimited websites
          </li>
          <li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="/images/icon-check.svg" alt="" className="w-3 h-2" /> 100% data ownership
          </li>
          <li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="/images/icon-check.svg" alt="" className="w-3 h-2" /> Email reports
          </li>
        </ul>
        
        <button className="bg-[var(--price-slate-800)] text-[var(--price-indigo-200)] font-extrabold px-11 py-3 rounded-full hover:text-white transition-colors text-xs md:text-sm">
          Start my trial
        </button>
      </div>
    </div>
  );
}