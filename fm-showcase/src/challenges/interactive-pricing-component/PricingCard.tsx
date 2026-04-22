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
  // State tanımlamaları
  const [sliderIndex, setSliderIndex] = useState(2); // Varsayılan 100K
  const [isYearly, setIsYearly] = useState(false);

  // Güncel veriyi al
  const currentStep = pricingData[sliderIndex];
  
  // Fiyat hesaplama (Yıllık ise %25 indirim)
  const finalPrice = isYearly 
    ? currentStep.monthlyPrice * 0.75 
    : currentStep.monthlyPrice;

  // Slider ilerleme yüzdesi (Arka plan rengi için)
  const sliderPercentage = (sliderIndex / (pricingData.length - 1)) * 100;

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-[540px] w-full font-manrope">
      
      {/* Üst Kısım: Pageviews ve Price */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 text-center md:text-left">
        <h2 className="text-job-gray font-bold tracking-[2px] text-sm uppercase">
          {currentStep.pageviews} Pageviews
        </h2>
        
        <div className="flex items-center justify-center gap-2">
          <span className="text-job-dark font-extrabold text-4xl md:text-5xl">
            ${finalPrice.toFixed(2)}
          </span>
          <span className="text-job-gray font-medium">/ month</span>
        </div>
      </div>

      {/* Slider Alanı */}
      <div className="mb-10 px-2">
        <input
          type="range"
          min="0"
          max="4"
          value={sliderIndex}
          onChange={(e) => setSliderIndex(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-job-primary"
          style={{
            background: `linear-gradient(to right, hsl(174, 77%, 80%) ${sliderPercentage}%, hsl(224, 65%, 95%) ${sliderPercentage}%)`
          }}
        />
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-end gap-3 md:gap-4 mb-10 text-xs md:text-sm text-job-gray font-medium pr-2">
        <span>Monthly Billing</span>
        <button 
          onClick={() => setIsYearly(!isYearly)}
          className={`w-11 h-6 rounded-full p-1 transition-colors ${isYearly ? 'bg-job-primary' : 'bg-slate-300'} hover:bg-green-300`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
        <div className="flex items-center gap-2">
          <span>Yearly Billing</span>
          <span className="bg-orange-100 text-orange-400 text-[10px] px-2 py-0.5 rounded-full">
            25% <span className="hidden md:inline">discount</span>
          </span>
        </div>
      </div>

      <hr className="border-slate-100 -mx-8 md:-mx-12 mb-8" />

      {/* Alt Kısım: Özellikler ve CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <ul className="flex flex-col gap-3 text-job-gray text-sm font-medium">
          <li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="./images/icon-check.svg" alt="" /> Unlimited websites
          </li>
          <li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="./images/icon-check.svg" alt="" /> 100% data ownership
          </li>
          <li className="flex items-center gap-4 justify-center md:justify-start">
            </li><li className="flex items-center gap-4 justify-center md:justify-start">
            <img src="./images/icon-check.svg" alt="" /> Email reports
          </li>
        </ul>
        
        <button className="bg-job-dark text-indigo-200 font-extrabold px-10 py-3 rounded-full hover:text-white transition-colors text-sm">
          Start my trial
        </button>
      </div>
    </div>
  );
}