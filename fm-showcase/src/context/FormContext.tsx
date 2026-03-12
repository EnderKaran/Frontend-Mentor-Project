import { createContext, useState } from "react";
import type { ReactNode } from "react";

export const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); //
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    plan: { id: "arcade", name: "Arcade", price: 9, isYearly: false },
    addOns: []
  });

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, formData, setFormData, errors, setErrors }}>
      {children}
    </FormContext.Provider>
  );
};