import { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./steps/PersonalInfo";
import SelectPlan from "./steps/SelectPlan";
import AddOns from "./steps/AddOns";
import Summary from "./steps/Summary";
import ThankYou from "./steps/ThankYou"; 

export default function MultiStepForm() {
  const { currentStep, setCurrentStep } = useContext(FormContext);

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

  const handleNext = () => setCurrentStep((prev: number) => prev + 1);
  const handleBack = () => setCurrentStep((prev: number) => prev - 1);

  return (
    <main className="min-h-screen bg-[hsl(218,100%,97%)] flex items-center justify-center p-0 md:p-4 font-ubuntu">
      {/* Form Konteyner */}
      <div className="bg-white w-full max-w-[940px] md:rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4 min-h-screen md:min-h-[600px] relative">
        
        {/* SOL MENÜ: Sidebar */}
        <Sidebar />

        {/* SAĞ İÇERİK: Dinamik Adımlar */}
        <div className="flex-1 px-4 md:px-20 py-10 pb-32 md:pb-20 relative">
          {renderStep()}

          
          {currentStep < 5 && (
            <div className="fixed md:absolute bottom-0 left-0 right-0 bg-white md:bg-transparent p-4 md:p-10 flex justify-between items-center z-20">
              {currentStep > 1 && (
                <button 
                  onClick={handleBack}
                  className="text-[hsl(231,11%,63%)] font-medium hover:text-[hsl(213,96%,18%)] transition-colors"
                >
                  Go Back
                </button>
              )}
              
              <button 
                onClick={handleNext}
                className={`ml-auto px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-80 ${
                  currentStep === 4 
                    ? "bg-[hsl(243,100%,62%)] text-white" // Confirm butonu rengi
                    : "bg-[hsl(213,96%,18%)] text-white"
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