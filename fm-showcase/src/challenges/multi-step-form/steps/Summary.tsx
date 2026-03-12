import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export default function Summary() {
  const { formData, setCurrentStep } = useContext(FormContext);
  const { plan, addOns } = formData;
  const isYearly = plan.isYearly;

  const planPrice = isYearly ? plan.price * 10 : plan.price;
  const addonsTotal = addOns.reduce((acc: number, curr: any) => acc + (isYearly ? curr.price * 10 : curr.price), 0);
  const totalPrice = planPrice + addonsTotal;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold text-[hsl(213,96%,18%)] mb-2">Finishing up</h2>
      <p className="text-[hsl(231,11%,63%)] mb-8">Double-check everything looks OK before confirming.</p>

      <div className="bg-[hsl(218,100%,97%)] p-6 rounded-lg">
        <div className="flex justify-between items-center border-b border-[hsl(229,24%,87%)] pb-6 mb-4">
          <div>
            <h4 className="font-bold text-[hsl(213,96%,18%)]">{plan.name} ({isYearly ? 'Yearly' : 'Monthly'})</h4>
            <button onClick={() => setCurrentStep(2)} className="text-[hsl(231,11%,63%)] underline hover:text-[hsl(243,100%,62%)] text-sm">Change</button>
          </div>
          <span className="font-bold text-[hsl(213,96%,18%)]">${planPrice}/{isYearly ? 'yr' : 'mo'}</span>
        </div>

        <div className="space-y-4">
          {addOns.map((addon: any) => (
            <div key={addon.id} className="flex justify-between text-sm">
              <span className="text-[hsl(231,11%,63%)]">{addon.title}</span>
              <span className="text-[hsl(213,96%,18%)]">+${isYearly ? addon.price * 10 : addon.price}/{isYearly ? 'yr' : 'mo'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-6">
        <span className="text-[hsl(231,11%,63%)] text-sm">Total (per {isYearly ? 'year' : 'month'})</span>
        <span className="text-xl font-bold text-[hsl(243,100%,62%)]">+${totalPrice}/{isYearly ? 'yr' : 'mo'}</span>
      </div>
    </div>
  );
}