import { Routes, Route } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";
import './App.css'

//Page Components
import IntroSection from "./challenges/intro-section/IntroSection";
import TypingTest from "./challenges/typing-speed-test/TypingTest";
import WeatherApp from "./challenges/weather-app/WeatherApp";

function App() {
  return (
    <div className="min-h-screen bg-neutral-950"> 
      <Routes>
        <Route path="/" element={<ProjectCard />} />
        <Route path="/challenges/intro-section" element={<IntroSection />} />
        <Route path="/challenges/typing-speed-test" element={<TypingTest />} />
        <Route path="/challenges/weather-app" element={<WeatherApp />} />
      </Routes>
    </div>
  );
}

export default App;