import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import iconArcade from "../assets/icon-arcade.svg";
import iconAdvanced from "../assets/icon-advanced.svg";
import iconPro from "../assets/icon-pro.svg";

export default function SelectPlan() {
  const { formData, setFormData } = useContext(FormContext);
  const { isYearly, id: selectedId } = formData.plan;

  const plans = [
    { id: "arcade", name: "Arcade", price: 9, icon: iconArcade },
    { id: "advanced", name: "Advanced", price: 12, icon: iconAdvanced },
    { id: "pro", name: "Pro", price: 15, icon: iconPro }
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[hsl(213,96%,18%)] mb-2">Select your plan</h2>
        <p className="text-[hsl(231,11%,63%)]">You have the option of monthly or yearly billing.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div 
            key={p.id}
            onClick={() => setFormData({ ...formData, plan: { ...p, isYearly } })}
            className={`border rounded-lg p-4 cursor-pointer hover:border-[hsl(243,100%,62%)] transition-all flex md:flex-col gap-4 md:gap-10 ${
              selectedId === p.id ? "bg-[hsl(218,100%,97%)] border-[hsl(243,100%,62%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          >
            <img src={p.icon} alt={p.name} className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-[hsl(213,96%,18%)]">{p.name}</h3>
              <p className="text-[hsl(231,11%,63%)] text-sm">${isYearly ? p.price * 10 : p.price}/{isYearly ? 'yr' : 'mo'}</p>
              {isYearly && <p className="text-[hsl(213,96%,18%)] text-xs mt-1">2 months free</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly/Yearly Toggle */}
      <div className="mt-8 bg-[hsl(218,100%,97%)] rounded-lg p-3 flex justify-center items-center gap-6">
        <span className={`text-sm font-bold ${!isYearly ? 'text-[hsl(213,96%,18%)]' : 'text-[hsl(231,11%,63%)]'}`}>Monthly</span>
        <button 
          onClick={() => setFormData({ ...formData, plan: { ...formData.plan, isYearly: !isYearly } })}
          className="w-10 h-5 bg-[hsl(213,96%,18%)] rounded-full relative p-1"
        >
          <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
        <span className={`text-sm font-bold ${isYearly ? 'text-[hsl(213,96%,18%)]' : 'text-[hsl(231,11%,63%)]'}`}>Yearly</span>
      </div>
    </div>
  );
}