import { createContext, useContext, useState } from "react";

export const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    plan: { type: "Arcade", isYearly: false, price: 9 },
    addOns: []
  });

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};