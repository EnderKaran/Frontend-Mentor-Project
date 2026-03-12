import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export default function Sidebar() {
  const { currentStep } = useContext(FormContext);

  const steps = [
    { id: 1, subtitle: "Step 1", title: "Your Info" },
    { id: 2, subtitle: "Step 2", title: "Select Plan" },
    { id: 3, subtitle: "Step 3", title: "Add-ons" },
    { id: 4, subtitle: "Step 4", title: "Summary" },
  ];

  return (
    <aside className="
      /* Arka plan: Mobilde üstte, Masaüstünde solda */
      bg-[url('/assets/images/bg-sidebar-mobile.svg')] md:bg-[url('/assets/images/bg-sidebar-desktop.svg')]
      bg-no-repeat bg-cover
      h-[172px] md:h-full md:w-[274px]
      flex flex-row md:flex-col justify-center md:justify-start
      gap-4 md:gap-8 p-8 md:rounded-xl
      fixed top-0 left-0 right-0 md:static z-10
    ">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-4">
          {/* Adım Numarası: Aktif durumda Blue 300 rengini alır */}
          <div className={`
            w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm transition-colors duration-300
            ${currentStep === step.id || (currentStep === 5 && step.id === 4)
              ? "bg-[hsl(228,100%,84%)] text-[hsl(213,96%,18%)] border-[hsl(228,100%,84%)]" 
              : "bg-transparent text-white border-white"}
          `}>
            {step.id}
          </div>

          {/* Adım Metinleri: Sadece masaüstünde görünür */}
          <div className="hidden md:flex flex-col uppercase">
            <span className="text-[hsl(229,24%,87%)] text-xs font-normal">
              {step.subtitle}
            </span>
            <span className="text-white text-sm font-bold tracking-wider">
              {step.title}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
}