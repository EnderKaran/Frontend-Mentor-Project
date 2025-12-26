import { Routes, Route } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";

//Page Components
import IntroSection from "./challenges/intro-section/IntroSection";

function App() {
  return (
    <div className="min-h-screen bg-neutral-950"> 
      <Routes>
        <Route path="/" element={<ProjectCard />} />
        <Route path="/challenges/intro-section" element={<IntroSection />} />
      </Routes>
    </div>
  );
}

export default App;