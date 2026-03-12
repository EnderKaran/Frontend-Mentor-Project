import bgSidebarMobile from "../assets/bg-sidebar-mobile.svg";
import bgSidebarDesktop from "../assets/bg-sidebar-desktop.svg";
import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export default function Sidebar() {
  const { currentStep } = useContext(FormContext);

  const steps = [
    { id: 1, subtitle: "STEP 1", title: "YOUR INFO" },
    { id: 2, subtitle: "STEP 2", title: "SELECT PLAN" },
    { id: 3, subtitle: "STEP 3", title: "ADD-ONS" },
    { id: 4, subtitle: "STEP 4", title: "SUMMARY" },
  ];

  return (
    <aside className="relative overflow-hidden shrink-0 h-[172px] md:h-[568px] md:w-[274px] md:rounded-xl z-10">
      {/* 1. MASAÜSTÜ ARKA PLAN RESMİ */}
      <img 
        src={bgSidebarDesktop} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover hidden md:block" 
      />

      {/* 2. MOBİL ARKA PLAN RESMİ */}
      <img 
        src={bgSidebarMobile} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover md:hidden" 
      />

      {/* 3. İÇERİK (NUMARALAR)  */}
      <div className="relative z-20 flex flex-row md:flex-col justify-center md:justify-start gap-4 md:gap-8 p-8 md:p-10">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className={`
              w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm transition-all duration-300
              ${currentStep === step.id || (currentStep === 5 && step.id === 4)
                ? "bg-[hsl(228,100%,84%)] text-[hsl(213,96%,18%)] border-[hsl(228,100%,84%)]" 
                : "bg-transparent text-white border-white"}
            `}>
              {step.id}
            </div>

            <div className="hidden md:flex flex-col">
              <span className="text-[hsl(229,24%,87%)] text-[12px] opacity-70 leading-none mb-1">
                {step.subtitle}
              </span>
              <span className="text-white text-[14px] font-bold tracking-wider leading-none">
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}