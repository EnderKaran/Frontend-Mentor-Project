import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

const addonsList = [
  { id: "online", title: "Online service", desc: "Access to multiplayer games", price: 1 },
  { id: "storage", title: "Larger storage", desc: "Extra 1TB of cloud save", price: 2 },
  { id: "custom", title: "Customizable profile", desc: "Custom theme on your profile", price: 2 }
];

export default function AddOns() {
  const { formData, setFormData } = useContext(FormContext);
  const { isYearly } = formData.plan;

  const toggleAddon = (addon: any) => {
    const exists = formData.addOns.find((a: any) => a.id === addon.id);
    if (exists) {
      setFormData({ ...formData, addOns: formData.addOns.filter((a: any) => a.id !== addon.id) });
    } else {
      setFormData({ ...formData, addOns: [...formData.addOns, addon] });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold text-[hsl(213,96%,18%)] mb-2">Pick add-ons</h2>
      <p className="text-[hsl(231,11%,63%)] mb-8">Add-ons help enhance your gaming experience.</p>

      <div className="space-y-4">
        {addonsList.map((addon) => (
          <label 
            key={addon.id}
            className={`flex items-center gap-6 border rounded-lg p-5 cursor-pointer hover:border-[hsl(243,100%,62%)] transition-all ${
              formData.addOns.find((a: any) => a.id === addon.id) ? "bg-[hsl(218,100%,97%)] border-[hsl(243,100%,62%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          >
            <input 
              type="checkbox" 
              checked={!!formData.addOns.find((a: any) => a.id === addon.id)}
              onChange={() => toggleAddon(addon)}
              className="w-5 h-5 accent-[hsl(243,100%,62%)]"
            />
            <div className="flex-1">
              <h4 className="font-bold text-[hsl(213,96%,18%)]">{addon.title}</h4>
              <p className="text-[hsl(231,11%,63%)] text-sm">{addon.desc}</p>
            </div>
            <span className="text-[hsl(243,100%,62%)] text-sm">+${isYearly ? addon.price * 10 : addon.price}/{isYearly ? 'yr' : 'mo'}</span>
          </label>
        ))}
      </div>
    </div>
  );
}