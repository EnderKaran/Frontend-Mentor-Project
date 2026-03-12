import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./steps/PersonalInfo";
import SelectPlan from "./steps/SelectPlan";
import AddOns from "./steps/AddOns";
import Summary from "./steps/Summary";
import ThankYou from "./steps/ThankYou";

export default function MultiStepForm() {
  const { currentStep, setCurrentStep, formData, setErrors } = useContext(FormContext);

  
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    const { name, email, phone } = formData.personalInfo;

    if (!name.trim()) newErrors.name = "This field is required";
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!phone.trim()) newErrors.phone = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  // Geri gitme mantığı
  const handleBack = () => {
    setErrors({}); 
    setCurrentStep((prev: number) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfo />;
      case 2: return <SelectPlan />;
      case 3: return <AddOns />;
      case 4: return <Summary />;
      case 5: return <ThankYou />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(218,100%,97%)] flex items-center justify-center p-0 md:p-4 font-ubuntu">
      <div className="bg-white w-full max-w-[940px] md:rounded-2xl shadow-xl flex flex-col md:flex-row p-4 min-h-screen md:min-h-[600px] relative overflow-hidden">
    
        <Sidebar />

        {/* Form İçeriği ve Navigasyon Alanı */}
        <div className="flex-1 flex flex-col justify-between px-4 md:px-16 py-8 md:py-10">
          
          {/* Dinamik Form Adımı */}
          <div className="mt-10 md:mt-0">
            {renderStep()}
          </div>

          {currentStep < 5 && (
            <div className="flex justify-between items-center bg-white md:bg-transparent p-4 md:p-0 fixed md:static bottom-0 left-0 right-0 z-30">
              <button 
                type="button"
                onClick={handleBack}
                className={`text-[hsl(231,11%,63%)] font-medium hover:text-[hsl(213,96%,18%)] transition-colors ${
                  currentStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                Go Back
              </button>
              
              <button 
                type="button"
                onClick={handleNext}
                className={`px-6 py-3 rounded-lg text-white font-medium hover:opacity-80 transition-opacity ${
                  currentStep === 4 ? 'bg-[hsl(243,100%,62%)]' : 'bg-[hsl(213,96%,18%)]'
                }`}
              >
                {currentStep === 4 ? "Confirm" : "Next Step"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}