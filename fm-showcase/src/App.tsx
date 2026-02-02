import { Routes, Route } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";
import './App.css'

//Page Components
import IntroSection from "./challenges/intro-section/IntroSection";
import TypingTest from "./challenges/typing-speed-test/TypingTest";
import WeatherApp from "./challenges/weather-app/WeatherApp";
import ExtensionManager from "./challenges/extension-manager/ExtensionManager";
import InteractiveComments from "./challenges/interactive-comments/InteractiveComments";

function App() {
  return (
    <div className="min-h-screen bg-neutral-950"> 
      <Routes>
        <Route path="/" element={<ProjectCard />} />
        <Route path="/challenges/intro-section" element={<IntroSection />} />
        <Route path="/challenges/typing-speed-test" element={<TypingTest />} />
        <Route path="/challenges/weather-app" element={<WeatherApp />} />
        <Route path="/challenges/extension-manager" element={<ExtensionManager />} />
        <Route path="/challenges/interactive-comments" element={<InteractiveComments />} />
      </Routes>
    </div>
  );
}

export default App;