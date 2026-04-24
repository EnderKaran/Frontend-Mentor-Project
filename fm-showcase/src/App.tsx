import { Routes, Route } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";
import './App.css'

// Page Components
import IntroSection from "./challenges/intro-section/IntroSection";
import TypingTest from "./challenges/typing-speed-test/TypingTest";
import WeatherApp from "./challenges/weather-app/WeatherApp";
import ExtensionManager from "./challenges/extension-manager/ExtensionManager";
import InteractiveComments from "./challenges/interactive-comments/InteractiveComments";
import LaunchCountdown from "./challenges/Launch-countdown-timer/LaunchCountdown";
import CalculatorApp from "./challenges/calculator-app/CalculatorApp";
import RoomHomepage from "./challenges/room-homepage/RoomHomepage";
import IPTracker from "./challenges/ip-address-tracker/IPTracker";
import JobBoard from "./challenges/job-listings/JobBoard";
import PricingCard from "./challenges/interactive-pricing-component/PricingCard";
import MultiStepForm from "./challenges/multi-step-form/MultiStepForm";

// E-commerce Product Page Importları
import ProductPage from "./challenges/ecommerce-product-page/ProductPage";
import { CartProvider } from "./context/CartContext";

import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="min-h-screen bg-neutral-950"><ProjectCard /></div>} />
      <Route path="/challenges/intro-section" element={<div className="min-h-screen bg-neutral-950"><IntroSection /></div>} />
      <Route path="/challenges/typing-speed-test" element={<div className="min-h-screen bg-neutral-950"><TypingTest /></div>} />
      <Route path="/challenges/weather-app" element={<div className="min-h-screen bg-neutral-950"><WeatherApp /></div>} />
      <Route path="/challenges/extension-manager" element={<div className="min-h-screen bg-neutral-950"><ExtensionManager /></div>} />
      <Route path="/challenges/interactive-comments" element={<div className="min-h-screen bg-neutral-950"><InteractiveComments /></div>} />
      <Route path="/challenges/launch-countdown" element={<div className="min-h-screen bg-neutral-950"><LaunchCountdown /></div>} />
      <Route path="/challenges/calculator" element={<div className="min-h-screen bg-neutral-950"><CalculatorApp /></div>} />
      <Route path="/challenges/ip-address-tracker" element={<div className="min-h-screen bg-neutral-950"><IPTracker /></div>} />
      <Route path="/challenges/room-homepage" element={<div className="min-h-screen bg-neutral-950"><RoomHomepage /></div>} />
      <Route path="/challenges/job-listings" element={<JobBoard />} />

      <Route 
        path="/challenges/interactive-pricing-component" 
        element={
          <div className="min-h-screen bg-[var(--price-slate-50)] flex items-center justify-center p-4">
            <PricingCard />
          </div>
        } 
      />

      <Route 
        path="/challenges/ecommerce-product-page" 
        element={
          <CartProvider>
            <ProductPage />
          </CartProvider>
        } 
      />

      <Route 
        path="/challenges/multi-step-form" 
        element={
          <div className="min-h-screen bg-neutral-950">
            <FormProvider>
              <MultiStepForm />
            </FormProvider>
          </div>
        } 
      />
    </Routes>
  );
}

export default App;