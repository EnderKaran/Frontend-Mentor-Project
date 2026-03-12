import { createContext, useState } from "react";
import type { ReactNode } from "react";

export const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    plan: { id: "arcade", name: "Arcade", price: 9, isYearly: false },
    addOns: [] as { id: string; title: string; price: number }[]
  });

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};