import './App.css'
import ProjectCard from "../components/ProjectCard";

function App() {
  

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex flex-wrap items-center justify-center gap-8 p-10">
      
      {/* 1. KART: Intro section with dropdown navigation */}
      <ProjectCard
        title="Intro section with dropdown navigation"
        // Ekran görüntüsü gelicek
        imageUrl="https://via.placeholder.com/600x400/eef2ff/4f46e5?text=Intro+Section" 
        techStack={["React", "TypeScript", "Tailwind"]}
      />


    </div>
    </>
  );
}

export default App
